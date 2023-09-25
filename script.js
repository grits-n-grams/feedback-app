//--Global Variables
const MAX_CHARS = 150;
const BASE_API_URL = "https://bytegrad.com/course-assets/js/1/api";
const textareaEl = document.querySelector(".form__textarea");
const counterEl = document.querySelector(".counter");
const formEl = document.querySelector(".form");
const feedbackListEl = document.querySelector(".feedbacks");
const submitBtnEl = document.querySelector(".submit-btn");
const spinnerEl = document.querySelector(".spinner");

const renderFeedbackItem = (feedbackItem) => {
  const feedBackItemHtml = `
  <li class="feedback">
  <button class="upvote">
      <i class="fa-solid fa-caret-up upvote__icon"></i>
      <span class="upvote__count">${feedbackItem.upvoteCount}</span>
  </button>
  <section class="feedback__badge">
      <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
  </section>
  <div class="feedback__content">
      <p class="feedback__company">${feedbackItem.company}</p>
      <p class="feedback__text">${feedbackItem.text}</p>
  </div>
  <p class="feedback__date">${
    feedbackItem.daysAgo === 0 ? "new" : `${feedbackItem.daysAgo}d`
  }</p>
</li>
  `;

  feedbackListEl.insertAdjacentHTML("beforeend", feedBackItemHtml);
};

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

  const feedbackItem = {
    upvoteCount,
    badgeLetter,
    daysAgo,
    company,
    text,
  };

  renderFeedbackItem(feedbackItem);

  //--POST Request
  fetch(`${BASE_API_URL}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(feedbackItem),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        console.log("something went wrong");
        return;
      }
      console.log("success");
    })
    .catch((error) => {
      console.log(error);
    });

  textareaEl.value = "";
  submitBtnEl.blur();
  counterEl.textContent = MAX_CHARS;
};

formEl.addEventListener("submit", submitHandler);

//--Feedback List
const clickHandler = (e) => {
  const clickdEl = e.target;
  console.log(clickdEl);
  const upvoteIntention = clickdEl.className.includes("upvote");

  if (upvoteIntention) {
    const upvoteBtnEl = clickdEl.closest(".upvote");
    upvoteBtnEl.disabled = true;
    const upvoteCountEl = upvoteBtnEl.querySelector(".upvote__count");
    let upvoteCount = +upvoteCountEl.textContent;
    upvoteCountEl.textContent = ++upvoteCount;
  } else {
    clickdEl.closest(".feedback").classList.toggle("feedback--expand");
  }
};
feedbackListEl.addEventListener("click", clickHandler);
//-- GET Request

fetch(`${BASE_API_URL}/feedbacks`)
  .then((res) => res.json())
  .then((data) => {
    spinnerEl.remove();
    data.feedbacks.forEach((feedback) => {
      renderFeedbackItem(feedback);
    });
  })
  .catch((error) => {
    feedbackListEl.textContent = `Failed to fetch feedback items: ${error.message}`;
  });
