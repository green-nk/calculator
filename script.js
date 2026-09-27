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

function reset(num = "") {
    numDisplay = "0";
    number = `${num}`;
    otherNumber = "";
    operator = "";
};

function setupDigits() {
    const MAX_DIGIT = 10;
    const digitContainer = document.querySelector(".digits");

    function handleDigit(event) {
        const displayPara = document.querySelector(".display p");
        if (numDisplay === "0" || (operator && !otherNumber)) numDisplay = "";

        const digit = event.currentTarget.textContent;
        numDisplay += digit;
        displayPara.innerText = numDisplay;

        if (!operator) number += digit;
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
        const displayPara = document.querySelector(".display p");
        
        function handleEqual() {
            let result = operate(+number, +otherNumber, operator);
            displayPara.innerText = result;
            
            reset(result);
        };

        function handleAllClear() {
            reset();
            displayPara.innerText = numDisplay;
        };

        switch (symbol) {
            case '=':
                handleEqual();
                break;
            case "ac":
                handleAllClear();
                break;
            default:
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

let numDisplay = "0";
let number = "";
let otherNumber = "";
let operator = "";

setupDigits();
setupSymbols();
