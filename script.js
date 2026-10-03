const SYMBOLS = ["AC", '÷', '×', '−', '+', '='];
const MAX_DIGIT = 10;
const MAX_DIGIT_PER_ROW = 3;
const TOTAL_DIGIT = SYMBOLS.length * MAX_DIGIT_PER_ROW;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b == 0) ? NaN : a / b;

function operate(a, b, operator) {
    let result = null;

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
    numDisplay = "0";
    number = "";
    operator = "";
    prevOtherNumber = "";
    otherNumber = "";
    isNumAssgined = false;
};

function setActive() {
    const disabledOperand = document.querySelector("button:disabled");
    if (disabledOperand) disabledOperand.disabled = false;
}

function formatNumDisplay(numString) {
    // Extract sign if any
    const num = +numString;
    let isNegative = false;
    if (num < 0) {
        isNegative = true;
        numString = numString.slice(1);
    }

    // Split whole and decimal if any
    const numSplit = numString.split('.');
    const whole = numSplit[0];
    const decimal = (numString.length == 1) ? null : (numSplit[1] === "") ? "0" : numSplit[1];

    // Format with ',' on every 3rd digit from the last
    let format = "";
    let j = -3;
    let i = whole.length - 1;

    while (i >= 0) {
        if (i != whole.length - 1) format = ',' + format;
        format = whole.slice(j, i + 1) + format;

        j -= 3;
        i -= 3;
    }

    if (isNegative) format = '-' + format;
    if (decimal) format += '.' + ((decimal == "0") ? "" : decimal);

    return format;
};

function populateDigitGrid(digitContainer, handleDigit, handleBackspace) {
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
            
            btn.addEventListener("click", setActive);
            btn.addEventListener("click", handleDigit);
    
            digitContainer.appendChild(btn);
        }
    }
    
    // Populate "0", "." and "←"
    for (let i = 0; i < MAX_DIGIT_PER_ROW; i++) {
        const btn = document.createElement("button");
    
        if (i == 0 || i == 1) {
            btn.innerText = (i == 0) ? i : '.';
            btn.addEventListener("click", setActive);
            btn.addEventListener("click", handleDigit);
        } else if (i == 2) {
            btn.innerText = '←';
            btn.addEventListener("click", setActive);
            btn.addEventListener("click", handleBackspace);
        } else btn.classList.add("unused");
    
        digitContainer.appendChild(btn);
    }
};

function setupDigits() {
    const digitContainer = document.querySelector(".digits");

    function handleDigit(event) {
        const displayPara = document.querySelector(".display p");
        const digit = event.currentTarget.textContent;
        
        if (numDisplay == "0" && digit != '.') numDisplay = "";
        if (digit != '.' || !numDisplay.includes('.')) numDisplay += digit;
        displayPara.innerText = formatNumDisplay(numDisplay);

        if (!isNumAssgined) number = numDisplay;
        else otherNumber = numDisplay;
    };

    function handleBackspace() {
        const displayPara = document.querySelector(".display p");
        numDisplay = (!isNumAssgined) ? number.slice(0, -1) : otherNumber.slice(0, -1);

        if (numDisplay != "" && numDisplay != "-") {
            displayPara.innerText = formatNumDisplay(numDisplay);

            if (!isNumAssgined) number = numDisplay;
            else otherNumber = numDisplay;

        } else {
            if (!isNumAssgined) {
                numDisplay = "0";
                displayPara.innerText = formatNumDisplay(numDisplay);

                number = "";
            }
        }
    }

    populateDigitGrid(digitContainer, handleDigit, handleBackspace);
};

function setupSymbols() {
    const symbolContainer = document.querySelector(".symbols");

    function handleSymbol(event) {
        const symbol = event.currentTarget.textContent;
        const displayPara = document.querySelector(".display p");
        
        function handleEqual() {
            let result = null;

            if (otherNumber) {
                result = operate(+number, +otherNumber, operator);
                prevOtherNumber = otherNumber;
            }
            else result = operate(+number, +prevOtherNumber, operator);

            numDisplay = `${result}`;
            number = numDisplay;
            displayPara.innerText = formatNumDisplay(numDisplay);

            numDisplay = "0";
            otherNumber = "";
            isNumAssgined = false;
        };

        function handleAllClear() {
            reset();
            displayPara.innerText = numDisplay;
        };

        function handleOperand() {
            if (otherNumber) {
                let result = operate(+number, +otherNumber, operator);
                prevOtherNumber = otherNumber;

                numDisplay = `${result}`;
                number = numDisplay;
                displayPara.innerText = formatNumDisplay(numDisplay);
            }

            numDisplay = "0";
            otherNumber = "";
            isNumAssgined = true;

            operator = event.currentTarget.textContent;
        }

        switch (symbol) {
            case '=':
                if (operator) handleEqual();
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
        btn.addEventListener("click", setActive);

        if (i == 0) btn.id = "ac";
        else btn.classList.add("symbol");
        btn.addEventListener("click", handleSymbol);

        if (i != 0 && i != SYMBOLS.length - 1) btn.addEventListener("click", () => {
            btn.disabled = true;
        });

        symbolContainer.appendChild(btn);
    }
};

let numDisplay = "0";
let number = "";
let operator = "";
let prevOtherNumber = "";
let otherNumber = "";
let isNumAssgined = false;

setupDigits();
setupSymbols();
