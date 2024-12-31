//link to keystrokes as well as clicks
//add delete button
    //arr.pop()

let numbers = [];
let operator = "";

const operate = function() {
    if (operator === "add") {
        return add(numbers);
    } else if (operator === "subtract") {
        return subtract(numbers);
    } else if (operator === "multiply") {
        return multiply(numbers);
    } else if (operator === "divide") {
        return divide(numbers);
    }
};

const display = function() {
    document.getElementById(".displayNum").innerHTML = numbers.join("");
}

const add = function(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    return sum;
};

const subtract = function(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        sum -= numbers[i];
    }
    return sum;
};

const multiply = function(numbers) {
    let product = 1;
    for (let i = 0; i < numbers.length; i++) {
        product *= numbers[i];
    }
    return product;
};

const divide = function(numbers) {
    if (numbers.length === 0) return 0;
    let quotient = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] === 0) {
            return "ERROR";
        }
        quotient /= numbers[i];
    }
    return quotient;
};