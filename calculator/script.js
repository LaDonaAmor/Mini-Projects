const displayCurrent = document.getElementById("displayCurrent");
const displayHistory = document.getElementById("displayHistory");
const toastEl = document.getElementById("toast");

const operatorButtons = document.querySelectorAll(".operator");
const numberButtons = document.querySelectorAll(".numbers");
const clearEntryButton = document.querySelector(".clear_entry");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");
const decimalButton = document.querySelector(".decimal");
const percentButton = document.querySelector(".percent");

const MAX_DIGITS = 15;

// --- state ---
let currentValue = ""; // the number currently being typed
let storedValue = ""; // running total, used for calculation
let currentOperator = ""; // pending operator (+, -, ×, ÷)
let expression = ""; // the full committed chain, e.g. "5+5+5+"
let equalsPressed = false; // true right after "=" — next digit starts fresh
let lastOperator = ""; // for repeating "=" with no new input
let lastValue = "";
let toastTimeout;

// ---------- toast ----------
function showToast(message, type = "error") {
  clearTimeout(toastTimeout);
  const icon = type === "success" ? "✓" : "⚠";
  toastEl.innerHTML = `<span class="toast__icon">${icon}</span><span>${message}</span>`;
  toastEl.className = `toast toast--${type} visible`;
  toastTimeout = setTimeout(() => toastEl.classList.remove("visible"), 2500);
}

// ---------- formatting ----------
function formatNumber(value) {
  if (value === "Error") return "Error";
  if (value === null || value === undefined || value === "") return "";
  if (typeof value === "string") {
    if (value.endsWith(".")) return value;
    if (value.startsWith(".")) return value;
  }
  const num = Number(value);
  if (Number.isNaN(num)) return "";
  const precisionLimit = MAX_DIGITS + 1;
  let formatted = num.toPrecision(precisionLimit);
  formatted = formatted.replace(/\.?0+$/, "");
  if (formatted.length > MAX_DIGITS) {
    return num.toExponential(MAX_DIGITS - 6);
  }
  return formatted;
}

function calculate(a, operator, b) {
  const numA = Number(a);
  const numB = Number(b);
  switch (operator) {
    case "+":
      return numA + numB;
    case "-":
      return numA - numB;
    case "×":
      return numA * numB;
    case "÷":
      return numB === 0 ? "Error" : numA / numB;
    default:
      return numB;
  }
}

// ---------- display ----------
function updateDisplay() {
  let bottomValue;
  if (currentValue !== "") {
    bottomValue = currentValue;
  } else if (storedValue !== "") {
    bottomValue = formatNumber(storedValue);
  } else {
    bottomValue = "0";
  }
  displayCurrent.value = bottomValue;
  displayCurrent.style.color = bottomValue === "Error" ? "red" : "";

  let topValue = expression + currentValue;
  if (equalsPressed) topValue += "=";
  displayHistory.textContent = topValue;

  requestAnimationFrame(() => {
    displayCurrent.scrollLeft = displayCurrent.scrollWidth;
    displayHistory.scrollLeft = displayHistory.scrollWidth;
  });
}

function resetIfAfterEquals() {
  if (equalsPressed) {
    expression = "";
    storedValue = "";
    currentOperator = "";
    currentValue = "";
    equalsPressed = false;
  }
}

// ---------- number entry ----------
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    resetIfAfterEquals();
    if (currentValue.length >= MAX_DIGITS) {
      showToast("Can't enter more than 15 digits");
      return;
    }
    currentValue += button.textContent;
    updateDisplay();
  });
});

decimalButton.addEventListener("click", () => {
  resetIfAfterEquals();
  if (currentValue === "") {
    currentValue = "0.";
  } else if (!currentValue.includes(".")) {
    if (currentValue.length >= MAX_DIGITS) {
      showToast("Can't enter more than 15 digits");
      return;
    }
    currentValue += ".";
  }
  updateDisplay();
});

// ---------- operators ----------
function handleOperator(operatorSymbol) {
  if (storedValue === "Error") return;
  if (storedValue === "" && currentValue === "") return;

  if (equalsPressed) {
    // continue a new chain starting from the previous result
    expression = formatNumber(storedValue) + operatorSymbol;
    equalsPressed = false;
  } else if (storedValue === "") {
    // first operand just finished
    storedValue = currentValue;
    expression = formatNumber(storedValue) + operatorSymbol;
  } else if (currentValue !== "") {
    // a new operand was typed, fold it into the chain instead of collapsing it
    expression += currentValue + operatorSymbol;
    storedValue = calculate(storedValue, currentOperator, currentValue);
    if (storedValue === "Error") {
      currentOperator = "";
      currentValue = "";
      updateDisplay();
      return;
    }
  } else {
    // no new digits typed, just swapping the pending operator (+ then ×)
    expression = expression.slice(0, -1) + operatorSymbol;
  }

  currentOperator = operatorSymbol;
  currentValue = "";
  updateDisplay();
}

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => handleOperator(button.textContent));
});

// ---------- clear / delete ----------
clearEntryButton.addEventListener("click", () => {
  currentValue = "";
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  currentValue = "";
  storedValue = "";
  currentOperator = "";
  expression = "";
  equalsPressed = false;
  lastOperator = "";
  lastValue = "";
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  if (equalsPressed) return;
  currentValue = currentValue.slice(0, -1);
  updateDisplay();
});

// ---------- percent ----------
percentButton.addEventListener("click", () => {
  if (equalsPressed || storedValue === "Error") return;
  if (!currentValue && storedValue) {
    currentValue = storedValue;
    storedValue = "";
    currentOperator = "";
    expression = "";
  }
  const num = Number(currentValue);
  currentValue = storedValue
    ? String(storedValue * (num / 100))
    : String(num / 100);
  updateDisplay();
});

// ---------- equals ----------
equalButton.addEventListener("click", () => {
  if (storedValue === "Error") return;

  if (currentOperator && currentValue !== "") {
    const result = calculate(storedValue, currentOperator, currentValue);
    expression += currentValue;
    lastOperator = currentOperator;
    lastValue = currentValue;
    storedValue = result;
    currentValue = "";
    currentOperator = "";
    equalsPressed = true;
    updateDisplay();
  } else if (
    currentValue === "" &&
    !currentOperator &&
    lastOperator &&
    lastValue
  ) {
    // pressing "=" again repeats the last operation
    const result = calculate(storedValue, lastOperator, lastValue);
    expression = formatNumber(storedValue) + lastOperator + lastValue;
    storedValue = result;
    equalsPressed = true;
    updateDisplay();
  }
});

// ---------- keyboard ----------
document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    const btn = Array.from(numberButtons).find((b) => b.textContent === e.key);
    if (btn) btn.click();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    const opMap = { "*": "×", "/": "÷" };
    const operator = opMap[e.key] || e.key;
    const btn = Array.from(operatorButtons).find(
      (b) => b.textContent === operator,
    );
    if (btn) btn.click();
  } else if (e.key === "Enter") {
    equalButton.click();
  } else if (e.key === "Backspace") {
    deleteButton.click();
  } else if (e.key === "Escape" || e.key === "c") {
    clearButton.click();
  } else if (e.key === ".") {
    decimalButton.click();
  } else if (e.key === "%") {
    percentButton.click();
  }
  e.preventDefault();
});

updateDisplay();
