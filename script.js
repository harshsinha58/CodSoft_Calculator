document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentOperand = '';
    let previousOperand = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                currentOperand = '';
                previousOperand = '';
                operator = '';
                display.innerText = '0';
            } else if (value === '=') {
                if (currentOperand && previousOperand && operator) {
                    const result = operate(previousOperand, currentOperand, operator);
                    display.innerText = result;
                    previousOperand = result;
                    currentOperand = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentOperand) {
                    if (previousOperand) {
                        previousOperand = operate(previousOperand, currentOperand, operator);
                    } else {
                        previousOperand = currentOperand;
                    }
                    operator = value;
                    currentOperand = '';
                    display.innerText = previousOperand;
                }
            } else {
                currentOperand += value;
                display.innerText = currentOperand;
            }
        });
    });

    function operate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                return a / b;
            default:
                return;
        }
    }
});
