const display = document.getElementById("display");
const copyBtn = document.getElementById("copy-btn");
const themeBtn = document.getElementById("theme-btn");

function appendValue(value) {
  if (display.innerText === "0" || display.innerText === "Error") display.innerText = "";
  display.innerText += value;
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  if (display.innerText !== "Error") {
    display.innerText = display.innerText.slice(0, -1);
    if (display.innerText === "") display.innerText = "0";
  }
}

function autoCloseParentheses(expression) {
  let open = (expression.match(/\(/g) || []).length;
  let close = (expression.match(/\)/g) || []).length;
  return expression + ')'.repeat(open - close);
}

function calculate() {
  try {
    let expression = autoCloseParentheses(display.innerText);
    const result = eval(expression);
    display.innerText = result;
  } catch (error) {
    display.innerText = "Error";
  }
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(display.innerText).then(() => {
    copyBtn.innerText = "✅ Copied!";
    setTimeout(() => {
      copyBtn.innerText = "📋 Copy";
    }, 1500);
  }).catch(err => {
    copyBtn.innerText = "❌ Error";
  });
});

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    themeBtn.innerText = "🌞 Light Mode";
  } else {
    themeBtn.innerText = "🌙 Dark Mode";
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if ("0123456789+-*/().".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
