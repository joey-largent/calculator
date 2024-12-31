//link to keystrokes as well as clicks

let currentNumber = "";
let operator = "";
let previousResult = null;
let hasDecimal = false;

const display = function(content) {
    const displayElement = document.querySelector(".displayNum");
    displayElement.innerHTML = content || "0";
};

const operate = function(a, b, operator) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    let result;

    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "x":
            result = num1 * num2;
            break;
        case "÷":
            result = num2 === 0 ? "ERROR" : num1 / num2;
            break;
        default:
            return b;
    }

    return parseFloat(result.toFixed(1));
};

const handleInput = function(value) {
    if (!isNaN(value)) {
        if (currentNumber.length < 5) {
            if (value === "0" && currentNumber === "") return;
            currentNumber += value;
            display(currentNumber);
        }
    } else if (value === ".") {
        if (!hasDecimal) {
            currentNumber += currentNumber === "" ? "0." : ".";
            hasDecimal = true;
            display(currentNumber);
        }
    } else if (value === "c") {
        previousResult = null;
        currentNumber = "";
        operator = "";
        hasDecimal = false;
        display();
    } else if (value === "=" || value === "Enter") {
        if (previousResult !== null && operator) {
            previousResult = operate(previousResult, currentNumber || previousResult, operator);
            display(previousResult);
            currentNumber = "";
            operator = "";
            hasDecimal = previousResult.toString().includes(".");
        }
    } else if (value === "del" || value === "Backspace") {
        if (currentNumber) {
            if (currentNumber.slice(-1) === ".") hasDecimal = false;
            currentNumber = currentNumber.slice(0, -1);
            display(currentNumber || "0");
        }
    }   else {
        if (currentNumber || previousResult !== null) {
            if (operator && currentNumber) {
                previousResult = operate(previousResult || currentNumber, currentNumber, operator);
                display(previousResult);
            } else if (!operator && currentNumber) {
                previousResult = currentNumber;
            }
            operator = value;
            currentNumber = "";
            hasDecimal = false;
        }
    }
};

document.querySelectorAll(".buttons button").forEach(button => {
    button.addEventListener("click", () => handleInput(button.textContent));
});


document.addEventListener("keydown", (event) => {
    const key = event.key;
    const validKeys = "0123456789.+-*/EnterBackspace".split("");
    if (validKeys.includes(key)) {
        event.preventDefault();
        handleInput(key);
    } else if (key === "c" || key === "C") {
        handleInput("c");
    }
});