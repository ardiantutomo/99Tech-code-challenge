Issues and Anti-patterns I found:

1. The variable `lhsPriority` is used in the filter function, but it is not defined anywhere in the code. This will cause a runtime error. Therefore, I removed it. It also seems like it should be the balance priority that used in the filter function.
2. The filter condition `if (balance.amount <= 0)` seems incorrect if the intention is to filter out balances with a positive amount. It should likely be balance.amount > 0.
3. The sorting function does not handle the case where leftPriority equals rightPriority. This could lead to inconsistent sorting results.
4. The rows mapping uses the sortedBalances but expects FormattedWalletBalance type, which includes a formatted field. So, I change the rows mapping to use the formattedBalances.
5. The useMemo hook includes prices in its dependency array, but prices is not used in the computation of sortedBalances. This could lead to unnecessary recalculations.

Refactored Code:

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```
