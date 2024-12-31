//link to keystrokes as well as clicks
//limit numbers to 5 digits total
//display disappears when equal sign is clicked
//after operator is clicked, the new number should replace the previous number
//zero should never come before a number
//decimal button does not work
//decimals cannot come twice
//decimal numbers and results can only have 1 decimal place
//calculator should only work with two numbers at a time, after this it should take the result as a new "a" and accept a new operator

let currentNumber = "";
let operator = "";
let previousResult = null;
let hasDecimal = false;

const display = function() {
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

document.querySelectorAll(".buttons button").forEach(button => 
    {button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
        if (currentNumber.length < 5) {
            if (value === "0" && currentNumber === "") {
                return;
            }
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
    } else if (value === "=") {
        if (previousResult !== null && operator && currentNumber) {
            previousResult = calculate(previousResult, currentNumber, operator);
            display(previousResult);
            currentNumber = "";
            operator = "";
            hasDecimal = previousResult.toString().includes(".");
        }
    } else if (value === "del") {
        if (currentNumber) {
            if (currentNumber.slice(-1) === ".") hasDecimal = false;
            currentNumber = currentNumber.slice(0, -1);
            display(currentNumber || "0");
        }
    }   else {
        if (currentNumber) {
            if (previousResult === null) {
                previousResult = currentNumber;
            } else if (operator){
                previousResult = calculate(previousResult, currentNumber, operator);
                display(previousResult);
            }
            operator = value;
            currentNumber = "";
            hasDecimal = false;
        }
    }
    });
});