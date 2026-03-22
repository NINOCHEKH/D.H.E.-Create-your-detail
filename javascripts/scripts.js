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
    d23
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

// ===== ВСЕ СЛАЙДЕРЫ =====
function initSlider1() {
  console.log("🔍 Поиск элементов слайдера 1...");

  const slider1 = document.querySelector(".slider");
  if (!slider1) {
    console.error("❌ Слайдер 1: контейнер .slider не найден");
    return;
  }

  const nextBtn = slider1.querySelector(".slider__next");
  const prevBtn = slider1.querySelector(".slider__prev");
  const sliderList = slider1.querySelector(".slider__list");
  const slides = slider1.querySelectorAll(".slider__element");

  if (!nextBtn || !prevBtn || !sliderList || slides.length === 0) {
    console.error("❌ Слайдер 1: элементы не найдены!");
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
  console.log("✅ Слайдер 1 инициализирован");
}

function initSlider2() {
  console.log("🔍 Поиск элементов слайдера 2...");

  const slider2 = document.querySelector(".slider2");
  if (!slider2) {
    console.error("❌ Слайдер 2: контейнер .slider2 не найден");
    return;
  }

  const nextBtn2 = slider2.querySelector(".slider__next2");
  const prevBtn2 = slider2.querySelector(".slider__prev2");
  const sliderList2 = slider2.querySelector(".slider__list2");
  const slides2 = slider2.querySelectorAll(".slider__element2");

  if (!nextBtn2 || !prevBtn2 || !sliderList2 || slides2.length === 0) {
    console.error("❌ Слайдер 2: элементы не найдены!");
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
  console.log("✅ Слайдер 2 инициализирован");
}

function initSlider3() {
  console.log("🔍 Поиск элементов слайдера 3...");

  const slider3 = document.querySelector(".slider3");
  if (!slider3) {
    console.error("❌ Слайдер 3: контейнер .slider3 не найден");
    return;
  }

  const nextBtn3 = slider3.querySelector(".slider__next3");
  const prevBtn3 = slider3.querySelector(".slider__prev3");
  const sliderList3 = slider3.querySelector(".slider__list3");
  const slides3 = slider3.querySelectorAll(".slider__element3");

  if (!nextBtn3 || !prevBtn3 || !sliderList3 || slides3.length === 0) {
    console.error("❌ Слайдер 3: элементы не найдены!");
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
  console.log("✅ Слайдер 3 инициализирован");
}

// картиночки в квадратах
function initAllSlidersToSquares() {
  console.log("🔍 Инициализация вставки картинок из слайдеров в квадраты...");

  // 1 слайдер
  const slider1Images = document.querySelectorAll(
    ".slider .slider__element img"
  );
  const square1 = document.querySelector(".square1");
  const arrow1 = document.querySelector(".arrow1");

  let currentSelectedImg1 = null;

  if (square1 && slider1Images.length > 0) {
    console.log("✅ Слайдер 1: найдено", slider1Images.length, "картинок");

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

        console.log(`🖱️ Слайдер 1: клик по pic${index + 1}`);

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
          console.log("✅ Стрелка 1 скрыта");
        }
      });
    });

    square1.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("🖱️ Клик по square1");

      if (window.deactivateSavedState) {
        window.deactivateSavedState();
      }

      if (this.children.length > 0) {
        console.log("✅ Картинка найдена, удаляем");

        this.innerHTML = "";

        if (currentSelectedImg1) {
          currentSelectedImg1.style.filter = "none";
          currentSelectedImg1.style.boxShadow = "none";
          currentSelectedImg1.style.opacity = "1";
          currentSelectedImg1 = null;
        }

        if (arrow1) {
          arrow1.classList.remove("hidden");
          console.log("✅ Стрелка 1 возвращена");
        }

        this.style.boxShadow = "0 0 8px #ffffffff";
        setTimeout(() => {
          this.style.boxShadow = "none";
        }, 250);
      } else {
        console.log("ℹ️ Квадрат уже пуст");
      }
    });
  } else {
    console.log("❌ Слайдер 1: square1 или картинки не найдены");
  }

  // 2 слайдер
  const slider2Images = document.querySelectorAll(
    ".slider2 .slider__element2 img"
  );
  const square2 = document.querySelector(".square2");
  const arrow2 = document.querySelector(".arrow2");
  let currentSelectedImg2 = null;

  if (square2 && slider2Images.length > 0) {
    console.log("✅ Слайдер 2: найдено", slider2Images.length, "картинок");

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

        console.log(`🖱️ Слайдер 2: клик по pic${index + 1}`);

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
          console.log("✅ Стрелка 2 скрыта");
        }
      });
    });

    square2.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("🖱️ Клик по square2");

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
          console.log("✅ Стрелка 2 возвращена");
        }

        this.style.boxShadow = "0 0 8px #ffffffff";
        setTimeout(() => {
          this.style.boxShadow = "none";
        }, 250);
      }
    });
  } else {
    console.log("❌ Слайдер 2: square2 или картинки не найдены");
  }

  // 3 слайдер
  const slider3Images = document.querySelectorAll(
    ".slider3 .slider__element3 img"
  );
  const square3 = document.querySelector(".square3");
  const arrow3 = document.querySelector(".arrow3");
  let currentSelectedImg3 = null;

  if (square3 && slider3Images.length > 0) {
    console.log("✅ Слайдер 3: найдено", slider3Images.length, "картинок");

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

        console.log(`🖱️ Слайдер 3: клик по pic${index + 1}`);

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
          console.log("✅ Стрелка 3 скрыта");
        }
      });
    });

    square3.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      console.log("🖱️ Клик по square3");

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
          console.log("✅ Стрелка 3 возвращена");
        }

        this.style.boxShadow = "0 0 8px #ffffffff";
        setTimeout(() => {
          this.style.boxShadow = "none";
        }, 250);
      }
    });
  } else {
    console.log("❌ Слайдер 3: square3 или картинки не найдены");
  }

  console.log("✅ Все слайдеры настроены на вставку в квадраты!");
}

// сохранение
function initSaveButton() {
  console.log("🔍 Инициализация кнопки сохранения...");

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
    console.error("❌ Не найдены квадраты или кнопка сохранения");
    return;
  }

  function areAllSquaresFilled() {
    const hasSquare1 = square1.children.length > 0;
    const hasSquare2 = square2.children.length > 0;
    const hasSquare3 = square3.children.length > 0;
    return hasSquare1 && hasSquare2 && hasSquare3;
  }

  function activateSavedState() {
    console.log("✨ Активация эффектов после сохранения...");

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

    console.log("🔄 Плавный возврат к обычному состоянию...");

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

  async function saveCombination() {
    console.log("💾 Сохраняем комбинацию...");

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

    console.log("✅ Комбинация сохранена!");

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

  console.log("✅ Кнопка сохранения инициализирована");
}

// ===== БИБЛИОТЕКА СОХРАНЕНИЙ =====
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

      console.log(
        `✅ Сохранение добавлено. Всего: ${savedItems.length}, страниц: ${totalPages}`
      );
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

  console.log("✅ Библиотека сохранений инициализирована");
}

// ===== КЛИКАБЕЛЬНЫЕ КРУГИ И СЧЕТЧИК =====
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
  }

  circles.forEach((circle, index) => {
    if (!circle) {
      console.warn(`Круг ${index + 1} не найден`);
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

  console.log("✅ Кликабельные круги инициализированы");
}

// ===== УПРАВЛЕНИЕ КАРТИНКАМИ ЧЕРЕЗ ИНПУТЫ =====
function initInputControls() {
  console.log("🔍 Инициализация управления через инпуты...");

  const curveGREY = document.querySelector(".curveGREY");
  const curvePURPLE = document.querySelector(".curvePURPLE");

  // EMO инпуты
  const emoWidthInput = document.getElementById("emoWidthInput");
  const emoLengthInput = document.getElementById("emoLengthInput");

  // NEIRO инпуты
  const neiroWidthInput = document.getElementById("neiroWidthInput");
  const neiroLengthInput = document.getElementById("neiroLengthInput");

  if (
    !curveGREY ||
    !curvePURPLE ||
    !emoWidthInput ||
    !emoLengthInput ||
    !neiroWidthInput ||
    !neiroLengthInput
  ) {
    console.warn("❌ Не все элементы найдены");
    return;
  }

  // Диапазоны
  const EMO_WIDTH_MIN = 230;
  const EMO_WIDTH_MAX = 400;
  const EMO_LENGTH_MIN = -44;
  const EMO_LENGTH_MAX = 0;

  const NEIRO_WIDTH_MIN = 230;
  const NEIRO_WIDTH_MAX = 400;
  const NEIRO_LENGTH_MIN = -44;
  const NEIRO_LENGTH_MAX = 0;

  // Функция для обновления ширины curveGREY
  function updateGreyWidth() {
    let value = parseFloat(emoWidthInput.value);
    if (isNaN(value)) value = EMO_WIDTH_MIN;
    value = Math.max(EMO_WIDTH_MIN, Math.min(EMO_WIDTH_MAX, value));
    curveGREY.style.width = value + "%";
    emoWidthInput.value = value;
    console.log("EMO ширина:", value, "%");
  }

  // Функция для обновления длины curveGREY
  function updateGreyLength() {
    let value = parseFloat(emoLengthInput.value);
    if (isNaN(value)) value = EMO_LENGTH_MIN;
    value = Math.max(EMO_LENGTH_MIN, Math.min(EMO_LENGTH_MAX, value));
    curveGREY.style.left = value + "vw";
    emoLengthInput.value = value;
    console.log("EMO длина:", value, "vw");
  }

  // Функция для обновления ширины curvePURPLE
  function updatePurpleWidth() {
    let value = parseFloat(neiroWidthInput.value);
    if (isNaN(value)) value = NEIRO_WIDTH_MIN;
    value = Math.max(NEIRO_WIDTH_MIN, Math.min(NEIRO_WIDTH_MAX, value));
    curvePURPLE.style.width = value + "%";
    neiroWidthInput.value = value;
    console.log("NEIRO ширина:", value, "%");
  }

  // Функция для обновления длины curvePURPLE
  function updatePurpleLength() {
    let value = parseFloat(neiroLengthInput.value);
    if (isNaN(value)) value = NEIRO_LENGTH_MIN;
    value = Math.max(NEIRO_LENGTH_MIN, Math.min(NEIRO_LENGTH_MAX, value));
    curvePURPLE.style.left = value + "vw";
    neiroLengthInput.value = value;
    console.log("NEIRO длина:", value, "vw");
  }

  // Добавляем обработчики событий
  emoWidthInput.addEventListener("input", updateGreyWidth);
  emoLengthInput.addEventListener("input", updateGreyLength);
  neiroWidthInput.addEventListener("input", updatePurpleWidth);
  neiroLengthInput.addEventListener("input", updatePurpleLength);

  // Устанавливаем начальные значения
  updateGreyWidth();
  updateGreyLength();
  updatePurpleWidth();
  updatePurpleLength();

  console.log("✅ Управление через инпуты инициализировано");
}

// ===== УПРАВЛЕНИЕ КАРТИНКАМИ ЧЕРЕЗ БЕЛЫЕ ПОЛЗУНКИ =====
function initSliders() {
  console.log("🔍 Инициализация белых ползунков...");

  const curveGREY = document.querySelector(".curveGREY");
  const curvePURPLE = document.querySelector(".curvePURPLE");

  // Элементы ползунков
  const emoWidthTrack = document.getElementById("emoWidthTrack");
  const emoWidthThumb = document.getElementById("emoWidthThumb");
  const emoLengthTrack = document.getElementById("emoLengthTrack");
  const emoLengthThumb = document.getElementById("emoLengthThumb");
  const neiroWidthTrack = document.getElementById("neiroWidthTrack");
  const neiroWidthThumb = document.getElementById("neiroWidthThumb");
  const neiroLengthTrack = document.getElementById("neiroLengthTrack");
  const neiroLengthThumb = document.getElementById("neiroLengthThumb");

  if (!curveGREY || !curvePURPLE) {
    console.warn("❌ curveGREY или curvePURPLE не найдены");
    return;
  }

  // Диапазоны значений
  const EMO_WIDTH_MIN = 230;
  const EMO_WIDTH_MAX = 400;
  const EMO_LENGTH_MIN = -44;
  const EMO_LENGTH_MAX = 0;
  const NEIRO_WIDTH_MIN = 230;
  const NEIRO_WIDTH_MAX = 400;
  const NEIRO_LENGTH_MIN = -44;
  const NEIRO_LENGTH_MAX = 0;

  // Функция для обновления позиции ползунка
  function updateThumbPosition(thumb, track, value, min, max) {
    if (!thumb || !track) return;
    const trackRect = track.getBoundingClientRect();
    const thumbWidth = thumb.offsetWidth;
    const percent = (value - min) / (max - min);
    const maxLeft = trackRect.width - thumbWidth;
    const leftPos = percent * maxLeft;
    thumb.style.left = Math.max(0, Math.min(maxLeft, leftPos)) + "px";
  }

  // Функция для получения значения из позиции мыши
  function getValueFromMouse(e, track, min, max) {
    const trackRect = track.getBoundingClientRect();
    let mouseX = e.clientX;
    mouseX = Math.max(trackRect.left, Math.min(trackRect.right, mouseX));
    const percent = (mouseX - trackRect.left) / trackRect.width;
    return min + percent * (max - min);
  }

  // ===== EMO ШИРИНА =====
  if (emoWidthTrack && emoWidthThumb) {
    let isDraggingEmoWidth = false;

    function updateEmoWidth(value) {
      value = Math.max(EMO_WIDTH_MIN, Math.min(EMO_WIDTH_MAX, value));
      curveGREY.style.width = value + "%";
      updateThumbPosition(
        emoWidthThumb,
        emoWidthTrack,
        value,
        EMO_WIDTH_MIN,
        EMO_WIDTH_MAX
      );
      console.log("EMO ширина:", Math.round(value), "%");
    }

    emoWidthThumb.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      isDraggingEmoWidth = true;
      this.style.cursor = "grabbing";
      console.log("Начали тянуть EMO ширину");
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDraggingEmoWidth) return;
      e.preventDefault();
      const value = getValueFromMouse(
        e,
        emoWidthTrack,
        EMO_WIDTH_MIN,
        EMO_WIDTH_MAX
      );
      updateEmoWidth(value);
    });

    document.addEventListener("mouseup", function () {
      if (isDraggingEmoWidth) {
        isDraggingEmoWidth = false;
        emoWidthThumb.style.cursor = "grab";
        console.log("Закончили тянуть EMO ширину");
      }
    });

    emoWidthTrack.addEventListener("click", function (e) {
      const value = getValueFromMouse(
        e,
        emoWidthTrack,
        EMO_WIDTH_MIN,
        EMO_WIDTH_MAX
      );
      updateEmoWidth(value);
    });

    updateEmoWidth(230);
  }

  // ===== EMO ДЛИНА (БЛОКИРУЕМЫЙ ПОЛЗУНОК) =====
  if (emoLengthTrack && emoLengthThumb) {
    let isDraggingEmoLength = false;

    // Функция для блокировки/разблокировки ползунка
    function setEmoLengthLocked(locked) {
      if (locked) {
        emoLengthThumb.classList.add("disabled");
        emoLengthThumb.style.cursor = "not-allowed";
        emoLengthThumb.style.opacity = "0.5";
        emoLengthTrack.style.cursor = "not-allowed";
        console.log(
          "🔒 Ползунок EMO длины заблокирован (достигнут минимум -44vw)"
        );
      } else {
        emoLengthThumb.classList.remove("disabled");
        emoLengthThumb.style.cursor = "grab";
        emoLengthThumb.style.opacity = "1";
        emoLengthTrack.style.cursor = "pointer";
        console.log("🔓 Ползунок EMO длины разблокирован");
      }
    }

    function updateEmoLength(value) {
      // Проверяем, не заблокирован ли ползунок
      if (
        emoLengthThumb.classList.contains("disabled") &&
        value > EMO_LENGTH_MIN
      ) {
        // Если заблокирован, но пытаемся двигать вверх - разрешаем
        setEmoLengthLocked(false);
      }

      // Если значение достигает минимума - блокируем
      if (value <= EMO_LENGTH_MIN) {
        value = EMO_LENGTH_MIN;
        setEmoLengthLocked(true);
      } else {
        // Если значение не минимальное - разблокируем (на случай, если было заблокировано)
        if (emoLengthThumb.classList.contains("disabled")) {
          setEmoLengthLocked(false);
        }
      }

      value = Math.max(EMO_LENGTH_MIN, Math.min(EMO_LENGTH_MAX, value));
      curveGREY.style.left = value + "vw";
      updateThumbPosition(
        emoLengthThumb,
        emoLengthTrack,
        value,
        EMO_LENGTH_MIN,
        EMO_LENGTH_MAX
      );
      console.log("EMO длина:", Math.round(value), "vw");
    }

    // Обработчик начала перетаскивания
    emoLengthThumb.addEventListener("mousedown", function (e) {
      // Если ползунок заблокирован - не даем его двигать
      if (this.classList.contains("disabled")) {
        e.preventDefault();
        e.stopPropagation();
        console.log("⛔ Ползунок EMO длины заблокирован, нельзя двигать");
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      isDraggingEmoLength = true;
      this.style.cursor = "grabbing";
      console.log("Начали тянуть EMO длину");
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDraggingEmoLength) return;
      e.preventDefault();

      // Получаем значение и обновляем
      const value = getValueFromMouse(
        e,
        emoLengthTrack,
        EMO_LENGTH_MIN,
        EMO_LENGTH_MAX
      );
      updateEmoLength(value);
    });

    document.addEventListener("mouseup", function () {
      if (isDraggingEmoLength) {
        isDraggingEmoLength = false;
        if (!emoLengthThumb.classList.contains("disabled")) {
          emoLengthThumb.style.cursor = "grab";
        }
        console.log("Закончили тянуть EMO длину");
      }
    });

    // Обработчик клика по треку
    emoLengthTrack.addEventListener("click", function (e) {
      // Если ползунок заблокирован - не реагируем на клик
      if (emoLengthThumb.classList.contains("disabled")) {
        console.log(
          "⛔ Ползунок EMO длины заблокирован, клик по треку игнорируется"
        );
        return;
      }

      const value = getValueFromMouse(
        e,
        emoLengthTrack,
        EMO_LENGTH_MIN,
        EMO_LENGTH_MAX
      );
      updateEmoLength(value);
    });

    // Начальное обновление (значение по умолчанию -22, не минимальное)
    updateEmoLength(-22);
  }

  // ===== NEIRO ШИРИНА =====
  if (neiroWidthTrack && neiroWidthThumb) {
    let isDraggingNeiroWidth = false;

    function updateNeiroWidth(value) {
      value = Math.max(NEIRO_WIDTH_MIN, Math.min(NEIRO_WIDTH_MAX, value));
      curvePURPLE.style.width = value + "%";
      updateThumbPosition(
        neiroWidthThumb,
        neiroWidthTrack,
        value,
        NEIRO_WIDTH_MIN,
        NEIRO_WIDTH_MAX
      );
      console.log("NEIRO ширина:", Math.round(value), "%");
    }

    neiroWidthThumb.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      isDraggingNeiroWidth = true;
      this.style.cursor = "grabbing";
      console.log("Начали тянуть NEIRO ширину");
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDraggingNeiroWidth) return;
      e.preventDefault();
      const value = getValueFromMouse(
        e,
        neiroWidthTrack,
        NEIRO_WIDTH_MIN,
        NEIRO_WIDTH_MAX
      );
      updateNeiroWidth(value);
    });

    document.addEventListener("mouseup", function () {
      if (isDraggingNeiroWidth) {
        isDraggingNeiroWidth = false;
        neiroWidthThumb.style.cursor = "grab";
        console.log("Закончили тянуть NEIRO ширину");
      }
    });

    neiroWidthTrack.addEventListener("click", function (e) {
      const value = getValueFromMouse(
        e,
        neiroWidthTrack,
        NEIRO_WIDTH_MIN,
        NEIRO_WIDTH_MAX
      );
      updateNeiroWidth(value);
    });

    updateNeiroWidth(230);
  }

  // ===== NEIRO ДЛИНА =====
  if (neiroLengthTrack && neiroLengthThumb) {
    let isDraggingNeiroLength = false;

    function updateNeiroLength(value) {
      value = Math.max(NEIRO_LENGTH_MIN, Math.min(NEIRO_LENGTH_MAX, value));
      curvePURPLE.style.left = value + "vw";
      updateThumbPosition(
        neiroLengthThumb,
        neiroLengthTrack,
        value,
        NEIRO_LENGTH_MIN,
        NEIRO_LENGTH_MAX
      );
      console.log("NEIRO длина:", Math.round(value), "vw");
    }

    neiroLengthThumb.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      isDraggingNeiroLength = true;
      this.style.cursor = "grabbing";
      console.log("Начали тянуть NEIRO длину");
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDraggingNeiroLength) return;
      e.preventDefault();
      const value = getValueFromMouse(
        e,
        neiroLengthTrack,
        NEIRO_LENGTH_MIN,
        NEIRO_LENGTH_MAX
      );
      updateNeiroLength(value);
    });

    document.addEventListener("mouseup", function () {
      if (isDraggingNeiroLength) {
        isDraggingNeiroLength = false;
        neiroLengthThumb.style.cursor = "grab";
        console.log("Закончили тянуть NEIRO длину");
      }
    });

    neiroLengthTrack.addEventListener("click", function (e) {
      const value = getValueFromMouse(
        e,
        neiroLengthTrack,
        NEIRO_LENGTH_MIN,
        NEIRO_LENGTH_MAX
      );
      updateNeiroLength(value);
    });

    updateNeiroLength(-22);
  }

  console.log("✅ Белые ползунки инициализированы");
}
// ===== ГЛАВНАЯ ФУНКЦИЯ =====
// ===== ГЛАВНАЯ ФУНКЦИЯ =====
window.addEventListener("load", function () {
  console.log("✅ Страница полностью загружена");

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

    // Вместо initInputControls используем initSliders
    initSliders();

    console.log("🎉 Все системы запущены!");
  }, 500);
});
