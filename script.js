const SYMBOLS = ["AC", '÷', '×', '−', '+', '='];
const MAX_DIGIT = 10;
const MAX_DIGIT_PER_ROW = 3;
const TOTAL_DIGIT = SYMBOLS.length * MAX_DIGIT_PER_ROW;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b == 0) ? NaN : a / b;

function operate(a, b, operator) {
    let result;

    switch (operator) {
        case '−':
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

function populateDigitGrid(digitContainer, handleDigit) {
    const numRowUsed = Math.ceil(MAX_DIGIT / MAX_DIGIT_PER_ROW);
    const numSkips = TOTAL_DIGIT - numRowUsed * MAX_DIGIT_PER_ROW;
    
    // Populate skip digits
    for (let i = 0; i < numSkips; i++) {
        const btn = document.createElement("button");
        btn.classList.add("unused");
    
        digitContainer.appendChild(btn);
    }
    
    // Populate numDigits 
    for (let i = 0; i < numRowUsed - 1; i++) {
        for (let j = 0; j < MAX_DIGIT_PER_ROW; j++) {
            const btn = document.createElement("button");
    
            const digit = MAX_DIGIT - (MAX_DIGIT_PER_ROW * (i + 1)) + j
            btn.innerText = digit;
            btn.addEventListener("click", handleDigit);
    
            digitContainer.appendChild(btn);
        }
    }
    
    // Populate "0"
    for (let i = 0; i < MAX_DIGIT_PER_ROW; i++) {
        const btn = document.createElement("button");
    
        if (i != 0) btn.classList.add("unused");
        else {
            btn.innerText = i;
            btn.addEventListener("click", handleDigit);
        }
    
        digitContainer.appendChild(btn);
    }
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

    populateDigitGrid(digitContainer, handleDigit);
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

        function handleOperand() {
            if (isOperatorPressed) {
                let result = operate(+number, +otherNumber, operator);
                displayPara.innerText = result;

                number = `${result}`;
            }

            numDisplay = "";
            isOperatorPressed = true;

            operator = event.currentTarget.textContent;
        }

        switch (symbol) {
            case '=':
                handleEqual();
                break;
            case "AC":
                handleAllClear();
                break;
            default:
                handleOperand();
        }
    };
    
    for (let i = 0; i < SYMBOLS.length; i++) {
        const btn = document.createElement("button");
        const symbol = SYMBOLS[i];
        btn.innerText = symbol; 
        
        if (i == 0) btn.id = "ac";
        else btn.classList.add("symbol");
        btn.addEventListener("click", handleSymbol);

        if (i != 0 && i != SYMBOLS.length - 1) btn.addEventListener("click", () => {
            btn.classList.add("active");
        });

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
