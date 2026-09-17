const OPERANDS = ['+', '-', '*', '/', '=', "c"]

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(a, b, operator) {
    let result;  

    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
    }

    return result;
};

const digitContainer = document.querySelector(".digits");
for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;

    digitContainer.appendChild(btn)
}

const operandContainer = document.querySelector(".operands");
for (let i = 0; i < OPERANDS.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = OPERANDS[i];

    operandContainer.appendChild(btn);
}

let number;
let otherNumber;
let operator;
