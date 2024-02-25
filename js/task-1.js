'use strict';
// Змінні для роботи
const numbers = document.querySelectorAll('.number');
const result = document.querySelector('.result p');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equal');
const clear = document.querySelector('.ac');
const negative = document.querySelector('.plus-minus');
const percent = document.querySelector('.percent');
const dots = document.querySelector('.dot');

let firstValue = '';
let isFirstValue = false;
let secondValue = '';
let isSecondValue = false;
let sign = '';
let resultValue = 0;

//  Цикл для виводу та отримання чисел
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', e => {
    let atr = e.target.getAttribute('value');
    if (!isFirstValue) {
      getFirstValue(atr);
    } else if (isFirstValue && !isSecondValue) {
      getSecondValue(atr);
    }
  });
}

function getFirstValue(el) {
  result.innerHTML = '';
  if (el === '0' && firstValue === '0') return;
  if (el === '.' && firstValue.includes('.')) return;
  if (firstValue === '0' && el !== '.') {
    firstValue = el;
  } else {
    firstValue += el;
  }
  result.innerHTML = firstValue;
  checkFontSize();
}

function getSecondValue(el) {
  if (el === '0' && secondValue === '0') return;
  if (firstValue != '' && sign != '') {
    result.innerHTML = '';
    if (el === '.' && secondValue.includes('.')) return;
    secondValue += el;
    result.innerHTML = secondValue;
    checkFontSize();
  }
}

// Дізнаємося який знак
function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener('click', e => {
      if (isFirstValue && secondValue !== '') {
        calculateResult();
      }
      sign = e.target.getAttribute('value');
      isFirstValue = true;
    });
  }
}
getSign();

equals.addEventListener('click', calculateResult);

function calculateResult() {
  result.innerHTML = '';
  if (sign === '+') {
    resultValue = parseFloat(firstValue) + parseFloat(secondValue);
  } else if (sign === '-') {
    resultValue = parseFloat(firstValue) - parseFloat(secondValue);
  } else if (sign === 'x') {
    resultValue = parseFloat(firstValue) * parseFloat(secondValue);
  } else if (sign === '/') {
    if (parseFloat(secondValue) === 0 || parseFloat(firstValue) === 0) {
      result.innerHTML = `<p class="massage">На 0 ділити не можна!</p>`;
      return;
    }
    resultValue = parseFloat(firstValue) / parseFloat(secondValue);
  }
  result.innerHTML = resultValue;
  firstValue = resultValue.toString();
  secondValue = '';
  checkResultLength();
  checkFontSize();
}

function checkResultLength() {
  resultValue = parseFloat(resultValue.toFixed(5));
  result.innerHTML = resultValue;
}

negative.addEventListener('click', changeSign);

function changeSign() {
  result.innerHTML = '';
  if (firstValue !== '') {
    resultValue = -parseFloat(firstValue);
    firstValue = resultValue.toString();
  }
  if (firstValue !== '' && secondValue !== '' && sign !== '') {
    resultValue = -resultValue;
  }
  result.innerHTML = resultValue;
}

percent.addEventListener('click', percentCalc);

function percentCalc() {
  result.innerHTML = '';
  if (firstValue !== '') {
    resultValue = parseFloat(firstValue) / 100;
    firstValue = resultValue.toString();
  }
  if (firstValue !== '' && secondValue !== '' && sign !== '') {
    resultValue = resultValue / 100;
  }
  result.innerHTML = resultValue;
}

clear.addEventListener('click', cleaner);

function cleaner() {
  result.innerHTML = 0;
  firstValue = '';
  isFirstValue = false;
  secondValue = '';
  isSecondValue = false;
  sign = '';
  resultValue = 0;
  result.style.fontSize = '4em';
}

dots.addEventListener('click', e => {
  let dotValue = e.target.getAttribute('value');
  if (!isFirstValue) {
    firstValue += firstValue === '' ? '0' : '';
    if (!firstValue.includes('.')) {
      firstValue += dotValue;
      result.innerHTML = firstValue;
    }
  }
  if (isFirstValue && !isSecondValue) {
    secondValue += secondValue === '' ? '0' : '';
    if (!secondValue.includes('.')) {
      secondValue += dotValue;
      result.innerHTML = secondValue;
    }
  }
});

function checkFontSize() {
  if (result.innerHTML.length > 30) {
    result.innerHTML = `<p class="massage lol">---- ⊙_⊙ ----</p>`;
  } else if (result.innerHTML.length > 14) {
    result.style.fontSize = '1em';
  } else if (result.innerHTML.length > 11) {
    result.style.fontSize = '2em';
  } else if (result.innerHTML.length > 8) {
    result.style.fontSize = '3em';
  } else {
    result.style.fontSize = '4em';
  }
}
