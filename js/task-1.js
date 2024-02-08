'use strict';

const firstNumber = parseFloat(prompt('Input first number:'));
const action = prompt('Input action (+, -, *, /):');
const secondNumber = parseFloat(prompt('Input second number:'));

function calc(a, b, callback) {
  if (isNaN(Number(a)) || isNaN(Number(b))) {
    if (action.trim().length > 1) {
      return alert(`Input correct number and action`);
    }
    return alert(`Input correct number!`);
  }
  switch (action.trim()) {
    case '+':
      return (callback = sum(a, b));
    case '-':
      return (callback = subtraction(a, b));
    case '/':
      return (callback = division(a, b));
    case '*':
      return (callback = multiplication(a, b));
    default:
      return alert('Input correct action (+ - * /)');
  }
}

const sum = (a, b) => alert(`Sum ${a} and ${b}: ${a + b}`);
const subtraction = (a, b) => alert(`Subtraction ${a} and ${b}: ${a - b}`);
const division = (a, b) => alert(`Division ${a} and ${b}: ${a / b}`);
const multiplication = (a, b) =>
  alert(`Multiplication ${a} and ${b}: ${a * b}`);

calc(firstNumber, secondNumber);
