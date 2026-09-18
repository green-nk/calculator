const SYMBOLS = ['+', '-', '*', '/', '=', 'ac'];

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

function reset() {
    number = "";
    otherNumber = "";
    operator = "";
    isOperatorPressed = false; 
};

function setupDisplay() {
    const displayContainer = document.querySelector(".display");
    const displayPara = document.createElement('p');
    displayPara.innerText = 0;

    displayContainer.appendChild(displayPara);
};

function setupDigits() {
    const MAX_DIGIT = 10;
    const digitContainer = document.querySelector(".digits");

    function handleDigit(event) {
        const displayPara = document.querySelector(".display p");

        if (!isOperatorPressed && !number || isOperatorPressed && !otherNumber) {
            displayPara.innerText = "";
        }
        
        const digit = event.currentTarget.textContent;
        displayPara.innerText += digit;

        if (!isOperatorPressed) number += digit;
        else otherNumber += digit;
    };

    for (let i = 0; i < MAX_DIGIT; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.addEventListener("click", handleDigit);
    
        digitContainer.appendChild(btn);
    }
};

function setupSymbols() {
    const symbolContainer = document.querySelector(".symbols");

    function handleSymbol(event) {
        const symbol = event.currentTarget.textContent;
        
        switch (symbol) {
            case '=':
                document.querySelector(".display p").innerText = operate(+number, +otherNumber, operator);
                reset();                
                break;
            case "ac":
                reset();
                document.querySelector(".display p").innerText = 0;
                break;
            default:
                isOperatorPressed = true;
                operator = event.currentTarget.textContent;
        }
    };
    
    for (let i = 0; i < SYMBOLS.length; i++) {
        const btn = document.createElement("button");
        btn.innerText = SYMBOLS[i];
        btn.addEventListener("click", handleSymbol);
        
        symbolContainer.appendChild(btn);
    }
};

let number = "";
let otherNumber = "";
let operator = "";
let isOperatorPressed = false;

setupDisplay();
setupDigits();
setupSymbols();
