export function carrousel() {
  // variables
  const movieBox = document.querySelector("#movie-box");
  const leftArrow = document.querySelector(".nav.prev");
  const rightArrow = document.querySelector(".nav.next");

  let track = null;
  let slides = [];
  let currentIndex = 0;
  let isInitialized = false;

  let initTimer = null;
  let initAttempts = 0;
  const maxInitAttempts = 40; 

  // functions
  function isDesktop() {
    return window.matchMedia("(min-width: 75em)").matches;
  }

  function updateCarouselPosition() {
    if (!movieBox) {
      return;
    }

    track = movieBox.querySelector("ul");
    slides = [];

    if (track) {
      slides = Array.from(track.querySelectorAll("li"));
    }

    if (!track) {
      return;
    }

    if (slides.length === 0) {
      return;
    }

    const slidesPerView = isDesktop() ? 3 : 1;
    const maxIndex = Math.max(0, slides.length - slidesPerView);

    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const slideWidth = slides[0].offsetWidth;
    const gap = 16;
    const offset = currentIndex * (slideWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
  }

  function goNext(event) {
    event.preventDefault();
    currentIndex += 1;
    updateCarouselPosition();
  }

  function goPrev(event) {
    event.preventDefault();
    currentIndex -= 1;
    updateCarouselPosition();
  }

  function handleResize() {
    updateCarouselPosition();
  }

  function stopInitTimer() {
    if (initTimer) {
      clearInterval(initTimer);
      initTimer = null;
    }
  }

  function tryInit() {
    if (!movieBox) {
      return;
    }

    if (!leftArrow) {
      return;
    }

    if (!rightArrow) {
      return;
    }

    if (isInitialized) {
      return;
    }

    track = movieBox.querySelector("ul");
    slides = [];

    if (track) {
      slides = Array.from(track.querySelectorAll("li"));
    }

    if (!track) {
      initAttempts = initAttempts + 1;
      if (initAttempts >= maxInitAttempts) stopInitTimer();
      return;
    }

    if (slides.length === 0) {
      initAttempts = initAttempts + 1;
      if (initAttempts >= maxInitAttempts) stopInitTimer();
      return;
    }

    rightArrow.addEventListener("click", goNext);
    leftArrow.addEventListener("click", goPrev);
    window.addEventListener("resize", handleResize);

    isInitialized = true;
    stopInitTimer();
    updateCarouselPosition();
  }

  function startInitTimer() {
    initTimer = setInterval(tryInit, 100);
  }

  // event listeners
  if (!movieBox) {
    return;
  }

  if (!leftArrow) {
    return;
  }

  if (!rightArrow) {
    return;
  }

  tryInit();

  if (!isInitialized) {
    startInitTimer();
  }
}
