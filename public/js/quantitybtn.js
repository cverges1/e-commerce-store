let baseValue = 1;

function add() {
  baseValue += 1;
  document.querySelector('.quantity-value').textContent = baseValue;
}

function subtract() {
  if (baseValue > 1) {
    baseValue -= 1;
    document.querySelector('.quantity-value').textContent = baseValue;
  }
}

document.querySelector('#add-btn').addEventListener('click', add);
document.querySelector('#subtract-btn').addEventListener('click', subtract);