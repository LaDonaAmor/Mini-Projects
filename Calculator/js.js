// Display
const displayInput = document.querySelector(".display");

// Button Container
const buttons = document.querySelectorAll(".buttons");

// Operators (+ − × ÷)
const operatorButtons = document.querySelectorAll(".operator");

// Numbers (0–9)
const numberButtons = document.querySelectorAll(".numbers");

// Special buttons (CE, C, DEL, =, ., %)
const clearEntryButton = document.querySelector(".clear_entry");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");
const percentButton = document.querySelector(".percent");

let currentValue = "";
let storedValue = "";
let currentOperator = "";

function updateDisplay() {
  if (currentValue) {
    displayInput.value = currentValue.toString();
  } else if (storedValue) {
    displayInput.value = storedValue.toString();
  } else {
    displayInput.value = "";
  }

  if (displayInput.value === "Error") {
    displayInput.style.color = "red";
  } else {
    displayInput.style.color = "black";
  }
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentValue += button.textContent;
    updateDisplay();
  });
});

decimalButton.addEventListener("click", () => {
  if (currentValue === "") {
    currentValue = "0.";
    updateDisplay();
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
    updateDisplay();
  }
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (storedValue === "") {
      storedValue = currentValue;
      currentValue = "";
    } else if (currentValue !== "") {
      storedValue = calculate();
      currentValue = "";
    }
    currentOperator = button.textContent;
    updateDisplay();
  });
});

clearEntryButton.addEventListener("click", () => {
  currentValue = "";
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  currentValue = "";
  storedValue = "";
  currentOperator = "";
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  if (currentValue) {
    currentValue = currentValue.slice(0, -1);
  } else if (storedValue) {
    currentValue = storedValue.toString().slice(0, -1);
    storedValue = "";
  }
  updateDisplay();
});

percentButton.addEventListener("click", () => {
  currentValue = Number(currentValue);
  if (!storedValue) {
    currentValue = currentValue / 100;
  } else {
    currentValue = storedValue * (currentValue / 100);
  }

  updateDisplay();
});

function calculate() {
  currentValue = Number(currentValue);
  storedValue = Number(storedValue);

  let result;
  switch (currentOperator) {
    case "+":
      result = storedValue + currentValue;
      break;
    case "-":
      result = storedValue - currentValue;
      break;
    case "×":
      result = storedValue * currentValue;
      break;
    case "÷":
      if (currentValue === 0) {
        result = "Error";
      } else {
        result = storedValue / currentValue;
      }
      break;
    default:
      result = currentValue;
  }
  return result;
}

let lastOperator = "";
let lastValue = "";

equalButton.addEventListener("click", () => {
  if (currentValue && currentOperator) {
    let result = calculate();
    lastOperator = currentOperator;
    lastValue = currentValue;
    storedValue = result;
    currentValue = "";
    currentOperator = "";
    updateDisplay();
  } else if (!currentValue && lastOperator && lastValue) {
    // Repeat last operation
    currentValue = lastValue;
    currentOperator = lastOperator;
    let result = calculate();
    storedValue = result;
    currentValue = "";
    currentOperator = "";
    updateDisplay();
  }
});