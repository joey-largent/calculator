//link to keystrokes as well as clicks

let numbers = [];
let operator = "";

const operate = function() {
    if (operator === "+") {
        return add(numbers);
    } else if (operator === "-") {
        return subtract(numbers);
    } else if (operator === "x") {
        return multiply(numbers);
    } else if (operator === "÷") {
        return divide(numbers);
    }
};

const display = function() {
    const displayElement = document.querySelector(".displayNum");
    displayElement.innerHTML = numbers.length > 0 ? numbers.join("") : "0";
};

const add = function(numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
};

const subtract = function(numbers) {
    return numbers.reduce((total, num) => total - num);
};

const multiply = function(numbers) {
    return numbers.reduce((product, num) => product * num, 1);
};

const divide = function(numbers) {
    return numbers.reduce((quotient, num) => {
    if (num === 0) return "ERROR";
    return quotient;
    });
};

document.querySelectorAll(".buttons button").forEach(button => 
    {button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value)) {
        numbers.push(Number(value));
        display();
    } else if (value === "c") {
        numbers = [];
        operator = "";
        display();
    } else if (value === "=") {
        const result = operate();
        numbers = [result];
        display();
    } else if (value === "del") {
        numbers.pop();
        display();
    }   else {
        operator = value;
        display();
    }
    });
});