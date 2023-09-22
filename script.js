const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");

//--counter component

const inputHandler = () => {
  const maxNumChars = 150;
  const numChars = textareaEl.value.length;
  counterEl.textContent = maxNumChars - numChars;
};

textareaEl.addEventListener("input", inputHandler);

//--submit event
const submitHandler = (e) => {
  e.preventDefault();
  const text = textareaEl.value;
  if (text.includes("#") && text.length > 4) {
    formEl.classList.add("form--valid");
    setTimeout(() => {
      formEl.classList.remove("form--valid");
    }, 2000);
  } else {
    formEl.classList.add("form--invalid");
    setTimeout(() => {
      formEl.classList.remove("form--invalid");
    }, 2000);
    textareaEl.focus();
    return;
  }
  const companyName = text
    .split(" ")
    .find((word) => word.includes("#"))
    .substring(1);
  const badgeLetter = companyName.substring(0, 1).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;
  const feedBackItemHtml = `
  <li class="feedback">
  <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${upvoteCount}</span>
  </button>
  <section class="feedback__badge">
      <p class="feedback__letter">${badgeLetter}</p>
  </section>
  <div class="feedback__content">
      <p class="feedback__company">${companyName}</p>
      <p class="feedback__text">${text}</p>
  </div>
  <p class="feedback__date">${daysAgo === 0 ? "new" : `${daysAgo}d`}</p>
</li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedBackItemHtml);

  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = "150";
};

formEl.addEventListener("submit", submitHandler);
