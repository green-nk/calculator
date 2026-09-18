const OPERANDS = ['+', '-', '*', '/'];
const FUNCTIONALS = ['=', 'c'];

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
        default:
            alert(`OOPS! No support for ${operator}`);
    }

    return result;
};

let number = "";
let otherNumber = "";
let operator = "";
let isOperatorPressed = false;

const displayContainer = document.querySelector(".display");
const displayPara = document.createElement('p');
displayPara.innerText = 0;

displayContainer.appendChild(displayPara);

const digitContainer = document.querySelector(".digits");
for (let i = 0; i < 10; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.addEventListener("click", () => {
        const displayPara = document.querySelector(".display p");
        if (!isOperatorPressed && !number || isOperatorPressed && !otherNumber) displayPara.innerText = "";
        displayPara.innerText += btn.innerText;

        if (!isOperatorPressed) number += btn.innerText;
        else otherNumber += btn.innerText;
    });

    digitContainer.appendChild(btn);
}

const symbolContainer = document.querySelector(".symbols");
for (let i = 0; i < OPERANDS.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = OPERANDS[i];
    btn.addEventListener("click", () => {
        isOperatorPressed = true;
        operator = btn.innerText;
    });

    symbolContainer.appendChild(btn);
}

for (let i = 0; i < FUNCTIONALS.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = FUNCTIONALS[i];
    btn.addEventListener("click", () => {
        switch (btn.textContent) {
            case 'c':
                break;
            default:
                const result = operate(+number, +otherNumber, operator);
                document.querySelector(".display p").innerText = result;

                number = "";
                otherNumber = "";
                operator = "";
                isOperatorPressed = false;
        }
    });
    
    symbolContainer.appendChild(btn);
}
