export function gsapanimation() {
  if (typeof gsap === "undefined") return;
  if (typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // variables
  const introTitle = document.querySelector(".intro-text h2");
  const introParagraph = document.querySelector(".intro-text p");
  const carouselWrap = document.querySelector("#cardWrapper");
  const arrows = document.querySelectorAll(".nav.prev, .nav.next");
  const reviewBox = document.querySelector(".review-box");
  const footerCopy = document.querySelector(".footer-copy");

  let refreshTimer = null;
  let refreshAttempts = 0;
  const maxRefreshAttempts = 20; 

  // functions
  function animateIntro(titleEl, paragraphEl) {
    if (titleEl) {
      gsap.fromTo(
        titleEl,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#informationWrapper",
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        }
      );
    }

    if (paragraphEl) {
      gsap.fromTo(
        paragraphEl,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.08,
          scrollTrigger: {
            trigger: "#informationWrapper",
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        }
      );
    }
  }

  function animateCarousel(wrapperEl) {
    if (!wrapperEl) return;

    gsap.fromTo(
      wrapperEl,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top 85%",
          toggleActions: "play none none reset"
        }
      }
    );

    const slides = document.querySelectorAll("#movie-box li");
    if (!slides.length) return;

    gsap.fromTo(
      slides,
      { rotate: -1.2, y: 8 },
      {
        rotate: 0,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top 90%",
          end: "top 55%",
          scrub: true,
          invalidateOnRefresh: true
        }
      }
    );
  }

  function animateArrows(arrowEls, wrapperEl) {
    if (!arrowEls.length) return;

    gsap.fromTo(
      arrowEls,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapperEl || arrowEls[0],
          start: "top 85%",
          toggleActions: "play none none reset"
        }
      }
    );
  }

  function animateReview(reviewEl) {
    if (!reviewEl) return;

    gsap.fromTo(
      reviewEl,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power2.out",
        scrollTrigger: {
          trigger: reviewEl,
          start: "top 88%",
          toggleActions: "play none none reset"
        }
      }
    );
  }

  function animateFooter(footerEl) {
    if (!footerEl) return;

    gsap.fromTo(
      footerEl,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerEl,
          start: "top 92%",
          toggleActions: "play none none reset"
        }
      }
    );
  }

  function stopRefreshTimer() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  }

  function tryRefresh() {
    ScrollTrigger.refresh();
    refreshAttempts = refreshAttempts + 1;

    if (refreshAttempts >= maxRefreshAttempts) {
      stopRefreshTimer();
    }
  }

  function startRefreshTimer() {
    refreshTimer = setInterval(tryRefresh, 150);
  }

  // event listeners 
  animateIntro(introTitle, introParagraph);
  animateCarousel(carouselWrap);
  animateArrows(arrows, carouselWrap);
  animateReview(reviewBox);
  animateFooter(footerCopy);

  startRefreshTimer();
}
