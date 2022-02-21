let contents = [
  {
    amazingness: 5,
    timestamp: new Date(2022, 2, 21),
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit ex quia saepe explicabo dolore! Eaque maiores deleniti autem iure laboriosam aut possimus aperiam perferendis atque, corporis tenetur ea repellendus! Laudantium.",
  },
];

const KEY_CONTENTS = "some_amazing_local_content";
let selected_amazeness = 3;

window.addEventListener("DOMContentLoaded", (event) => {
  const gritudeTemplate = document.querySelector("#gritude-template");
  const wigfContainer = document.querySelector("#wigf-container");

  // Load content from LocalStorage, append to contents

  for (let i = 0; i < 10; i++) {
    wigfContainer.appendChild(gritudeTemplate.cloneNode(true));
  }

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
    alert("Your journal have been erased");
    if (localStorage) {
      localStorage.removeItem("KEY_CONTENTS");
    }
  });

  document.getElementById("submit-btn").addEventListener("click", (e) => {
    contents.push({
      amazingness: selected_amazeness,
      timestamp: Date.now(),
      content: wigfInput.value,
    });

    console.log(contents);
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
