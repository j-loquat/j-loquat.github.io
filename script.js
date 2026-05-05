const compassData = {
  control: {
    title: "Control",
    question: "What am I trying to control that I do not actually control?",
    meaning: "Release the imaginary levers. Save your energy for the choices that are really yours.",
    when: "You are tense, looping, bracing, arguing with reality, or trying to force an outcome.",
    practice: "Name one thing outside your control. Then name one next action that is inside your control."
  },
  current: {
    title: "Current",
    question: "How can I cooperate with the current instead of fight it?",
    meaning: "Look for where life already has motion. Let reality show you the easier path.",
    when: "Everything feels stuck, overworked, delayed, or harder than it should be.",
    practice: "Ask what is already moving. Follow the open door for one small step."
  },
  teaching: {
    title: "Teaching",
    question: "What is life trying to teach me today?",
    meaning: "Every friction point can become information. Curiosity turns a bad moment into usable wisdom.",
    when: "You feel annoyed, embarrassed, disappointed, impatient, or caught in a familiar pattern.",
    practice: "Finish this sentence: \"This may be training me in...\""
  },
  belonging: {
    title: "Belonging",
    question: "How can I contribute here, as part of the whole?",
    meaning: "You are not separate from the scene. You are one of the ways life responds to itself.",
    when: "You feel isolated, self-absorbed, defensive, or unsure how to matter.",
    practice: "Offer one useful thing: attention, honesty, patience, help, repair, or encouragement."
  }
};

const points = document.querySelectorAll(".compass-point");
const activeKicker = document.querySelector("#active-kicker");
const activeQuestion = document.querySelector("#active-question");
const activeMeaning = document.querySelector("#active-meaning");
const activeWhen = document.querySelector("#active-when");
const activePractice = document.querySelector("#active-practice");
const printButton = document.querySelector("#print-button");

function setCompass(key) {
  const item = compassData[key];
  if (!item) return;

  points.forEach((point) => {
    point.classList.toggle("is-active", point.dataset.compass === key);
  });

  activeKicker.textContent = item.title;
  activeQuestion.textContent = item.question;
  activeMeaning.textContent = item.meaning;
  activeWhen.textContent = item.when;
  activePractice.textContent = item.practice;
}

points.forEach((point) => {
  point.addEventListener("click", () => setCompass(point.dataset.compass));
});

printButton?.addEventListener("click", () => {
  window.print();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
