const display = document.getElementById("display");
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const allClear = document.getElementById("ac");
const equals = document.getElementById("equals");
/* const buttons = document.querySelectorAll(".btn"); */
const del = document.getElementById("del");
const decimal = document.getElementById("decimal");
const keyboardInput = document.querySelectorAll('button');

/* document.addEventListener('keydown', (e) => {
  console.log(e)
});
 */
let firstOperand;
let secondOperand;
let operator;
let firstOperandComplete = false;
let result;

/* buttons.forEach((el) => {
  el.addEventListener("keydown", () => {
    display.value += el.value;
  });
}); */

allClear.addEventListener("click", () => {
  display.value = "0";
  firstOperand = undefined;
  secondOperand = undefined;
  operator = undefined;
  firstOperandComplete = false;
});

del.addEventListener("click", () => {
  display.value = display.value.slice(0, -1);
  if (!operator) firstOperand = display.value;
  else if (firstOperandComplete) {
    if (!secondOperand) display.value = "";
    secondOperand = display.value;
  }
});

decimal.addEventListener("click", () => {
  if (!display.value.includes(".")) display.value += ".";
});

operands.forEach((el) => {
  el.addEventListener("click", () => {
    if (display.value === "0") display.value = "";
    if (!operator) {
      display.value += el.value;
      firstOperand = display.value;
      firstOperandComplete = true;
    } else if (firstOperandComplete) {
      if (!secondOperand) display.value = "";
      display.value += el.value;
      secondOperand = display.value;
    }
  });
});

operators.forEach((el) => {
  el.addEventListener("click", () => {
    if (firstOperandComplete && secondOperand) {
      result = operate(firstOperand, secondOperand, operator);
      firstOperand = result;
      secondOperand = undefined;
      operator = el.value;
      if (result === "you died") display.value = result;
      else if (result % 1 !== 0) display.value = Number(result).toFixed(2);
      else display.value = Number(result).toFixed(0);
    } else {
      operator = el.value;
      firstOperandComplete = true;
    }
  });
});

function operate(first, second, op) {
  switch (op) {
    case "/":
      if (parseFloat(second) === 0) {
        return "you died";
      }
      return parseFloat(first) / parseFloat(second);
    case "*":
      return parseFloat(first) * parseFloat(second);
    case "-":
      return parseFloat(first) - parseFloat(second);
    case "+":
      return parseFloat(first) + parseFloat(second);
    default:
      return NaN;
  }
}

equals.addEventListener("click", () => {
  if (firstOperand && secondOperand && operator) {
    result = operate(firstOperand, secondOperand, operator);
    if (result === "you died") display.value = result;
    else if (result % 1 !== 0) display.value = Number(result).toFixed(2);
    else display.value = Number(result).toFixed(0);
    firstOperand = result;
    secondOperand = undefined;
    operator = undefined;
    firstOperandComplete = false;
  }
});
