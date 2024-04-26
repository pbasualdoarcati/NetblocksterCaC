let movies; 
const key = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzZTA3M2U1YjJmM2U2NjY5MTI1NTFmMzNlNmMyYyIsInN1YiI6IjYyMGYyODhiN2FkMDhjMDA0MmQxOTRmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LIiJh8XPwHNzf5VXEuK_5cA0jmSBIPYC_WPzVyaeJ_U'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${key}`
  }
};

fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(response => response.json())
  .then(response => {
    movies = response;
    displayTopMoviesDesktop();
    displayCarousel();
    displayMoreMovies()
  })
  .catch(err => console.error(err));

  const displayTopMoviesDesktop = () => {
    const moviesContainer = document.getElementById("moviesContainer");
    for (let i = 0; i < 4; i++) {
      const movie = movies.results[i];
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";
      const card = document.createElement("div");
      card.className = "card movie-card";
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
      img.alt = movie.title;
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = movie.title;
  
      cardBody.appendChild(title);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      moviesContainer.appendChild(col);
  
      card.addEventListener("mouseenter", () => {
        title.style.visibility = "visible";
      });
  
      card.addEventListener("mouseleave", () => {
        title.style.visibility = "hidden";
      });
    }
  };
  const displayCarousel = () => {
    const carouselContainer = document.getElementById("carouselAutoplaying");
    const carouselInner = carouselContainer.querySelector(".carousel-inner");
  
    for (let i = 0; i < movies.results.length; i++) {
      const movie = movies.results[i];
      const carouselItem = document.createElement("div");
      carouselItem.className = i === 0 ? "carousel-item active" : "carousel-item";
      carouselItem.dataset.interval = (i + 1) * 1000; 
  
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
      img.alt = movie.title;
      carouselItem.appendChild(img);
      carouselInner.appendChild(carouselItem);
    }
  };

  const displayMoreMovies = () => {
    const moreMoviesContainer = document.getElementById("moreMovies");

    for (let i = 5; i < movies.results.length; i++) {
      const movie = movies.results[i];
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";
      const card = document.createElement("div");
      card.className = "card movie-card";
      const img = document.createElement("img");
      img.className = "card-img-top";
      img.src = "placeholder.jpg"; 
      img.setAttribute("loading", "lazy"); 
      img.alt = movie.title;
      img.dataset.src = "https://image.tmdb.org/t/p/w500" + movie.poster_path; // URL de la imagen real
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = movie.title;
  
      cardBody.appendChild(title);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      moreMoviesContainer.querySelector(".row").appendChild(col);
    }

    const lazyLoadImages = document.querySelectorAll("img[data-src]");
    lazyLoadImages.forEach((lazyImage) => {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.removeAttribute("data-src");
    });
  };

const checkInputLength = () => {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const submitButton = document.querySelector("button[type='submit']");
    const isValid = usernameInput.value.length > 4 && passwordInput.value.length > 4;
    submitButton.disabled = !isValid;
  };
  
  document.getElementById("username").addEventListener("input", checkInputLength);
  document.getElementById("password").addEventListener("input", checkInputLength);
  
  document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault(); 
    const username = document.getElementById("username").value;
    alert(`Bienvenido, ${username}`);
  });