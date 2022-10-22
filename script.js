// Calculator Project

let firstOperand = null,
firstOperator = null,
secondOperand = null,
secondOperator = null,
result = null,
displayValue = "0";

const buttons = document.querySelectorAll('button'),
displayScreen = document.getElementById('display-screen');

displayScreen.innerText = "0";

const clearDisplay = function() {
    firstOperand = null;
    firstOperator = null;
    secondOperand = null;
    secondOperator = null;
    result = null;
    displayValue = "0";
}

const displayUpdate = function() {  
    if(displayValue.length > 8 ) {
        alert("Number out of bounds, try a smaller calculation");
        clearDisplay();
    }
    displayScreen.innerText = displayValue;
};

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y != 0) ? x / y : Infinity;  
const modulo = (x, y) => x % y;
const exponentiate = (x, y) => x ** y;

const operate = function(x, y, operator) {
    switch (operator) {
        case "+":
            return add(x, y);
            break;
        case "-":
            return subtract(x, y);
            break;
        case "*":
            return multiply(x, y);
            break;
        case "/":
            return divide(x, y);
            break;
        case "%":
            return modulo(x, y);
            break;
        case "**":
            return exponentiate(x, y);
            break;
    }
}

function operandIsClicked(operand) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            //first operand input
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            //starts new operation after equalsIsClicked()
            displayValue = operand;
        } else {
            displayValue += operand;
        } 
    } else {
        //inputs to second operand
        if(displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function operatorIsClicked(operator) {
    if(firstOperator != null && secondOperator === null) {
        //handles input of second operator
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result.toString();
        firstOperand = displayValue;
        result = null;
    } else if(firstOperator != null && secondOperator != null) {
        //new secondOperator
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = result.toString();
        firstOperand = displayValue;
        result = null;
    } else { 
        //2nd click - handles first operator input
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function decimalIsClicked(dot) {
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } 
    if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function equalsIsClicked() {
  //hitting equals doesn't display undefined before operate()
    if(firstOperator === null) {
        displayValue = displayValue;
    } else if(secondOperator != null) {
        //handles final result
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        displayValue = result.toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null; 
    } else {
        //handles first operation
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = result.toString();
        firstOperand = displayValue;
        secondOperand = null;
        firstOperator = null;
        secondOperator = null;
        result = null;  
    }
}

const main = function() {
    buttons.forEach((button) => {
        button.addEventListener('click', function(e) {
            if(button.classList.contains('operand')) {
                operandIsClicked(button.value);
                displayUpdate();
            } 
            if(button.classList.contains('operator')) {
                operatorIsClicked(button.value);
            }
            if(button.classList.contains('decimal')) {
                decimalIsClicked(button.value);
                displayUpdate();
            } 
            if(button.classList.contains('equals')) {
                equalsIsClicked();
                displayUpdate();
            }  
            if(button.classList.contains('clear')) {
                clearDisplay();
                displayUpdate();
            }
        })
    })
}

clearDisplay();
main();





