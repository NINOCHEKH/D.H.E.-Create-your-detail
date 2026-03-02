const gridGroup = document.getElementById("grid-group");
const lightGroup = document.getElementById("light-group");

const d1 = "M 130 0 L 130 30 L 150 57 L 305 57 L 305 135 ";
const d2 = "M 659.1 0 L 659.1 31 L 638 57 L 485 57 L 485 135 ";
const d3 = "M 223 0 L 223 31 L 350 31 L 395 57 L 394 140 ";
const d4 = "M 566 0 L 566 31 L 440 31 L 395 57 L 394 140 ";
const d5 = "M 172 57 L 172 92 L 238 92 L 275 113 L 275 147 ";
const d6 = "M 617 57 L 617 92 L 550 92 L 515 113 L 515 147 ";
const d7 = "M 940 195 L 676 195 L 654 209 L 580 210 ";
const d8 = "M -940 195 L 85 195 L 102 177 L 225 177 ";
const d9 = "M -600 195 L 85 195 L 102 177 L 225 177 ";

function createTwoTechLines() {
  gridGroup.innerHTML = "";
  lightGroup.innerHTML = "";

  console.log("Линия 1):", d1);
  console.log("Линия 2):", d2);
  console.log("Линия 3):", d3);
  console.log("Линия 4):", d4);
  console.log("Линия 5):", d5);
  console.log("Линия 6):", d6);
  console.log("Линия 7):", d7);
  console.log("Линия 8):", d8);

  [d1, d2, d3, d4, d5, d6, d7, d8].forEach((d) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    gridGroup.appendChild(path);

    const light = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    light.setAttribute("d", d);
    light.classList.add("light-streak");
    lightGroup.appendChild(light);
  });
}

function createTechLinePath(startX, startY, dirX, dirY, firstVertical) {
  let d = `M ${startX} ${startY}`;

  let cx = startX;
  let cy = startY;

  const firstLeg = 25;

  if (firstVertical) {
    cy += firstLeg * dirY;
  } else {
    cx += firstLeg * dirX;
  }
  d += ` L ${cx} ${cy}`;

  const segments = 8;

  for (let i = 0; i < segments; i++) {
    if (i % 2 === 0) {
      cx += 100 * dirX;

      cy += 15 * dirY;
    } else {
      cy += 180 * dirY;

      cx += 15 * dirX;
    }
    d += ` L ${cx} ${cy}`;
  }

  cx += 1000 * dirX;
  cy += 90 * dirY;
  d += ` L ${cx} ${cy}`;

  return d;
}

function launchPulse() {
  const streaks = document.querySelectorAll(".light-streak");
  if (streaks.length === 0) return;

  streaks.forEach((target, index) => {
    if (target.classList.contains("animating")) return;

    const len = target.getTotalLength();

    const pulseLength = index === 2 ? len * 0.2 : len * 0.6;

    target.style.strokeDasharray = `${pulseLength} ${len}`;
    target.style.strokeDashoffset = "0";

    const duration = index === 0 ? 5 : 5;
    target.style.animationDuration = `${duration}s`;

    target.classList.add("animating");
    target.onanimationend = () => target.classList.remove("animating");
  });
}

createTwoTechLines();

setInterval(() => {
  launchPulse();
}, 100);
