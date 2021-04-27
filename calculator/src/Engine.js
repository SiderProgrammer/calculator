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
  removeZero(number) {
    if (number.length > 1 && number[0] === "0" && number[1] !== ".") {
      return this.removeZero(number.substr(1, number.length));
    }

    return number;
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

  handleEqualOperation(input) {
    if (this.previousNumber == null) {
      this.updatePreviousState(this.number, input);

      return this.number;
    } else {
      this.previousInput = input;

      if (this.previousOperation !== "=" && input === "=") {
        const temp = this.number;

        if (this.previousOperation === this.OperationEnum.addition) {
          this.perform(this.add);
        }
        if (this.previousOperation === this.OperationEnum.subtraction) {
          this.perform(this.subtract);
        }
        if (this.previousOperation === this.OperationEnum.multiplication) {
          this.perform(this.muliply);
        }
        if (this.previousOperation === this.OperationEnum.division) {
          this.perform(this.divide);
        }

        this.repeatNumber = temp;
        this.repeatOperation = this.previousOperation;
        this.previousInput = input;
        this.previousOperation = input;

        return this.number;
      } else {
        let temp = this.number;

        if (this.repeatNumber != null) {
          if (this.repeatOperation === this.OperationEnum.addition) {
            this.number = this.add(this.number, this.repeatNumber);
          }
          if (this.repeatOperation === this.OperationEnum.subtraction) {
            this.number = this.subtract(this.number, this.repeatNumber);
          }
          if (this.repeatOperation === this.OperationEnum.multiplication) {
            this.number = this.muliply(this.number, this.repeatNumber);
          }
          if (this.repeatOperation === this.OperationEnum.division) {
            this.number = this.divide(this.number, this.repeatNumber);
          }
        }

        this.updatePreviousStatus(temp, input);

        return this.number;
      }
    }
  }
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
      const temp = this.previousInput;
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
    return Boolean(Number(value) || value === "0" || value === ".");
  }
}
