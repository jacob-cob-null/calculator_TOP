const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

const display = document.getElementById('display');

let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let expression = [];
let isOperatorClicked = false;
let isClearClicked = false;

//number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let number = event.target.innerText;

        if (isOperatorClicked) {
            display.value = "";
            isOperatorClicked = false;
        }
        if (isClearClicked) {
            display.value = "";
            isClearClicked = false;
        }
        if (number === '.' && display.value.includes('.')) { //check if current number already has decimal point
            return; 
        }
        if (!isNaN(number) || number === '.') { //include decimal point
            display.value = display.value.toString() + number;

            if (currentOperation === null) {
                firstNumber = display.value;
            } else {
                secondNumber = display.value;
            }
        }
    });
});
//check second number if empty
function checkSecondNumber() {
    if (secondNumber !== '' && expression[expression.length - 1] !== secondNumber) {
        expression.push(secondNumber);
    }
}
//operation buttons
function initializeOperationButtons() {
    operationButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let operation = event.target.innerText;
            let lastChar = display.value.slice(-1); //get last character of display value
            if (isNaN(lastChar)) { //prevents multiple consecutive
                return;
            }
            if (firstNumber !== '' && currentOperation === null) {
                expression.push(firstNumber);
            }
            checkSecondNumber();
            display.value += operation;
            currentOperation = operation;
            expression.push(currentOperation);
            isOperatorClicked = true;
            console.log(expression);
        });
    });
}

initializeOperationButtons();
equalsButton.addEventListener('click', () => {
    checkSecondNumber();
    calculate();
});

clearButton.addEventListener('click', () => {
    clearDisplay();
});

function calculate() {
    if (expression.length < 3) {
        return;
    }
        //scales on size of expression array
        let first = parseFloat(expression[expression.length - 3]); 
        let second = parseFloat(expression[expression.length - 1]);
        let operation = expression[expression.length - 2];

        let result = 0;

        switch (operation) {
            case '+':
                result = first + second;
                break;
            case '-':
                result = first - second;
                break;
            case '*':
                result = first * second;
                break;
            case '/':
                second === 0 ? display.value = 'Error' : result = first / second;
                break;
            default:
                return;
        }
        display.value = result;
        firstNumber = result.toString();
        secondNumber = '';
        currentOperation = null;
        expression = [result];
    } 


function clearDisplay() {
    display.value = "";
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
    expression = [];
    isOperatorClicked = false;
    isClearClicked = true;
}