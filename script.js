class Calculator {
  constructor(previousOperation, currentOperation) {
    this.previousOperation = previousOperation;
    this.currentOperation = currentOperation;
    this.clear();
  }

  clear() {
    this.currentOperate = "";
    this.previousOperate = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperate = this.currentOperate.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperate.includes(".")) return;
    this.currentOperate = this.currentOperate.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperate === "") return;
    if (this.previousOperate !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperate = this.currentOperate;
    this.currentOperate = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperate);
    const current = parseFloat(this.currentOperate);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
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
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperate = computation;
    this.operation = undefined;
    this.previousOperate = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperation.innerHTML = this.getDisplayNumber(this.currentOperate);
    if (this.operation != null) {
      this.previousOperation.innerHTML = `${this.getDisplayNumber(this.previousOperate)} ${this.operation}`;
    } else {
      this.previousOperation.innerHTML = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const currentOperationTextElement = document.querySelector("[data-current-operate]");
const previousOperationTextElement = document.querySelector("[data-previous-operate]");

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerHTML);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerHTML);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
