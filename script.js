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

let number = "";
let otherNumber = "";
let operator;
let isOperatorPressed = false;

const digitContainer = document.querySelector(".digits");
for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => {
        if (!isOperatorPressed) number += btn.innerText;
        else otherNumber += btn.innerText;

        const displayContainer = document.querySelector(".display");
        if (!displayContainer.hasChildNodes()) displayContainer.appendChild(document.createElement('p'));

        const displayPara = document.querySelector(".display p");
        displayPara.innerText += btn.innerText;
    });

    digitContainer.appendChild(btn);
}

const operandContainer = document.querySelector(".operands");
for (let i = 0; i < OPERANDS.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = OPERANDS[i];

    operandContainer.appendChild(btn);
}
