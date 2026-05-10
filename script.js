let currentInput = "0";
let previousInput = "";
let operator = undefined;

const currentText = document.getElementById("current-operand");
const previousText = document.getElementById("previous-operand");

function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return;
  if (currentInput === "0" && number !== ".") {
    currentInput = number.toString();
  } else {
    currentInput = currentInput.toString() + number.toString();
  }
  updateDisplay();
}

function chooseOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") compute();
  operator = op;
  previousInput = currentInput;
  currentInput = "";
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "×":
      computation = prev * current;
      break;
    case "÷":
      computation = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  currentInput = computation;
  operator = undefined;
  previousInput = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operator = undefined;
  updateDisplay();
}

function deleteNumber() {
  currentInput = currentInput.toString().slice(0, -1);
  if (currentInput === "") currentInput = "0";
  updateDisplay();
}

function updateDisplay() {
  currentText.innerText = currentInput;
  if (operator != null) {
    previousText.innerText = `${previousInput} ${operator}`;
  } else {
    previousText.innerText = "";
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendNumber(".");
  if (e.key === "=" || e.key === "Enter") compute();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clearDisplay();
  if (e.key === "+") chooseOperator("+");
  if (e.key === "-") chooseOperator("-");
  if (e.key === "*") chooseOperator("×");
  if (e.key === "/") chooseOperator("÷");
});
