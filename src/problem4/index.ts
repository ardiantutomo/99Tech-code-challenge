const sum_to_n_a = (n: number): number => {
  // The complexity of sum_to_n_a is O(n) because it uses a single loop that iterates from 1 to n.
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_b = (n: number): number => {
  // The complexity of sum_to_n_b is O(n) because it uses a recursive function that calls itself n times.
  if (n === 0) return 0;
  return n + sum_to_n_b(n - 1);
};

const sum_to_n_c = (n: number): number => {
  // The complexity of sum_to_n_c is O(n) because it uses an array and the reduce function.
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (acc, curr) => acc + curr,
    0
  );
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
