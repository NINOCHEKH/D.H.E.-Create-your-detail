const gridGroup = document.getElementById("grid-group");
const lightGroup = document.getElementById("light-group");

const d1 = "M 130 0 L 130 30 L 150 57 L 305 57 L 305 135 ";
const d2 = "M 659.1 0 L 659.1 31 L 638 57 L 485 57 L 485 135 ";
const d3 = "M 223 0 L 223 31 L 350 31 L 395 57 L 394 140 ";
const d4 = "M 566 0 L 566 31 L 440 31 L 395 57 L 394 140 ";
const d5 = "M 172 57 L 172 92 L 238 92 L 275 113 L 275 147 ";
const d6 = "M 617 57 L 617 92 L 550 92 L 515 113 L 515 147 ";
const d7 = "M 940 195 L 676 195 L 654 209 L 580 210";
const d8 = "M 0 195 L 98 195 L 117 177 L 225 177 ";
const d9 = "M 0 195 L 126 195 L 146 209 L 224 209 ";
const d10 = "M 701 195 L 684 178 L 565 178";
const d11 = "M 820 195 L 677 195 L 653 209 L 580 209";
const d12 = "M 643 209 L 628 226 L 560 226";
const d13 = "M 157 209 L 175 226 L 245 226";
const d14 =
  "M 0 335 L 24 335 L 45 345 L 175 345 L 175 345 L 246 310 L 355 310 L 355 278";
const d15 =
  "M 0 335 L 24 335 L 45 345 L 125 345 L 139 328 L 170 328 L 170 278 L 282 278 L 282 263 ";
const d16 =
  "M 800 335 L 765 335 L 745 345 L 615 345 L 543 310 L 435 310 L 435 278";
const d17 =
  "M 800 335 L 765 335 L 745 345 L 665 345 L 650 328 L 620 328 L 620 278 L 507 278 L 507 263";
const d18 = "M 800 260 L 726 260 L 726 476 L 800 548 ";
const d19 = "M 0 260 L 74 260 L 74 476 L 0 548 ";
const d20 = "M 0 921 L 100 921 L 153 921 L 251 921 ";
const d21 = "M 800 921 L 700 921 L 650 921 L 543 921 ";
const d22 = "M 0 847 L 33 847 L 33 1349 L 70 1370 L 70 1516 L 0 1516";
const d23 = "M 800 847 L 769 847 L 769 1349 L 732 1370 L 732 1516 L 800 1516";
const d24 = "M 0 1838 L 30 1838 L 58 1866 L 58 2280 L 30 2310 L 30 2550";
const d25 = "M 0 1950 L 105 1950 L 138 1963 L 665 1963 L 688 1979 L 800 1979";
const d26 = "M 800 2135 L 780 2135 L 750 2165 L 750 2550 ";

function createTwoTechLines() {
  gridGroup.innerHTML = "";
  lightGroup.innerHTML = "";

  [
    d1,
    d2,
    d3,
    d4,
    d5,
    d6,
    d7,
    d8,
    d9,
    d10,
    d11,
    d12,
    d13,
    d14,
    d15,
    d16,
    d17,
    d18,
    d19,
    d20,
    d21,
    d22,
    d23,
    d24,
    d25,
    d26
  ].forEach((d, index) => {
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

    path.addEventListener("mouseenter", function () {
      pauseLineAnimation(index);
    });

    path.addEventListener("mouseleave", function () {
      resumeLineAnimation(index);
    });

    light.addEventListener("mouseenter", function () {
      pauseLineAnimation(index);
    });

    light.addEventListener("mouseleave", function () {
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

  console.log(`Линия ${index + 1}`);
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

  streaks.forEach((target) => {
    if (target.classList.contains("paused")) return;
    if (target.classList.contains("animating")) return;

    const len = target.getTotalLength();
    const pulseLength = len * 0.9;

    target.style.strokeDasharray = `${pulseLength} ${len}`;
    target.style.strokeDashoffset = "0";
    target.style.animationDuration = `9s`;

    target.classList.add("animating");
    target.onanimationend = () => target.classList.remove("animating");
  });
}

createTwoTechLines();

setInterval(() => {
  launchPulse();
}, 200);

function updateConnectionText() {
  const connectionElement = document.querySelector(".CONNECTION");
  const progressDiv2 = document.querySelector(".progressDiv2");

  if (!connectionElement || !progressDiv2) return;

  const currentWidth = parseFloat(progressDiv2.style.width) || 0;
  const maxWidthVw = 72;
  const isMaxProgress = currentWidth >= maxWidthVw - 0.5;

  if (isMaxProgress) {
    if (connectionElement.textContent !== "CONNECTION: DONE!") {
      connectionElement.textContent = "CONNECTION: DONE!";
      connectionElement.classList.add("done");
      connectionElement.style.color = "#9d4edd";
      connectionElement.style.textShadow = "0 0 10px rgba(157, 78, 221, 0.5)";
      connectionElement.style.animation = "pulse 0.5s ease-in-out";
      setTimeout(() => {
        connectionElement.style.animation = "";
      }, 500);
    }
  } else {
    if (connectionElement.textContent !== "CONNECTION") {
      connectionElement.textContent = "CONNECTION";
      connectionElement.classList.remove("done");
      connectionElement.style.color = "#000000";
      connectionElement.style.textShadow = "none";
    }
  }
}

// прогресс бар
function updateProgressBar() {
  const progressDiv2 = document.querySelector(".progressDiv2");
  const statusElement = document.querySelector(".data2-4");

  if (!progressDiv2) return;

  const activeCirclesCount = document.querySelectorAll(
    ".circle-click1.active, .circle-click2.active, .circle-click3.active, .circle-click4.active, .circle-click5.active, .circle-click6.active, .circle-click7.active, .circle-click8.active, .circle-click9.active, .circle-click10.active, .circle-click11.active, .circle-click12.active"
  ).length;

  const status = statusElement ? statusElement.textContent : "";
  const circlesProgress = (activeCirclesCount / 12) * 100;
  const excellentBonus = status === "ОТЛИЧНОЕ" ? 100 : 0;
  let targetPercent = Math.min(circlesProgress + excellentBonus, 100);
  const maxWidthVw = 72;
  const newWidthVw = (targetPercent / 100) * maxWidthVw;

  progressDiv2.style.transition = "width 0.5s ease-out";
  progressDiv2.style.width = newWidthVw + "vw";

  if (targetPercent >= 100) {
    progressDiv2.style.backgroundColor = "#9d4edd";
    progressDiv2.style.boxShadow = "0 0 10px rgba(157, 78, 221, 0.5)";
  } else if (targetPercent >= 70) {
    progressDiv2.style.backgroundColor = "#bf8aff";
    progressDiv2.style.boxShadow = "none";
  } else if (targetPercent >= 40) {
    progressDiv2.style.backgroundColor = "#ff7edf";
    progressDiv2.style.boxShadow = "none";
  } else {
    progressDiv2.style.backgroundColor = "#292929";
    progressDiv2.style.boxShadow = "none";
  }

  updateConnectionText();
}

// состояние
function updateConnectionStatus() {
  const statusElement = document.querySelector(".data2-4");
  const progressDiv = document.querySelector(".progress");

  if (!statusElement) return;

  const emoWidth = window.currentEmoWidth || 230;
  const emoLength = window.currentEmoLength || 0;
  const neiroWidth = window.currentNeiroWidth || 230;
  const neiroLength = window.currentNeiroLength || 0;
  const emoWidthNorm = (emoWidth - 230) / (400 - 230);
  const emoLengthNorm = (emoLength + 100) / 200;
  const neiroWidthNorm = (neiroWidth - 230) / (400 - 230);
  const neiroLengthNorm = (neiroLength + 100) / 200;

  const totalRating =
    (emoWidthNorm + emoLengthNorm + neiroWidthNorm + neiroLengthNorm) / 4;

  let status = "";
  let statusClass = "";
  let statusColor = "";
  let progressColor = "";

  if (totalRating < 0.33) {
    status = "КАТАСТРОФИЧЕСКОЕ";
    statusClass = "status-catastrophic";
    statusColor = "#FE01DE";
    progressColor = "#292929";
  } else if (totalRating < 0.66) {
    status = "ПЛОХОЕ";
    statusClass = "status-bad";
    statusColor = "#FF7CEE";
    progressColor = "#656565";
  } else {
    status = "ОТЛИЧНОЕ";
    statusClass = "status-excellent";
    statusColor = "#FFFFFF";
    progressColor = "#949494";
  }

  statusElement.textContent = status;
  statusElement.className = `data2-4 ${statusClass}`;
  statusElement.style.color = statusColor;

  if (progressDiv) {
    progressDiv.style.backgroundColor = progressColor;
    progressDiv.style.transition = "background-color 0.3s ease";
  }

  updateProgressBar();

  return { status, totalRating, statusColor, progressColor };
}

// слайдеры
function initSlider1() {
  console.log("🔍 Поиск элементов слайдера 1...");

  const slider1 = document.querySelector(".slider");
  if (!slider1) {
    return;
  }

  const nextBtn = slider1.querySelector(".slider__next");
  const prevBtn = slider1.querySelector(".slider__prev");
  const sliderList = slider1.querySelector(".slider__list");
  const slides = slider1.querySelectorAll(".slider__element");

  if (!nextBtn || !prevBtn || !sliderList || slides.length === 0) {
    return;
  }

  let currentSlide = 0;

  function updateSlider() {
    sliderList.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  const newNextBtn = nextBtn.cloneNode(true);
  const newPrevBtn = prevBtn.cloneNode(true);
  nextBtn.replaceWith(newNextBtn);
  prevBtn.replaceWith(newPrevBtn);
  const finalNextBtn = slider1.querySelector(".slider__next");
  const finalPrevBtn = slider1.querySelector(".slider__prev");

  finalNextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

  finalPrevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });

  updateSlider();
}

function initSlider2() {
  const slider2 = document.querySelector(".slider2");
  if (!slider2) {
    return;
  }

  const nextBtn2 = slider2.querySelector(".slider__next2");
  const prevBtn2 = slider2.querySelector(".slider__prev2");
  const sliderList2 = slider2.querySelector(".slider__list2");
  const slides2 = slider2.querySelectorAll(".slider__element2");

  if (!nextBtn2 || !prevBtn2 || !sliderList2 || slides2.length === 0) {
    return;
  }

  let currentSlide2 = 0;

  function updateSlider2() {
    sliderList2.style.transform = `translateX(-${currentSlide2 * 100}%)`;
  }

  const newNextBtn2 = nextBtn2.cloneNode(true);
  const newPrevBtn2 = prevBtn2.cloneNode(true);
  nextBtn2.replaceWith(newNextBtn2);
  prevBtn2.replaceWith(newPrevBtn2);

  const finalNextBtn2 = slider2.querySelector(".slider__next2");
  const finalPrevBtn2 = slider2.querySelector(".slider__prev2");

  finalNextBtn2.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    currentSlide2 = (currentSlide2 + 1) % slides2.length;
    updateSlider2();
  });

  finalPrevBtn2.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    currentSlide2 = (currentSlide2 - 1 + slides2.length) % slides2.length;
    updateSlider2();
  });

  updateSlider2();
}

function initSlider3() {
  console.log("🔍 Поиск элементов слайдера 3...");

  const slider3 = document.querySelector(".slider3");
  if (!slider3) {
    return;
  }

  const nextBtn3 = slider3.querySelector(".slider__next3");
  const prevBtn3 = slider3.querySelector(".slider__prev3");
  const sliderList3 = slider3.querySelector(".slider__list3");
  const slides3 = slider3.querySelectorAll(".slider__element3");

  if (!nextBtn3 || !prevBtn3 || !sliderList3 || slides3.length === 0) {
    return;
  }

  let currentSlide3 = 0;

  function updateSlider3() {
    sliderList3.style.transform = `translateX(-${currentSlide3 * 100}%)`;
  }

  const newNextBtn3 = nextBtn3.cloneNode(true);
  const newPrevBtn3 = prevBtn3.cloneNode(true);
  nextBtn3.replaceWith(newNextBtn3);
  prevBtn3.replaceWith(newPrevBtn3);

  const finalNextBtn3 = slider3.querySelector(".slider__next3");
  const finalPrevBtn3 = slider3.querySelector(".slider__prev3");

  finalNextBtn3.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    currentSlide3 = (currentSlide3 + 1) % slides3.length;
    updateSlider3();
  });

  finalPrevBtn3.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    currentSlide3 = (currentSlide3 - 1 + slides3.length) % slides3.length;
    updateSlider3();
  });

  updateSlider3();
}

// картиночки в квадратах
function initAllSlidersToSquares() {
  console.log("🔍 Инициализация вставки картинок из слайдеров в квадраты...");

  const slider1Images = document.querySelectorAll(
    ".slider .slider__element img"
  );
  const square1 = document.querySelector(".square1");
  const arrow1 = document.querySelector(".arrow1");
  let currentSelectedImg1 = null;

  if (square1 && slider1Images.length > 0) {
    function resetHighlights1() {
      slider1Images.forEach((img) => {
        img.style.filter = "none";
        img.style.boxShadow = "none";
        img.style.opacity = "1";
      });
    }

    slider1Images.forEach((img, index) => {
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (window.deactivateSavedState) {
          window.deactivateSavedState();
        }

        resetHighlights1();

        this.style.filter = "drop-shadow(0 0 4px #9d4edd)";
        this.style.boxShadow = "0 0 0.2vw rgba(157, 78, 221, 0.02)";
        this.style.opacity = "1";

        currentSelectedImg1 = this;

        square1.innerHTML = "";

        const newImg = document.createElement("img");
        newImg.src = this.src;
        newImg.alt = `pic${index + 1}`;

        square1.appendChild(newImg);

        square1.style.boxShadow = "0 0 8px #9d4edd";
        setTimeout(() => {
          square1.style.boxShadow = "none";
        }, 250);

        if (arrow1) {
          arrow1.classList.add("hidden");
        }
      });
    });

    square1.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (window.deactivateSavedState) {
        window.deactivateSavedState();
      }

      if (this.children.length > 0) {
        this.innerHTML = "";

        if (currentSelectedImg1) {
          currentSelectedImg1.style.filter = "none";
          currentSelectedImg1.style.boxShadow = "none";
          currentSelectedImg1.style.opacity = "1";
          currentSelectedImg1 = null;
        }

        if (arrow1) {
          arrow1.classList.remove("hidden");
        }

        this.style.boxShadow = "0 0 8px #ffffffff";
        setTimeout(() => {
          this.style.boxShadow = "none";
        }, 250);
      } else {
      }
    });
  } else {
  }

  const slider2Images = document.querySelectorAll(
    ".slider2 .slider__element2 img"
  );
  const square2 = document.querySelector(".square2");
  const arrow2 = document.querySelector(".arrow2");
  let currentSelectedImg2 = null;

  if (square2 && slider2Images.length > 0) {
    function resetHighlights2() {
      slider2Images.forEach((img) => {
        img.style.filter = "none";
        img.style.boxShadow = "none";
        img.style.opacity = "1";
      });
    }

    slider2Images.forEach((img, index) => {
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (window.deactivateSavedState) {
          window.deactivateSavedState();
        }

        resetHighlights2();

        this.style.filter = "drop-shadow(0 0 4px #9d4edd)";
        this.style.boxShadow = "0 0 0.2vw rgba(157, 78, 221, 0.02)";
        this.style.opacity = "1";
        currentSelectedImg2 = this;

        square2.innerHTML = "";
        const newImg = document.createElement("img");
        newImg.src = this.src;
        square2.appendChild(newImg);

        square2.style.boxShadow = "0 0 8px #9d4edd";
        setTimeout(() => {
          square2.style.boxShadow = "none";
        }, 250);

        if (arrow2) {
          arrow2.classList.add("hidden");
        }
      });
    });

    square2.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (window.deactivateSavedState) {
        window.deactivateSavedState();
      }

      if (this.children.length > 0) {
        this.innerHTML = "";

        if (currentSelectedImg2) {
          currentSelectedImg2.style.filter = "none";
          currentSelectedImg2.style.boxShadow = "none";
          currentSelectedImg2.style.opacity = "1";
          currentSelectedImg2 = null;
        }

        if (arrow2) {
          arrow2.classList.remove("hidden");
        }

        this.style.boxShadow = "0 0 8px #ffffffff";
        setTimeout(() => {
          this.style.boxShadow = "none";
        }, 250);
      }
    });
  } else {
  }

  const slider3Images = document.querySelectorAll(
    ".slider3 .slider__element3 img"
  );
  const square3 = document.querySelector(".square3");
  const arrow3 = document.querySelector(".arrow3");
  let currentSelectedImg3 = null;

  if (square3 && slider3Images.length > 0) {
    function resetHighlights3() {
      slider3Images.forEach((img) => {
        img.style.filter = "none";
        img.style.boxShadow = "none";
        img.style.opacity = "1";
      });
    }

    slider3Images.forEach((img, index) => {
      img.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        if (window.deactivateSavedState) {
          window.deactivateSavedState();
        }

        resetHighlights3();

        this.style.filter = "drop-shadow(0 0 4px #9d4edd)";
        this.style.boxShadow = "0 0 0.2vw rgba(157, 78, 221, 0.02)";
        this.style.opacity = "1";
        currentSelectedImg3 = this;

        square3.innerHTML = "";
        const newImg = document.createElement("img");
        newImg.src = this.src;
        square3.appendChild(newImg);

        square3.style.boxShadow = "0 0 8px #9d4edd";
        setTimeout(() => {
          square3.style.boxShadow = "none";
        }, 250);

        if (arrow3) {
          arrow3.classList.add("hidden");
        }
      });
    });

    square3.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (window.deactivateSavedState) {
        window.deactivateSavedState();
      }

      if (this.children.length > 0) {
        this.innerHTML = "";

        if (currentSelectedImg3) {
          currentSelectedImg3.style.filter = "none";
          currentSelectedImg3.style.boxShadow = "none";
          currentSelectedImg3.style.opacity = "1";
          currentSelectedImg3 = null;
        }

        if (arrow3) {
          arrow3.classList.remove("hidden");
        }

        this.style.boxShadow = "0 0 8px #ffffffff";
        setTimeout(() => {
          this.style.boxShadow = "none";
        }, 250);
      }
    });
  } else {
  }
}

// сохранение
function initSaveButton() {
  const saveBtn = document.querySelector(".save-button");
  const square1 = document.querySelector(".square1");
  const square2 = document.querySelector(".square2");
  const square3 = document.querySelector(".square3");
  const overlay = document.getElementById("overlay");
  const confirmYes = document.getElementById("confirmYes");
  const confirmNo = document.getElementById("confirmNo");

  const circles = [
    document.querySelector(".circle1"),
    document.querySelector(".circle2"),
    document.querySelector(".circle3-1"),
    document.querySelector(".circle3-2"),
    document.querySelector(".circle3-3"),
    document.querySelector(".circle3-4"),
    document.querySelector(".circle3-5"),
    document.querySelector(".circle3-6")
  ];

  const arrows = [
    document.querySelector(".arrow1"),
    document.querySelector(".arrow2"),
    document.querySelector(".arrow3")
  ];

  let isSavedState = false;

  if (!saveBtn || !square1 || !square2 || !square3 || !overlay) {
    return;
  }

  function areAllSquaresFilled() {
    const hasSquare1 = square1.children.length > 0;
    const hasSquare2 = square2.children.length > 0;
    const hasSquare3 = square3.children.length > 0;
    return hasSquare1 && hasSquare2 && hasSquare3;
  }

  function activateSavedState() {
    circles.forEach((circle) => {
      if (circle) circle.classList.add("fast");
    });

    square1.classList.add("saved-state");
    square2.classList.add("saved-state");
    square3.classList.add("saved-state");

    arrows.forEach((arrow) => {
      if (arrow) arrow.classList.add("saved-state");
    });

    isSavedState = true;
  }

  function deactivateSavedState() {
    if (!isSavedState) return;

    circles.forEach((circle) => {
      if (circle) circle.classList.remove("fast");
    });

    square1.classList.remove("saved-state");
    square2.classList.remove("saved-state");
    square3.classList.remove("saved-state");

    arrows.forEach((arrow) => {
      if (arrow) arrow.classList.remove("saved-state");
    });

    isSavedState = false;
  }

  window.deactivateSavedState = deactivateSavedState;

  function updateButtonState() {
    if (areAllSquaresFilled()) {
      saveBtn.style.opacity = "1";
      saveBtn.style.cursor = "pointer";
      saveBtn.disabled = false;
    } else {
      saveBtn.style.opacity = "0.5";
      saveBtn.style.cursor = "not-allowed";
      saveBtn.disabled = true;

      if (isSavedState) deactivateSavedState();
    }
  }

  function showConfirmModal() {
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function hideConfirmModal() {
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  // сохранение комбинации деталей
  async function saveCombination() {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    function drawElement(element, x, y, width, height) {
      return new Promise((resolve) => {
        if (!element) {
          resolve();
          return;
        }

        let imgSrc = null;
        if (element.src) {
          imgSrc = element.src;
        } else if (element.tagName === "IMG") {
          imgSrc = element.src;
        } else if (element.querySelector && element.querySelector("img")) {
          imgSrc = element.querySelector("img").src;
        }

        if (!imgSrc) {
          resolve();
          return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imgSrc;

        img.onload = () => {
          ctx.drawImage(img, x, y, width, height);
          resolve();
        };

        img.onerror = () => {
          resolve();
        };

        setTimeout(resolve, 500);
      });
    }

    const square1Img = square1.querySelector("img");
    const square2Img = square2.querySelector("img");
    const square3Img = square3.querySelector("img");

    const circleImages = [
      document.querySelector(".circle1 img"),
      document.querySelector(".circle2 img"),
      document.querySelector(".circle3-1 img"),
      document.querySelector(".circle3-2 img"),
      document.querySelector(".circle3-3 img"),
      document.querySelector(".circle3-4 img"),
      document.querySelector(".circle3-5 img"),
      document.querySelector(".circle3-6 img")
    ];

    const square1Pos = { x: 400, y: 200, width: 150, height: 150 };
    const square2Pos = { x: 800, y: 450, width: 150, height: 150 };
    const square3Pos = { x: 600, y: 300, width: 150, height: 150 };

    const circlesPos = [
      { x: 200, y: 100, width: 120, height: 120 },
      { x: 1000, y: 150, width: 120, height: 120 },
      { x: 300, y: 500, width: 120, height: 120 },
      { x: 1100, y: 600, width: 120, height: 120 },
      { x: 500, y: 700, width: 120, height: 120 },
      { x: 900, y: 750, width: 120, height: 120 },
      { x: 150, y: 800, width: 120, height: 120 },
      { x: 1300, y: 400, width: 120, height: 120 }
    ];

    if (square1Img) {
      await drawElement(
        square1Img,
        square1Pos.x,
        square1Pos.y,
        square1Pos.width,
        square1Pos.height
      );
    }

    if (square2Img) {
      await drawElement(
        square2Img,
        square2Pos.x,
        square2Pos.y,
        square2Pos.width,
        square2Pos.height
      );
    }

    if (square3Img) {
      await drawElement(
        square3Img,
        square3Pos.x,
        square3Pos.y,
        square3Pos.width,
        square3Pos.height
      );
    }

    for (let i = 0; i < circleImages.length; i++) {
      if (circleImages[i]) {
        await drawElement(
          circleImages[i],
          circlesPos[i].x,
          circlesPos[i].y,
          circlesPos[i].width,
          circlesPos[i].height
        );
      }
    }

    ctx.fillStyle = "#9d4edd";
    ctx.font = 'bold 36px "TTLakesNeueEduRegular", monospace';
    ctx.fillText("D.H.E. COMBINATION", 50, 950);

    const date = new Date();
    ctx.font = '24px "TTLakesNeueEduRegular", monospace';
    ctx.fillStyle = "#ffffff";
    ctx.fillText(
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
      50,
      1000
    );

    const imageData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = `dhe-combination-${Date.now()}.png`;
    link.href = imageData;
    link.click();

    if (window.addToLibrary) {
      window.addToLibrary(imageData, square1Img, square2Img, square3Img);
    }

    activateSavedState();

    saveBtn.style.background = "radial-gradient(circle, #cea5ffff, #bf8aff)";
    setTimeout(() => {
      saveBtn.style.background = "radial-gradient(circle, #833ed7, #bf8aff)";
    }, 300);
  }

  saveBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (!areAllSquaresFilled()) {
      alert("Заполните все три квадрата!");
      return;
    }

    showConfirmModal();
  });

  confirmYes.addEventListener("click", async function () {
    await saveCombination();
    hideConfirmModal();
  });

  confirmNo.addEventListener("click", function () {
    hideConfirmModal();
  });

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      hideConfirmModal();
    }
  });

  const observer = new MutationObserver(function () {
    updateButtonState();
    if (isSavedState && !areAllSquaresFilled()) {
      deactivateSavedState();
    }
  });

  observer.observe(square1, { childList: true, subtree: true });
  observer.observe(square2, { childList: true, subtree: true });
  observer.observe(square3, { childList: true, subtree: true });

  updateButtonState();
}

// библиотека
function initLibrary() {
  console.log("🔍 Инициализация библиотеки сохранений...");

  const library = document.querySelector(".library");

  const oldContainer = document.querySelector(".saved-items-container");
  if (oldContainer) oldContainer.remove();

  const savedItemsContainer = document.createElement("div");
  savedItemsContainer.className = "saved-items-container";

  const savedItemsTrack = document.createElement("div");
  savedItemsTrack.className = "saved-items-track";

  savedItemsContainer.appendChild(savedItemsTrack);
  library.appendChild(savedItemsContainer);

  const sliderPrev = document.querySelector(".slider-L1");
  const sliderNext = document.querySelector(".slider-L2");

  let savedItems = [];
  let currentPage = 0;
  let totalPages = 0;
  const itemsPerPage = 3;

  const amountElement = document.querySelector(".amount");

  function updateLibraryDisplay() {
    savedItemsTrack.innerHTML = "";

    totalPages = Math.ceil(savedItems.length / itemsPerPage);

    for (let page = 0; page < totalPages; page++) {
      const pageDiv = document.createElement("div");
      pageDiv.className = "saved-item";

      const startIdx = page * itemsPerPage;
      const pageItems = savedItems.slice(startIdx, startIdx + itemsPerPage);

      let itemsHtml = '<div class="saved-item-content">';
      pageItems.forEach((item) => {
        itemsHtml += `
          <div class="saved-item-row">
            <img src="${item.imageData}" alt="saved">
            <div class="saved-item-row-info">
              <span class="saved-item-time">${item.time}</span>
              <span class="saved-item-name">${item.name}</span>
            </div>
          </div>
        `;
      });
      itemsHtml += "</div>";

      pageDiv.innerHTML = itemsHtml;
      savedItemsTrack.appendChild(pageDiv);
    }

    amountElement.textContent = `${totalPages}`;

    updateSliderButtons();

    if (currentPage >= totalPages && totalPages > 0) {
      currentPage = totalPages - 1;
    }
    savedItemsTrack.style.transform = `translateX(-${currentPage * 100}%)`;
  }

  function updateSliderButtons() {
    if (totalPages <= 1) {
      sliderPrev.classList.add("disabled");
      sliderPrev.classList.remove("active");
      sliderNext.classList.add("disabled");
      sliderNext.classList.remove("active");
    } else {
      sliderPrev.classList.remove("disabled");
      sliderNext.classList.remove("disabled");
      sliderPrev.classList.add("active");
      sliderNext.classList.add("active");

      if (currentPage <= 0) {
        sliderPrev.classList.add("disabled");
        sliderPrev.classList.remove("active");
      }
      if (currentPage >= totalPages - 1) {
        sliderNext.classList.add("disabled");
        sliderNext.classList.remove("active");
      }
    }
  }

  function addSavedItem(imageData, square1Img, square2Img, square3Img) {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 100, 100);

    function drawImageOnCanvas(img, x, y, w, h) {
      return new Promise((resolve) => {
        if (!img) {
          resolve();
          return;
        }
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = img.src;
        image.onload = () => {
          ctx.drawImage(image, x, y, w, h);
          resolve();
        };
        image.onerror = resolve;
      });
    }

    (async () => {
      if (square1Img) await drawImageOnCanvas(square1Img, 10, 10, 25, 25);
      if (square2Img) await drawImageOnCanvas(square2Img, 40, 35, 25, 25);
      if (square3Img) await drawImageOnCanvas(square3Img, 25, 60, 25, 25);

      const previewData = canvas.toDataURL("image/png");

      const now = new Date();
      const timeString = now.toLocaleTimeString();
      const fileName = `DHE-${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

      savedItems.push({
        imageData: previewData,
        time: timeString,
        name: fileName,
        fullImage: imageData
      });

      currentPage = Math.floor((savedItems.length - 1) / itemsPerPage);

      updateLibraryDisplay();

      console.log();
    })();
  }

  sliderPrev.addEventListener("click", function () {
    if (sliderPrev.classList.contains("disabled")) return;

    currentPage = Math.max(0, currentPage - 1);
    savedItemsTrack.style.transform = `translateX(-${currentPage * 100}%)`;
    updateSliderButtons();
  });

  sliderNext.addEventListener("click", function () {
    if (sliderNext.classList.contains("disabled")) return;

    currentPage = Math.min(totalPages - 1, currentPage + 1);
    savedItemsTrack.style.transform = `translateX(-${currentPage * 100}%)`;
    updateSliderButtons();
  });

  window.addToLibrary = addSavedItem;

  updateLibraryDisplay();
}

// прохождение синхронизации серые кружочки
function initClickableCircles() {
  console.log("🔍 Инициализация кликабельных кругов...");

  const circles = [
    document.querySelector(".circle-click1"),
    document.querySelector(".circle-click2"),
    document.querySelector(".circle-click3"),
    document.querySelector(".circle-click4"),
    document.querySelector(".circle-click5"),
    document.querySelector(".circle-click6"),
    document.querySelector(".circle-click7"),
    document.querySelector(".circle-click8"),
    document.querySelector(".circle-click9"),
    document.querySelector(".circle-click10"),
    document.querySelector(".circle-click11"),
    document.querySelector(".circle-click12")
  ];

  const countElement = document.querySelector(".Count2");

  let activeCircles = new Array(circles.length).fill(false);

  function updateCounter() {
    const activeCount = activeCircles.filter((isActive) => isActive).length;
    countElement.textContent = `${activeCount} / 12`;

    if (activeCount === 12) {
      countElement.style.color = "#7b31db";
      countElement.style.textShadow = "0 0 10px rgba(123, 49, 219, 0.5)";
    } else {
      countElement.style.color = "#000000";
      countElement.style.textShadow = "none";
    }

    updateProgressBar();
  }

  circles.forEach((circle, index) => {
    if (!circle) {
      return;
    }

    circle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        activeCircles[index] = false;
      } else {
        this.classList.add("active");
        activeCircles[index] = true;
      }

      updateCounter();
    });
  });

  updateCounter();
}

// ===== УПРАВЛЕНИЕ КАРТИНКАМИ ЧЕРЕЗ БЕЛЫЕ ПОЛЗУНКИ =====
function initSliders() {
  console.log("🔍 Инициализация слайдеров...");

  function getValueFromMouse(e, track, min, max) {
    const rect = track.getBoundingClientRect();
    let x = e.clientX - rect.left;
    x = Math.max(0, Math.min(rect.width, x));
    return min + (x / rect.width) * (max - min);
  }

  function clamp(val, min, max) {
    return Math.max(min, Math.min(max, val));
  }

  function updateThumb(thumb, track, value, min, max) {
    if (!thumb || !track) return;

    const rect = track.getBoundingClientRect();
    const thumbW = thumb.offsetWidth;

    const percent = (value - min) / (max - min);
    const maxLeft = rect.width - thumbW;

    const left = percent * maxLeft;
    thumb.style.left = clamp(left, 0, maxLeft) + "px";
  }

  function bindSlider({ track, thumb, min, max, startValue, onChange }) {
    if (!track || !thumb) return;

    let dragging = false;
    let value = startValue;

    function setValue(v) {
      value = clamp(v, min, max);
      onChange(value);
      updateThumb(thumb, track, value, min, max);
    }

    thumb.addEventListener("mousedown", (e) => {
      e.preventDefault();
      dragging = true;
      thumb.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const v = getValueFromMouse(e, track, min, max);
      setValue(v);
    });

    document.addEventListener("mouseup", () => {
      dragging = false;
      thumb.style.cursor = "grab";
    });

    track.addEventListener("click", (e) => {
      const v = getValueFromMouse(e, track, min, max);
      setValue(v);
    });

    setValue(startValue);
  }

  const curveGREY = document.querySelector(".curveGREY");
  const curvePURPLE = document.querySelector(".curvePURPLE");

  const emoWidthTrack = document.getElementById("emoWidthTrack");
  const emoWidthThumb = document.getElementById("emoWidthThumb");

  const emoLengthTrack = document.getElementById("emoLengthTrack");
  const emoLengthThumb = document.getElementById("emoLengthThumb");

  const neiroWidthTrack = document.getElementById("neiroWidthTrack");
  const neiroWidthThumb = document.getElementById("neiroWidthThumb");

  const neiroLengthTrack = document.getElementById("neiroLengthTrack");
  const neiroLengthThumb = document.getElementById("neiroLengthThumb");

  window.currentEmoWidth = 230;
  window.currentEmoLength = 0;
  window.currentNeiroWidth = 230;
  window.currentNeiroLength = 0;

  function updateStatus() {
    updateConnectionStatus();
  }

  bindSlider({
    track: emoWidthTrack,
    thumb: emoWidthThumb,
    min: 230,
    max: 400,
    startValue: window.currentEmoWidth,
    onChange: (v) => {
      window.currentEmoWidth = v;
      if (curveGREY) {
        curveGREY.style.width = v + "%";
      }
      updateStatus();
    }
  });

  bindSlider({
    track: emoLengthTrack,
    thumb: emoLengthThumb,
    min: -100,
    max: 100,
    startValue: window.currentEmoLength,
    onChange: (v) => {
      window.currentEmoLength = v;
      if (curveGREY) {
        curveGREY.style.transform = `translateX(${v}px)`;
      }
      updateStatus();
    }
  });

  bindSlider({
    track: neiroWidthTrack,
    thumb: neiroWidthThumb,
    min: 230,
    max: 400,
    startValue: window.currentNeiroWidth,
    onChange: (v) => {
      window.currentNeiroWidth = v;
      if (curvePURPLE) {
        curvePURPLE.style.width = v + "%";
      }
      updateStatus();
    }
  });

  bindSlider({
    track: neiroLengthTrack,
    thumb: neiroLengthThumb,
    min: -100,
    max: 100,
    startValue: window.currentNeiroLength,
    onChange: (v) => {
      window.currentNeiroLength = v;
      if (curvePURPLE) {
        curvePURPLE.style.transform = `translateX(${v}px)`;
      }
      updateStatus();
    }
  });

  window.addEventListener("resize", () => {
    updateThumb(emoWidthThumb, emoWidthTrack, window.currentEmoWidth, 230, 400);
    updateThumb(
      emoLengthThumb,
      emoLengthTrack,
      window.currentEmoLength,
      -100,
      100
    );
    updateThumb(
      neiroWidthThumb,
      neiroWidthTrack,
      window.currentNeiroWidth,
      230,
      400
    );
    updateThumb(
      neiroLengthThumb,
      neiroLengthTrack,
      window.currentNeiroLength,
      -100,
      100
    );
  });

  updateStatus();
}

// сердечки
let disappearedHearts = 0;
let totalHearts = 0;
let allHeartsCollected = false;

function initClickableHearts() {
  const hearts = document.querySelectorAll(
    ".heart1, .heart2, .heart3, .heart4"
  );
  const squarePink = document.querySelector(".squarePink");
  const noti004Top = document.querySelector(".NOTI-004-top");
  const noti004Bottom = document.querySelector(".NOTI-004-bottom");
  const noti004Mid = document.querySelector(".NOTI-004-mid");

  if (!squarePink) {
    return;
  }

  disappearedHearts = 0;
  totalHearts = hearts.length;

  const colors = [
    { start: "#929292", end: "#929292" },
    { start: "#E6CBEB", end: "#D6ADD9" },
    { start: "#F5D4FA", end: "#F2ABF8" },
    { start: "#F8D2FF", end: "#E187E9" },
    { start: "#F2C0FA", end: "#F36EFF" }
  ];

  function updateSquarePinkColor() {
    const heartIndex = Math.min(disappearedHearts, totalHearts);
    const colorSet = colors[heartIndex];

    if (disappearedHearts === 0) {
      squarePink.style.background = colorSet.start;
      squarePink.style.boxShadow = "none";
    } else if (disappearedHearts === totalHearts) {
      squarePink.style.background = `linear-gradient(30deg, ${colorSet.start}, ${colorSet.end})`;
      squarePink.style.boxShadow = "0 0 15px rgba(218, 55, 233, 0.5)";
      squarePink.style.transition = "all 0.5s ease";

      if (!isTextChanged) {
        changeNotificationText();
      }
    } else {
      const intensity = disappearedHearts / totalHearts;
      squarePink.style.background = `linear-gradient(30deg, ${colorSet.start}, ${colorSet.end})`;
      squarePink.style.boxShadow = `0 0 ${5 + intensity * 10}px rgba(218, 55, 233, ${0.2 + intensity * 0.5})`;
      squarePink.style.transition = "all 0.5s ease";
    }
  }

  // ноти после сердечек
  function changeNotificationText() {
    if (noti004Top) {
      noti004Top.textContent = "NOTIFICATION-005";
      noti004Top.style.transition = "all 0.3s ease";
      noti004Top.style.color = "#7e7e7e";
    }

    if (noti004Mid) {
      noti004Mid.textContent = "humanization // COMPLETED";
      noti004Mid.style.transition = "all 0.3s ease";
      noti004Mid.style.color = "#d4d4d4";
    }

    if (noti004Bottom) {
      noti004Bottom.textContent =
        "Департамент поздравляет тебя! Система восполнена человечностью!";
      noti004Bottom.style.transition = "all 0.3s ease";
      noti004Bottom.style.color = "#d4d4d4";
      noti004Bottom.style.whiteSpace = "normal";
      noti004Bottom.style.width = "20vw";
      noti004Bottom.style.lineHeight = "1.5";
    }

    isTextChanged = true;

    if (noti004Top) noti004Top.style.animation = "fadeInText 0.5s ease";
    if (noti004Mid) noti004Mid.style.animation = "fadeInText 0.5s ease 0.1s";
    if (noti004Bottom)
      noti004Bottom.style.animation = "fadeInText 0.5s ease 0.2s";

    setTimeout(() => {
      if (noti004Top) noti004Top.style.animation = "";
      if (noti004Mid) noti004Mid.style.animation = "";
      if (noti004Bottom) noti004Bottom.style.animation = "";
    }, 600);
  }

  function disappearHeart(heart) {
    heart.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    heart.style.opacity = "0";
    heart.style.transform = "scale(0)";

    setTimeout(() => {
      heart.style.display = "none";
      disappearedHearts++;
      updateSquarePinkColor();
      checkAllHeartsCollected();
      console.log();
    }, 300);
  }

  hearts.forEach((heart, index) => {
    if (!heart) return;

    heart.style.cursor = "pointer";

    heart.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (this.style.display === "none") return;

      disappearHeart(this);
    });

    heart.addEventListener("mouseenter", function () {
      if (this.style.display !== "none") {
        this.style.transform = "scale(1.1)";
        this.style.transition = "transform 0.2s ease";
      }
    });

    heart.addEventListener("mouseleave", function () {
      if (this.style.display !== "none") {
        this.style.transform = "scale(1)";
      }
    });
  });
}

let isTextChanged = false;

// после сердечек дорожка
function changeRoadImage() {
  const roadPicture = document.getElementById("roadPicture");
  if (!roadPicture) {
    return;
  }

  const source = roadPicture.querySelector("source");
  const img = roadPicture.querySelector("img");

  if (!source || !img) {
    return;
  }

  if (window.innerWidth <= 414) {
    // мобилка
    if (allHeartsCollected) {
      source.srcset = "images/mobileRoadPink.svg";
    } else {
      source.srcset = "images/mobileRoad.svg";
    }
    img.src = source.srcset;
  } else {
    // десктоп
    if (allHeartsCollected) {
      img.src = "images/road1.svg";
    } else {
      img.src = "images/road0.svg";
    }
  }
}

// проверка для сердечек
function checkAllHeartsCollected() {
  const hearts = document.querySelectorAll(
    ".heart1, .heart2, .heart3, .heart4"
  );
  let collectedCount = 0;

  hearts.forEach((heart) => {
    if (heart.style.display === "none") {
      collectedCount++;
    }
  });

  const wasCollected = allHeartsCollected;
  allHeartsCollected = collectedCount === hearts.length;

  if (allHeartsCollected && !wasCollected) {
    changeRoadImage();
  }

  return allHeartsCollected;
}

const modelViewer = document.querySelector("model-viewer");
if (modelViewer) {
  modelViewer.addEventListener("load", () => {
    const model = modelViewer.model;
    const finger1 = model.querySelector('[name="finger1"]');
    if (finger1) {
      finger1.visible = false;
    }
  });
}

// функция
window.addEventListener("load", function () {
  const data6 = document.querySelector(".data6");
  if (data6) {
    let percent = 0;
    let increasing = true;
    function animatePercent() {
      if (increasing) {
        percent++;
        if (percent >= 150) increasing = false;
      } else {
        percent--;
        if (percent <= 0) increasing = true;
      }
      data6.textContent = percent + "%";
    }
    setInterval(animatePercent, 60);
  }

  setTimeout(function () {
    initSlider1();
    initSlider2();
    initSlider3();
    initAllSlidersToSquares();
    initSaveButton();
    initLibrary();
    initClickableCircles();
    initSliders();
    initClickableHearts();

    setTimeout(() => {
      checkAllHeartsCollected();
    }, 1000);
  }, 500);

  window.addEventListener("resize", changeRoadImage);
});
