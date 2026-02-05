export function searchbar() {
  // variables
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const movieBox = document.querySelector("#movie-box");

  // functions
  function resetCarouselPosition() {
    if (!movieBox) {
      return;
    }

    const track = movieBox.querySelector("ul");
    if (!track) {
      return;
    }

    track.style.transform = "translateX(0)";
  }

  function filterMovies() {
    if (!movieBox || !searchInput) {
      return;
    }

    const query = searchInput.value.trim().toLowerCase();
    const cards = movieBox.querySelectorAll("li");

    let i = 0;
    while (i < cards.length) {
      const card = cards[i];
      const titleLink = card.querySelector("a");

      let titleText = "";
      if (titleLink) {
        titleText = titleLink.textContent.trim().toLowerCase();
      }

      if (query === "" || titleText.indexOf(query) !== -1) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

      i = i + 1;
    }

    resetCarouselPosition();
  }

  function handleSearchInput() {
    filterMovies();
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    filterMovies();
  }

  // event listeners
  if (searchInput) {
    searchInput.addEventListener("input", handleSearchInput);
  }

  if (searchForm) {
    searchForm.addEventListener("submit", handleSearchSubmit);
  }
}
