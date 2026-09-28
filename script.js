const SYMBOLS = ["AC", '÷', '×', '-', '+', '='];
const MAX_DIGIT = 10;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b == 0) ? NaN : a / b;

function operate(a, b, operator) {
    let result;

    switch (operator) {
        case '-':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷':
            result = divide(a, b);
            break;
        default:
            result = add(a, b);
    }

    return +result.toFixed(MAX_DIGIT);
};

function reset() {
    numDisplay = '0';
    isOperatorPressed = false;
    number = "";
    otherNumber = "";
    operator = "";
};

function setupDigits() {
    const digitContainer = document.querySelector(".digits");

    function handleDigit(event) {
        const displayPara = document.querySelector(".display p");
        if (numDisplay == '0') numDisplay = "";

        const digit = event.currentTarget.textContent;
        numDisplay += digit;
        displayPara.innerText = numDisplay;

        if (!isOperatorPressed) number = numDisplay;
        else otherNumber = numDisplay;
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
            number = `${result}`;

            if (operator) numDisplay = "";
            isOperatorPressed = false;
        };

        function handleAllClear() {
            reset();
            displayPara.innerText = numDisplay;
        };

        switch (symbol) {
            case '=':
                handleEqual();
                break;
            case "AC":
                handleAllClear();
                break;
            default:
                if (isOperatorPressed) {
                    let result = operate(+number, +otherNumber, operator);
                    displayPara.innerText = result;
                    number = `${result}`;
                }

                numDisplay = "";
                isOperatorPressed = true;
                operator = event.currentTarget.textContent;
        }
    };
    
    for (let i = 0; i < SYMBOLS.length; i++) {
        const btn = document.createElement("button");
        const symbol = SYMBOLS[i];
        btn.innerText = symbol;
        
        if (i == 0) btn.id = "ac";
        else btn.classList.add("operand");

        btn.addEventListener("click", handleSymbol);
        
        symbolContainer.appendChild(btn);
    }
};

let numDisplay = '0';
let isOperatorPressed = false;
let number = "";
let otherNumber = "";
let operator = "";

setupDigits();
setupSymbols();
