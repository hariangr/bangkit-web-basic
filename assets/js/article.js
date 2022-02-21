let contents = [];

const KEY_CONTENTS = "some_amazing_local_content";
let selected_amazeness = 3;
const RADNESS = [
  { emoji: 0x1f615, desc: "It was bad" },
  { emoji: 0x1f615, desc: "meh" },
  { emoji: 0x1f642, desc: "It was okay" },
  { emoji: 0x1f600, desc: "Something good happened!" },
  { emoji: 0x1f923, desc: "IT WAS RAD!!!!!!" },
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

window.addEventListener("DOMContentLoaded", (event) => {
  const gritudeTemplate = document.querySelector("#gritude-template");
  const wigfContainer = document.querySelector("#wigf-container");

  // Load content from LocalStorage, append to contents
  const updateContentsView = () => {
    // Clear contents first
    document.querySelectorAll(".template-added").forEach((it) => {
      console.log(it);
      it.parentNode.removeChild(it);
    });

    for (const it of contents.sort((a, b) => b.timestamp - a.timestamp)) {
      const newNode = gritudeTemplate.cloneNode(true);
      newNode.style.display = "block";
      newNode.querySelector("#radness-desc").innerText =
        RADNESS[it.amazingness - 1].desc;
      newNode.querySelector("#emojitude").innerText = String.fromCodePoint(
        RADNESS[it.amazingness - 1].emoji
      );
      newNode.querySelector("#bq-prof").innerText = it.content;
      newNode.querySelector("#gritude-date").innerText =
        MONTHS[it.timestamp.getMonth()] +
        " " +
        it.timestamp.getDate() +
        ", " +
        it.timestamp.getFullYear() +
        " " +
        String(it.timestamp.getHours()).padStart(2, '0') +
        ":" +
        String(it.timestamp.getMinutes()).padStart(2, '0')
      newNode.classList.add("template-added");
      wigfContainer.appendChild(newNode);
    }
  };

  // Loader contents
  try {
    if (localStorage) {
      contents = JSON.parse(localStorage.getItem(KEY_CONTENTS));
      contents = contents.map((it) => {
        it.timestamp = new Date(it.timestamp);
        return it;
      });
    }
    if (contents.length == 0) {
      contents = articles_placeholder;
    }
  } catch (error) {
    contents = articles_placeholder;
  }
  updateContentsView();

  const dropdownMenu = document.getElementById("dropdown");
  const dropdownBtn = document.getElementById("account-avatar");
  const wigfInput = document.getElementById("wigf-in");

  dropdownBtn.addEventListener("click", (e) => {
    if (dropdownMenu.style.display === "flex") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "flex";
    }
  });

  document.getElementById("logout-btn").addEventListener("click", (e) => {
    if (localStorage) {
      localStorage.removeItem(KEY_CONTENTS);
    }
    alert("Your journal have been erased");
    location.reload();
  });

  document.getElementById("submit-btn").addEventListener("click", (e) => {
    contents.push({
      amazingness: selected_amazeness,
      timestamp: new Date(),
      content: wigfInput.value,
    });

    if (localStorage) {
      // Let's not get into performance things shall we
      localStorage.setItem(KEY_CONTENTS, JSON.stringify(contents));
    }

    // console.log(contents);
    updateContentsView();
  });

  document.querySelectorAll(".emoji").forEach((it) => {
    it.addEventListener("click", (e) => {
      const amazeness = e.target.getAttribute("data-amaze");
      document
        .querySelectorAll(".emoji")
        .forEach((it) => it.classList.remove("selected-moji"));
      selected_amazeness = amazeness;
      document
        .querySelector(`span[data-amaze="${amazeness}"]`)
        .classList.add("selected-moji");
    });
  });
});
