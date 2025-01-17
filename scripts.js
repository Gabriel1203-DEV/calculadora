// Obtener los elementos del DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Inicializar variables
let currentInput = '';
let previousInput = '';
let operator = '';

// Función para actualizar el display
function updateDisplay(value) {
    display.value = value;
}

// Función para manejar números y el punto decimal
function handleNumber(num) {
    currentInput += num;
    updateDisplay(currentInput);
}

// Función para manejar operadores
function handleOperator(op) {
    if (currentInput === '') return; // Si no hay nada que operar, salir
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

// Función para realizar el cálculo
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') return;

    const num1 = parseFloat(previousInput);
    const num2 = parseFloat(currentInput);

    let result = 0;
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Error';
            break;
        default:
            break;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

// Función para borrar todo (AC)
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('');
}

// Función para borrar un carácter (DE)
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
}

// Agregar evento de clic a cada botón
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const { id } = button;

        if (button.classList.contains('Numero')) {
            handleNumber(id);
        } else if (button.classList.contains('Operator') && id !== '=' && id !== 'AC' && id !== 'DE') {
            handleOperator(id);
        } else if (id === '=') {
            calculate();
        } else if (id === 'AC') {
            clearAll();
        } else if (id === 'DE') {
            deleteLast();
        }
    });
});