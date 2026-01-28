export function apiConnection() {

    const movieBox = document.querySelector("#movie-box");
    const reviewTemplate = document.querySelector("#review-template");
    const reviewCon = document.querySelector("#review-con");

    function getMovies() {
        fetch("https://swapi.info/api/films")
        .then(results => results.json())
        .then(function(results) {
            console.log(results);
            const movies = results;

            const ul = document.createElement("ul");

            movies.forEach((movie, index) => {
                const li = document.createElement("li");
                const a  = document.createElement("a");
                const img = document.createElement('img');
                // console.log(movie.opening_crawl);
                a.textContent = movie.title;
                a.dataset.movieDescription = movie.opening_crawl;
                a.dataset.id = index;
                // console.log(`${index}.jpg`);
                // img.src = `${index}.jpg`;
                // li.appendChild(img);
                li.appendChild(a);
                ul.appendChild(li);
            }); 
            movieBox.appendChild(ul);
        })
        .then(function() {
            const links = document.querySelectorAll("#movie-box li a");
            // console.log(links);
            links.forEach(link => {
                link.addEventListener("click", (e) => {
                    getReview(e);
                });
            });
        })
        .catch(function(err) {
            console.log(err);
            const errMessage = document.createElement("p");
            errMessage.textContent = "Oops, something went wrong. It may be your internet connection or it might be us. Please try again later.";
            movieBox.appendChild(errMessage);
        })
    }

    function getReview(e) {
        // console.log(e.currentTarget.dataset.movieDescription);
        console.log(e.currentTarget.dataset.id);
        const position = e.currentTarget.dataset.id;
        const description = e.currentTarget.dataset.movieDescription;
        fetch("https://swapi.info/api/films")
        .then(response => response.json())
        .then(function(response) {
            reviewCon.innerHTML = "";

            const clone = reviewTemplate.content.cloneNode(true);
            const reviewDescription = clone.querySelector(".review-description");
            const reviewHeading = clone.querySelector(".review-heading");
            const reviewDirector = clone.querySelector(".review-director");

            reviewDescription.innerHTML = description;
            // console.log(response[position].title);
            reviewHeading.innerHTML = response[position].title;
            reviewDirector.innerHTML = response[position].director;

            reviewCon.appendChild(clone);
        })
        .catch(function(err) {
            console.log(err);
            const errMessage = document.createElement("p");
            errMessage.textContent = "Oops, something went wrong. It may be your internet connection or it might be us. Please try again later.";
            movieBox.appendChild(errMessage);
        })
    }

    
    getMovies();

}