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

// слайдерыыы
// Ждем полной загрузки страницы, включая все изображения
window.addEventListener("load", function () {
  console.log("✅ Страница полностью загружена");

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

  // Подождем немного для гарантии
  setTimeout(function () {
    // ===== СЛАЙДЕР 1 =====
    initSlider1();

    // ===== СЛАЙДЕР 2 =====
    initSlider2();

    // ===== СЛАЙДЕР 3 =====
    initSlider3();
  }, 500);
});

// Функция для первого слайдера
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

  console.log("Слайдер 1 найден:", slider1);
  console.log("nextBtn:", nextBtn);
  console.log("prevBtn:", prevBtn);
  console.log("sliderList:", sliderList);
  console.log("slides:", slides.length);

  if (!nextBtn || !prevBtn || !sliderList || slides.length === 0) {
    console.error("❌ Слайдер 1: элементы не найдены!");
    return;
  }

  let currentSlide = 0;

  function updateSlider() {
    sliderList.style.transform = `translateX(-${currentSlide * 100}%)`;
    console.log(`Слайдер 1: слайд ${currentSlide + 1} из ${slides.length}`);
  }

  // Удаляем старые обработчики
  const newNextBtn = nextBtn.cloneNode(true);
  const newPrevBtn = prevBtn.cloneNode(true);
  nextBtn.replaceWith(newNextBtn);
  prevBtn.replaceWith(newPrevBtn);

  // Находим новые кнопки
  const finalNextBtn = slider1.querySelector(".slider__next");
  const finalPrevBtn = slider1.querySelector(".slider__prev");

  finalNextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("👉 Слайдер 1: вперед");
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
  });

  finalPrevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("👈 Слайдер 1: назад");
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
  });

  // Клик по слайдам
  slides.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      console.log(`🎯 Слайдер 1: слайд ${index + 1}`);
      currentSlide = index;
      updateSlider();
    });
  });

  updateSlider();
  console.log("✅ Слайдер 1 инициализирован");
}

// Функция для второго слайдера
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

  console.log("Слайдер 2 найден:", slider2);
  console.log("nextBtn2:", nextBtn2);
  console.log("prevBtn2:", prevBtn2);
  console.log("sliderList2:", sliderList2);
  console.log("slides2:", slides2.length);

  if (!nextBtn2 || !prevBtn2 || !sliderList2 || slides2.length === 0) {
    console.error("❌ Слайдер 2: элементы не найдены!");
    return;
  }

  let currentSlide2 = 0;

  function updateSlider2() {
    sliderList2.style.transform = `translateX(-${currentSlide2 * 100}%)`;
    console.log(`Слайдер 2: слайд ${currentSlide2 + 1} из ${slides2.length}`);
  }

  // Удаляем старые обработчики
  const newNextBtn2 = nextBtn2.cloneNode(true);
  const newPrevBtn2 = prevBtn2.cloneNode(true);
  nextBtn2.replaceWith(newNextBtn2);
  prevBtn2.replaceWith(newPrevBtn2);

  // Находим новые кнопки
  const finalNextBtn2 = slider2.querySelector(".slider__next2");
  const finalPrevBtn2 = slider2.querySelector(".slider__prev2");

  finalNextBtn2.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("👉 Слайдер 2: вперед");
    currentSlide2 = (currentSlide2 + 1) % slides2.length;
    updateSlider2();
  });

  finalPrevBtn2.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("👈 Слайдер 2: назад");
    currentSlide2 = (currentSlide2 - 1 + slides2.length) % slides2.length;
    updateSlider2();
  });

  // Клик по слайдам
  slides2.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      console.log(`🎯 Слайдер 2: слайд ${index + 1}`);
      currentSlide2 = index;
      updateSlider2();
    });
  });

  updateSlider2();
  console.log("✅ Слайдер 2 инициализирован");
}

// Функция для третьего слайдера
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

  console.log("Слайдер 3 найден:", slider3);
  console.log("nextBtn3:", nextBtn3);
  console.log("prevBtn3:", prevBtn3);
  console.log("sliderList3:", sliderList3);
  console.log("slides3:", slides3.length);

  if (!nextBtn3 || !prevBtn3 || !sliderList3 || slides3.length === 0) {
    console.error("❌ Слайдер 3: элементы не найдены!");
    return;
  }

  let currentSlide3 = 0;

  function updateSlider3() {
    sliderList3.style.transform = `translateX(-${currentSlide3 * 100}%)`;
    console.log(`Слайдер 3: слайд ${currentSlide3 + 1} из ${slides3.length}`);
  }

  // Удаляем старые обработчики
  const newNextBtn3 = nextBtn3.cloneNode(true);
  const newPrevBtn3 = prevBtn3.cloneNode(true);
  nextBtn3.replaceWith(newNextBtn3);
  prevBtn3.replaceWith(newPrevBtn3);

  // Находим новые кнопки
  const finalNextBtn3 = slider3.querySelector(".slider__next3");
  const finalPrevBtn3 = slider3.querySelector(".slider__prev3");

  finalNextBtn3.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("👉 Слайдер 3: вперед");
    currentSlide3 = (currentSlide3 + 1) % slides3.length;
    updateSlider3();
  });

  finalPrevBtn3.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("👈 Слайдер 3: назад");
    currentSlide3 = (currentSlide3 - 1 + slides3.length) % slides3.length;
    updateSlider3();
  });

  // Клик по слайдам
  slides3.forEach((slide, index) => {
    slide.addEventListener("click", function () {
      console.log(`🎯 Слайдер 3: слайд ${index + 1}`);
      currentSlide3 = index;
      updateSlider3();
    });
  });

  updateSlider3();
  console.log("✅ Слайдер 3 инициализирован");
}
