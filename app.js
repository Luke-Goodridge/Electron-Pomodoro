const Push = require("push.js");

const pauseBtn = document.querySelector("#pause");
pauseBtn.innerHTML = "Play";
const resetBtn = document.querySelector("#reset");
let isPaused = false;

const notify = () => {
  Push.create("Hello", {
    body: "Hows it going?",
    timeout: 3000,
    onClick: () => {
      window.focus();
      this.close();
    },
  });
};

pauseBtn.addEventListener("click", () => {
    if(isPaused) {
        console.log("Play");
        pauseBtn.innerHTML = "Play";
    }
    else {
        console.log("Pause");
        pauseBtn.innerHTML = "Pause";
    }
    isPaused = !isPaused;
})
resetBtn.addEventListener("click", () => console.log("Reset"));
