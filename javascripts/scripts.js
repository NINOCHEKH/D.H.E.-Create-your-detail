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
    d19
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

  streaks.forEach((target, index) => {
    if (target.classList.contains("paused")) return;
    if (target.classList.contains("animating")) return;

    const len = target.getTotalLength();
    const pulseLength = len * 0.9;

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

// FFFF
// Один обработчик DOMContentLoaded для всего
document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM полностью загружен");

  // Анимация процентов
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

  // СЛАЙДЕР1;
  console.log("Инициализация слайдера...");

  const nextBtn = document.querySelector(".slider__next");
  const prevBtn = document.querySelector(".slider__prev");
  const sliderList = document.querySelector(".slider__list");
  const sliderWindow = document.querySelector(".slider__window");
  const slides = document.querySelectorAll(".slider__element");

  // Подробная диагностика
  console.log("nextBtn найден:", !!nextBtn);
  console.log("prevBtn найден:", !!prevBtn);
  console.log("sliderList найден:", !!sliderList);
  console.log("sliderWindow найден:", !!sliderWindow);
  console.log("количество слайдов:", slides.length);

  if (!nextBtn || !prevBtn || !sliderList || slides.length === 0) {
    console.error("");

    // Попробуем найти элементы по-другому
    console.log("Поиск всех кнопок:", document.querySelectorAll("button"));
    console.log("Поиск всех ul:", document.querySelectorAll("ul"));
    console.log(
      "Поиск всех .slider__element:",
      document.querySelectorAll(".slider__element")
    );
    return;
  }

  let currentSlide = 0;

  function updateSlider() {
    if (!sliderList) return;
    const translateValue = -currentSlide * 100;
    sliderList.style.transform = `translateX(${translateValue}%)`;
    console.log(
      `Слайд ${currentSlide + 1} из ${slides.length}, transform: translateX(${translateValue}%)`
    );
  }

  nextBtn.replaceWith(nextBtn.cloneNode(true));
  prevBtn.replaceWith(prevBtn.cloneNode(true));

  const newNextBtn = document.querySelector(".slider__next, .slider__next2");
  const newPrevBtn = document.querySelector(".slider__prev, slider__prev2");

  newNextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("");
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

  newPrevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Клик по слайдам
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log(` ${index + 1}`);
      currentSlide = index;
      updateSlider();
    });
  });

  // Проверим видимость слайдера
  setTimeout(() => {
    const slider = document.querySelector(".slider");
    if (slider) {
      const rect = slider.getBoundingClientRect();
      console.log("позиция", rect);
      console.log("", rect.width, "x", rect.height);
      console.log(
        "видно",
        rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0
      );
    }
  }, 500);

  // Инициализация
  updateSlider();
  console.log(" Слайдер инициализирован");
});
