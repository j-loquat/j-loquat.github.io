const compassData = {
  control: {
    title: "Control",
    question: "Where am I forcing the uncontrollable?",
    note: "Name what you cannot command, then spend energy only where a real choice exists."
  },
  current: {
    title: "Current",
    question: "How can I move with events?",
    note: "Look for momentum that is already present and cooperate with it."
  },
  teaching: {
    title: "Teaching",
    question: "What is life showing me today?",
    note: "Treat friction as training data so daily events become practical wisdom."
  },
  belonging: {
    title: "Belonging",
    question: "How can I serve the whole?",
    note: "Shift from self-obsession toward contribution in the current moment."
  }
};

const nodes = Array.from(document.querySelectorAll(".compass-node"));
const titleEl = document.getElementById("focus-title");
const questionEl = document.getElementById("focus-question");
const noteEl = document.getElementById("focus-note");

function setFocus(key) {
  const data = compassData[key];
  if (!data) {
    return;
  }

  titleEl.textContent = data.title;
  questionEl.textContent = data.question;
  noteEl.textContent = data.note;

  nodes.forEach((node) => {
    node.classList.toggle("is-active", node.dataset.key === key);
  });
}

nodes.forEach((node) => {
  node.addEventListener("click", () => setFocus(node.dataset.key));
});

const revealTargets = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const printBtn = document.getElementById("print-card");
if (printBtn) {
  printBtn.addEventListener("click", () => {
    window.print();
  });
}

const copyBtn = document.getElementById("copy-prompt");
const copyStatus = document.getElementById("copy-status");
const promptEl = document.getElementById("journal-prompt");

if (copyBtn && copyStatus && promptEl) {
  copyBtn.addEventListener("click", async () => {
    const text = promptEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      copyStatus.textContent = "Journal prompt copied.";
    } catch (error) {
      copyStatus.textContent = "Copy failed. Select and copy manually.";
    }

    setTimeout(() => {
      copyStatus.textContent = "";
    }, 2200);
  });
}
