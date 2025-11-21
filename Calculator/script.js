const display = document.getElementById("disp");
const btn = document.forms["form"].veql;

function calculate() {
  if (form.disp.value === '') {
    alert('Please enter number');
  } else {
    form.disp.value = eval(form.disp.value);
  }
}


const operators = ['+', '-', '*', '/', '.'];

function val(x) {
  const lastChar = display.value.slice(-1);
  if (x === "clr") {
    display.value = "";
  } else if (x === "back") {
    display.value = display.value.slice(0, -1);
  } else {
    if (operators.includes(x)) {
      if (operators.includes(lastChar) || display.value === "") {
        if (x === '-' && display.value === "") {
          display.value += x;
        }
        return;
      }
    }
    display.value += x;
  }
};
