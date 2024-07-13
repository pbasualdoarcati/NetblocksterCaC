// validation
const validateLoginForm = () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector("button[type='submit']");
  const isValid =
    usernameInput.value.length > 4 && passwordInput.value.length > 4;
  submitButton.disabled = !isValid;
};

const validateRegisterForm = () => {
  const usernameInput = document.getElementById("regUsername");
  const passwordInput = document.getElementById("regPassword");
  const passwordConfirmInput = document.getElementById("regPasswordConfirm");
  const submitButton = document.querySelector("button[type='submit']");
  const isValid =
    usernameInput.value.length > 4 &&
    passwordInput.value.length > 4 &&
    passwordInput.value === passwordConfirmInput.value;
  submitButton.disabled = !isValid;
};

// handlers
const handleLoginFormSubmit = (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  alert(`Bienvenido, ${username}`);
};

const handleRegisterFormSubmit = (event) => {
  event.preventDefault();
  const username = document.getElementById("regUsername").value;
  alert(`Usuario registrado: ${username}`);
};

const handleAddMovieFormSubmit = (event) => {
  event.preventDefault();
  const movieData = new FormData(document.getElementById("addMovieForm"));

  console.log("Película agregada:", Object.fromEntries(movieData));
  alert("Película agregada");
  document.getElementById("addMovieForm").reset();
};

const addLoginEventListeners = () => {
  document
    .getElementById("username")
    .addEventListener("input", validateLoginForm);
  document
    .getElementById("password")
    .addEventListener("input", validateLoginForm);
  document
    .getElementById("loginForm")
    .addEventListener("submit", handleLoginFormSubmit);
};

const addRegisterEventListeners = () => {
  document
    .getElementById("regUsername")
    .addEventListener("input", validateRegisterForm);
  document
    .getElementById("regPassword")
    .addEventListener("input", validateRegisterForm);
  document
    .getElementById("regPasswordConfirm")
    .addEventListener("input", validateRegisterForm);
  document
    .getElementById("registerForm")
    .addEventListener("submit", handleRegisterFormSubmit);
};

const addMovieFormEventListeners = () => {
  document
    .getElementById("addMovieForm")
    .addEventListener("submit", handleAddMovieFormSubmit);
};

// "dom"
document.addEventListener("DOMContentLoaded", async () => {
  if (document.getElementById("loginForm")) {
    addLoginEventListeners();
  }
  if (document.getElementById("registerForm")) {
    addRegisterEventListeners();
  }
  if (document.getElementById("addMovieForm")) {
    addMovieFormEventListeners();
  }

  const movies = await fetchMovies();
  console.log("MOVIES >> ", movies);

  if (movies) {
    displayTopMoviesDesktop(movies);
    displayCarousel(movies);
    displayMoreMovies(movies);
  } else {
    console.error("No movies data available");
  }

  // if (movies && movies.results) {
  //   displayTopMoviesDesktop(movies);
  //   displayCarousel(movies);
  //   displayMoreMovies(movies);
  // } else {
  //   console.error('No movies data available');
  // }
});

// display
const displayTopMoviesDesktop = (movies) => {
  const moviesContainer = document.getElementById("moviesContainer");
  if (!moviesContainer) {
    console.error("moviesContainer element not found");
    return;
  }

  for (let i = 0; i < 4; i++) {
    const movie = movies[i];
    if (!movie || !movie.imagen) {
      console.error("Invalid movie data:", movie);
      continue;
    }

    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    const card = document.createElement("div");
    card.className = "card movie-card";
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = movie.imagen;
    img.alt = movie.titulo;
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = movie.titulo;

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

const displayCarousel = (movies) => {
  const carouselContainer = document.getElementById("carouselAutoplaying");
  if (!carouselContainer) {
    console.error("carouselContainer element not found");
    return;
  }
  const carouselInner = carouselContainer.querySelector(".carousel-inner");

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    if (!movie || !movie.imagen) {
      console.error("Invalid movie data:", movie);
      continue;
    }

    const carouselItem = document.createElement("div");
    carouselItem.className = i === 0 ? "carousel-item active" : "carousel-item";
    carouselItem.dataset.interval = (i + 1) * 1000;

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = "https://image.tmdb.org/t/p/w500" + movie.imagen;
    img.alt = movie.titulo;
    carouselItem.appendChild(img);
    carouselInner.appendChild(carouselItem);
  }
};

const displayMoreMovies = (movies) => {
  const moreMoviesContainer = document.getElementById("moreMovies");
  if (!moreMoviesContainer) {
    console.error("moreMoviesContainer element not found");
    return;
  }

  for (let i = 5; i < movies.length; i++) {
    const movie = movies[i];
    if (!movie || !movie.imagen) {
      console.error("Invalid movie data:", movie);
      continue;
    }

    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    const card = document.createElement("div");
    card.className = "card movie-card";
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = "placeholder.jpg";
    img.setAttribute("loading", "lazy");
    img.alt = movie.titulo;
    img.dataset.src = "https://image.tmdb.org/t/p/w500" + movie.imagen; // URL de la imagen real
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = movie.titulo;

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
const displayCategories = (categories) => {
  const movieCategorySelect = document.getElementById("movieCategory");
  movieCategorySelect.innerHTML = "";
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    movieCategorySelect.appendChild(option);
  });
};
const displayRating = (rating) => {
  const movieRatingSelect = document.getElementById("movieRating");
  movieRatingSelect.innerHTML = "";
  rating.forEach((rating) => {
    const option = document.createElement("option");
    option.value = rating.id;
    option.textContent = rating.name;
    movieRatingSelect.appendChild(option);
  });
};
// api

const fetchMovies = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/peliscacbackend/peliculas"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null; // Devolvemos null en caso de error
  }
};

// Rest of the functions

let movies;
let categories;
const rating = [
  {
    id: 1,
    name: "PG",
  },
  {
    id: 2,
    name: "PG-13",
  },
  {
    id: 3,
    name: "R",
  },
];
const key =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzQzZTA3M2U1YjJmM2U2NjY5MTI1NTFmMzNlNmMyYyIsInN1YiI6IjYyMGYyODhiN2FkMDhjMDA0MmQxOTRmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LIiJh8XPwHNzf5VXEuK_5cA0jmSBIPYC_WPzVyaeJ_U";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${key}`,
  },
};

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
  options
)
  .then((response) => response.json())
  .then((response) => {
    movies = response;
    displayTopMoviesDesktop();
    displayCarousel();
    displayMoreMovies();
  });

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
  .then((response) => response.json())
  .then((response) => {
    categories = response.genres;
    displayCategories(categories);
    displayRating(rating);
  })
  .catch((err) => console.error(err));

const checkInputLength = () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.querySelector("button[type='submit']");
  const isValid =
    usernameInput.value.length > 4 && passwordInput.value.length > 4;
  submitButton.disabled = !isValid;
};

document.getElementById("username").addEventListener("input", checkInputLength);
document.getElementById("password").addEventListener("input", checkInputLength);

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  alert(`Bienvenido, ${username}`);
});
