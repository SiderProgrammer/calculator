export default class Engine {
  constructor() {
    this.number = "";
  }

  calculate(input) {
    if (this.isDigit(input)) return this.handleDigitInput(input);

    return this.handleOperationInput(input);
  }

  handleDigitInput(input) {
    if (!this.isDigit(this.previousInput)) this.number = "";

    if (input === "." && this.containDecimalPoint(this.number))
      return this.number;

    if (input === "." && this.number === "") {
      this.number = "0.";
      return this.number;
    }

    this.number += input;
    this.previousInput = input;

    return this.number;
  }
  handleOperationInput(input) {
    if (input === "+" || input === "-" || input === "*" || input === "/") {
      return this.handleBasicMathOperation(input);
    } else if (input === "=") {
      return this.handleEqualOperation(input);
    } else if (input === "%") {
      return this.handlePercentageOperation(input);
    } else if (input === "C") {
      return this.handleClearOperation();
    }
  }
  handleClearOperation() {
    this.number = "";
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    return "0";
  }
  handlePercentageOperation() {
    if (this.number === "") {
      this.number = "0";
    }

    this.number = this.percentage(this.number);

    return this.number;
  }

  handleEqualOperation(input) {}
  updatePreviousState(number, input) {
    this.previousNumber = number;
    this.previousInput = input;
    this.previousOperation = input;
  }
  handleBasicMathOperation(input) {
    if (!this.previousNumber) {
      this.updatePreviousState(this.number, input);

      return this.number;
    } else {
      let temp = this.previousInput;
      this.previousInput = input;
      if (temp !== input && this.previousOperation !== "=" && temp !== "=") {
        if (input === "+") {
          this.number = this.add(this.previousNumber, this.number);
        } else if (input === "-") {
          this.number = this.subtract(this.previousNumber, this.number);
        } else if (input === "*") {
          this.number = this.muliply(this.previousNumber, this.number);
        } else if (input === "/") {
          this.number = this.divide(this.previousNumber, this.number);
        }
        this.updatePreviousState(this.number, input);
        return this.number;
      } else {
        this.updatePreviousState(this.number, input);

        return this.number;
      }
    }
  }
  add(previousNumber, number) {
    return (parseFloat(previousNumber) + parseFloat(number)).toString();
  }
  subtract(previousNumber, number) {
    return (parseFloat(previousNumber) - parseFloat(number)).toString();
  }

  muliply(previousNumber, number) {
    return (parseFloat(previousNumber) * parseFloat(number)).toString();
  }

  divide(previousNumber, number) {
    return (parseFloat(previousNumber) / parseFloat(number)).toString();
  }
  percentage(number) {
    return (parseFloat(number) / 100).toString();
  }
  containDecimalPoint(number) {
    return number.includes(".");
  }

  isDigit(value) {
    return Number(value) || value === "0" || value === ".";
  }
}
