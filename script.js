const MAX_CHARS = 150;
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

//--counter component

const inputHandler = () => {
  const numChars = textareaEl.value.length;
  counterEl.textContent = MAX_CHARS - numChars;
};

textareaEl.addEventListener("input", inputHandler);

//--Form Component

const showVisualIndicator = (textCheck) => {
  const className = textCheck === "valid" ? "form--valid" : "form--invalid";
  formEl.classList.add(className);
  setTimeout(() => {
    formEl.classList.remove(className);
  }, 2000);
};

const submitHandler = (e) => {
  e.preventDefault();
  const text = textareaEl.value;
  if (text.includes("#") && text.length > 4) {
    showVisualIndicator("valid");
  } else {
    showVisualIndicator("invalid");
    textareaEl.focus();
    return;
  }

  const company = text
    .split(" ")
    .find((word) => word.includes("#"))
    .substring(1);
  const badgeLetter = company.substring(0, 1).toUpperCase();
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
      <p class="feedback__company">${company}</p>
      <p class="feedback__text">${text}</p>
  </div>
  <p class="feedback__date">${daysAgo === 0 ? "new" : `${daysAgo}d`}</p>
</li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedBackItemHtml);
  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);

//-- FEEDBACK LIST COMPONENT

fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then((res) => res.json())
  .then((data) => {
    spinnerEl.remove();
    data.feedbacks.forEach((feedback) => {
      const feedBackItemHtml = `
        <li class="feedback">
        <button class="upvote">
            <i class="fa-solid fa-caret-up upvote__icon"></i>
            <span class="upvote__count">${feedback.upvoteCount}</span>
        </button>
        <section class="feedback__badge">
            <p class="feedback__letter">${feedback.badgeLetter}</p>
        </section>
        <div class="feedback__content">
            <p class="feedback__company">${feedback.company}</p>
            <p class="feedback__text">${feedback.text}</p>
        </div>
        <p class="feedback__date">${
          feedback.daysAgo === 0 ? "new" : `${feedback.daysAgo}d`
        }</p>
      </li>
        `;
      feedbackListEl.insertAdjacentHTML("beforeend", feedBackItemHtml);
    });
  })
  .catch((error) => {
    feedbackListEl.textContent = `Failed to fetch feedback items: ${error.message}`;
  });
