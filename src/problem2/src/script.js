async function fetchPrices() {
  const apiUrl = "https://interview.switcheo.com/prices.json";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching prices");
    }
    const data = await response.json();
    console.log(data);
    populateTokenDropdown(data);
    setupEventListeners(data);
    return data;
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
}

function populateTokenDropdown(prices) {
  const sendTokenSelect = document.getElementById("send-token-select");
  const receiveTokenSelect = document.getElementById("receive-token-select");
  sendTokenSelect.innerHTML =
    "<option value='' disabled selected>Select a token</option>";
  receiveTokenSelect.innerHTML =
    "<option value='' disabled selected>Select a token</option>";

  prices.forEach((priceInfo) => {
    const { currency, price } = priceInfo;
    const displayText = `${currency} - ${price.toFixed(2)}`;

    const sendOption = document.createElement("option");
    sendOption.value = currency;
    sendOption.textContent = displayText;
    sendTokenSelect.appendChild(sendOption);

    const receiveOption = document.createElement("option");
    receiveOption.value = currency;
    receiveOption.textContent = displayText;
    receiveTokenSelect.appendChild(receiveOption);
  });
}

function calculateSwap(prices) {
  const sendTokenSelect = document.getElementById("send-token-select");
  const receiveTokenSelect = document.getElementById("receive-token-select");
  const inputAmount = document.getElementById("input-amount");
  const outputAmount = document.getElementById("output-amount");

  const sendCurrency = sendTokenSelect.value;
  const receiveCurrency = receiveTokenSelect.value;
  const amountToSend = parseFloat(inputAmount.value);

  if (!sendCurrency || !receiveCurrency || isNaN(amountToSend)) {
    outputAmount.value = "";
    alert("Please select both tokens and enter a valid amount.");
    return;
  }

  if (sendCurrency === receiveCurrency) {
    outputAmount.value = "";
    alert("Please select different tokens for sending and receiving.");
    return;
  }

  const sendPrice = prices.find(
    (price) => price.currency === sendCurrency
  ).price;
  const receivePrice = prices.find(
    (price) => price.currency === receiveCurrency
  ).price;

  const amountToReceive = (amountToSend * sendPrice) / receivePrice;
  outputAmount.value = amountToReceive.toFixed(2);
}

function setupEventListeners(prices) {
  const confirmButton = document.querySelector("button");
  const sendTokenSelect = document.getElementById("send-token-select");
  const receiveTokenSelect = document.getElementById("receive-token-select");
  const sendTokenImage = document.getElementById("send-token-image");
  const receiveTokenImage = document.getElementById("receive-token-image");

  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();
    calculateSwap(prices);
  });

  sendTokenSelect.addEventListener("change", () => {
    const selectedCurrency = sendTokenSelect.value;
    if (selectedCurrency) {
      sendTokenImage.src = `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${selectedCurrency}.svg`;
      sendTokenImage.alt = `${selectedCurrency} icon`;
      sendTokenImage.style.display = "inline";
    } else {
      sendTokenImage.style.display = "none";
    }
  });

  receiveTokenSelect.addEventListener("change", () => {
    const selectedCurrency = receiveTokenSelect.value;
    if (selectedCurrency) {
      receiveTokenImage.src = `https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${selectedCurrency}.svg`;
      receiveTokenImage.alt = `${selectedCurrency} icon`;
      receiveTokenImage.style.display = "inline";
    } else {
      receiveTokenImage.style.display = "none";
    }
  });
}

fetchPrices();
