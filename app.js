let field = document.getElementById('field');
let memoryValue = document.getElementById('memory');
let calculatorModel = document.getElementById('calculatorModel');
const arr = ['+', '-', '.', '%', '*', '/', '**', '('];


function insertForNum(num) {
  field.value += num;
}
function insert(sign) {
  let newArr = field.value.split('');
  if (!arr.includes(newArr[newArr.length - 1]) && newArr.length) {
    field.value += sign;
  }
}
function clean() {
  field.value = '';
}
function cleanOne() {
  let newArr = field.value.split('');
  newArr.pop();
  field.value = newArr.join('');
}
function insertForDot(dot) {
  let newArr = field.value.split('');
  if (newArr.length && !newArr.includes('.')) field.value += dot;
}
function insertForDoubleSign(minus) {
  let newArr = field.value.split('')
  if (newArr[0] !== '-') {
    field.value = `-${field.value}`;
  } else { field.value = newArr.slice(1).join('') }
}
function equal() {
  let answer = eval(field.value);
  let newArr = String(answer).split('');
  if (newArr.length > 14) newArr.length = 14;
  if (newArr.indexOf('.') != -1) {
    let repeat = newArr.slice(newArr.indexOf('.') + 1);
    let main = newArr.slice(0, newArr.indexOf('.') + 1);
    if (repeat.length > 6) {
      let set = new Set(repeat);
      if (set.size == 1) {
        field.value = `${main.join('')}(${Array.from(set)})`;
      } else { field.value = newArr.join(''); }
    } else { field.value = newArr.join(''); }
  } else { field.value = newArr.join(''); }
}

const memory = {
  size: 0,

  plus() {
    if (field.value) {
      this.size += eval(field.value);
    }
    memoryValue.textContent = this.size;
  },

  minus() {
    if (field.value) {
      this.size -= eval(field.value);
    }
    memoryValue.textContent = this.size;
  },

  show() {
    field.value = this.size;
    memoryValue.textContent = this.size;
  },

  clear() {
    this.size = 0;
    memoryValue.textContent = this.size;
  }

}

function changeMemory(par) {
  switch (par) {
    case 'M+':
      memory.plus();
      break;
    case 'M-':
      memory.minus();
      break;
    case 'MR':
      memory.show();
      break;
    case 'MC':
      memory.clear();
      break;
  }
}