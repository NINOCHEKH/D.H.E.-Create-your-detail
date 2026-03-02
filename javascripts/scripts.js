const gridGroup = document.getElementById("grid-group");
const lightGroup = document.getElementById("light-group");

const d1 = "M 130 0 L 130 30 L 150 57 L 305 57 L 305 135 ";
const d2 = "M 659.1 0 L 659.1 31 L 638 57 L 485 57 L 485 135 ";
const d3 = "M 223 0 L 223 31 L 350 31 L 395 57 L 394 140 ";
const d4 = "M 566 0 L 566 31 L 440 31 L 395 57 L 394 140 ";
const d5 = "M 172 57 L 172 92 L 238 92 L 275 113 L 275 147 ";
const d6 = "M 617 57 L 617 92 L 550 92 L 515 113 L 515 147 ";
const d7 = "M 940 195 L 676 195 L 654 209 L 580 210";
const d8 = "M -940 195 L 98 195 L 117 177 L 225 177 ";
const d9 = "M -1300 195 L 126 195 L 146 209 L 224 209 ";

function createTwoTechLines() {
  gridGroup.innerHTML = "";
  lightGroup.innerHTML = "";

  [d1, d2, d3, d4, d5, d6, d7, d8, d9].forEach((d, index) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.classList.add("base-grid");
    path.dataset.index = index;
    gridGroup.appendChild(path);

    const light = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    light.setAttribute("d", d);
    light.classList.add("light-streak");
    light.dataset.index = index;
    lightGroup.appendChild(light);

    path.addEventListener("mouseenter", function (e) {
      pauseLineAnimation(index);
    });

    path.addEventListener("mouseleave", function (e) {
      resumeLineAnimation(index);
    });

    light.addEventListener("mouseenter", function (e) {
      pauseLineAnimation(index);
    });

    light.addEventListener("mouseleave", function (e) {
      resumeLineAnimation(index);
    });
  });
}

function pauseLineAnimation(index) {
  const lightLines = document.querySelectorAll(".light-streak");
  const targetLine = lightLines[index];

  if (!targetLine) return;

  if (!targetLine.dataset.originalAnimation) {
    targetLine.dataset.originalAnimation = targetLine.style.animation || "";
    targetLine.dataset.originalOpacity = targetLine.style.opacity || "";
  }

  targetLine.classList.add("paused");
  targetLine.style.animation = "none";
  targetLine.style.opacity = "0.1";

  console.log(`Линия ${index + 1} остановлена при наведении`);
}

function resumeLineAnimation(index) {
  const lightLines = document.querySelectorAll(".light-streak");
  const targetLine = lightLines[index];

  if (!targetLine) return;

  targetLine.classList.remove("paused");
  targetLine.style.animation = targetLine.dataset.originalAnimation || "";
  targetLine.style.opacity = targetLine.dataset.originalOpacity || "";

  console.log(`Линия ${index + 1} возобновлена`);
}

function launchPulse() {
  const streaks = document.querySelectorAll(".light-streak");
  if (streaks.length === 0) return;

  streaks.forEach((target, index) => {
    if (target.classList.contains("paused")) return;
    if (target.classList.contains("animating")) return;

    const len = target.getTotalLength();
    const pulseLength = len * 0.3;

    target.style.strokeDasharray = `${pulseLength} ${len}`;
    target.style.strokeDashoffset = "0";
    target.style.animationDuration = `7s`;

    target.classList.add("animating");
    target.onanimationend = () => target.classList.remove("animating");
  });
}

createTwoTechLines();

setInterval(() => {
  launchPulse();
}, 200);
