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

const MAX_DIGITS = 15;

let currentValue = "";
let storedValue = "";
let currentOperator = "";

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

function updateDisplay() {
  let displayString = "";

  if (currentValue) {
    displayString =
      typeof currentValue === "string"
        ? currentValue
        : formatNumber(currentValue);

    if (storedValue && currentOperator) {
      displayString =
        formatNumber(storedValue) + "" + currentOperator + "" + displayString;
    }
  } else if (storedValue) {
    displayString = formatNumber(storedValue);

    if (currentOperator) {
      displayString += "" + currentOperator;
    }
  }

  displayInput.value = displayString;

  if (displayInput.value.includes("Error")) {
    displayInput.style.color = "red";
  } else {
    displayInput.style.color = "white";
  }
  displayInput.blur();
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentValue.length >= MAX_DIGITS) {
      return alert("Can't enter more that 15 digits");
    }
    currentValue += button.textContent;
    updateDisplay();
  });
});

decimalButton.addEventListener("click", () => {
  if (currentValue === "") {
    currentValue = "0.";
    updateDisplay();
  } else if (!currentValue.includes(".")) {
    if (currentValue.length >= MAX_DIGITS) {
      return alert("Can't enter more that 15 digits");
    }
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
  if (!currentValue && storedValue) {
    currentValue = storedValue;
    storedValue = "";
    currentOperator = "";
  }
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

document.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    currentValue += e.key;
    updateDisplay();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    let opMap = { "*": "×", "/": "÷" }; // Map keyboard to symbols
    let operator = opMap[e.key] || e.key;
    if (storedValue === "") {
      storedValue = currentValue;
      currentValue = "";
    } else if (currentValue !== "") {
      storedValue = calculate();
      currentValue = "";
    }
    currentOperator = operator;
    updateDisplay();
  } else if (e.key === "Enter") {
    equalButton.click();
  } else if (e.key === "Backspace") {
    deleteButton.click();
  } else if (e.key === "Escape") {
    clearButton.click();
  } else if (e.key === ".") {
    decimalButton.click();
  } else if (e.key === "%") {
    percentButton.click();
  } else if (e.key === "c") {
    clearButton.click();
  }
  e.preventDefault();
});

// Robust: blur calculator focusables when clicking/tapping outside the calculator
(function installOutsideBlur() {
  const calculatorEl = document.querySelector("#calculator");
  if (!calculatorEl) return;

  // Make body focusable so we can move focus away as a fallback
  try {
    if (!document.body.hasAttribute("tabindex")) document.body.setAttribute("tabindex", "-1");
  } catch (err) {}

  function blurInside() {
    const focusables = calculatorEl.querySelectorAll("input, button, [tabindex]");
    focusables.forEach((el) => {
      try { el.blur(); } catch (err) {}
    });
    // As a fallback, focus the body so nothing inside stays focused
    try { document.body.focus(); } catch (err) {}
  }

  // pointerdown fires before focus/active changes on most devices
  document.addEventListener("pointerdown", (ev) => {
    if (!calculatorEl.contains(ev.target)) {
      blurInside();
    }
  });

  // also handle touchstart for older browsers/devices
  document.addEventListener("touchstart", (ev) => {
    if (!calculatorEl.contains(ev.target)) {
      blurInside();
    }
  }, { passive: true });
})();
