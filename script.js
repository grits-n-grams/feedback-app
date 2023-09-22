const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");

const inputHandler = () => {
  const maxNumChars = 150;
  const numChars = textareaEl.value.length;
  counterEl.textContent = maxNumChars - numChars;
};

textareaEl.addEventListener("input", inputHandler);
