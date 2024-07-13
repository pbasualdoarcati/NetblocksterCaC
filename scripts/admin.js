// Validation function for the add movie form
const validateAddMovieForm = () => {
  const movieNameInput = document.getElementById("movieName");
  const movieYearInput = document.getElementById("movieYear");
  const movieRatingSelect = document.getElementById("movieRating");
  const movieCategorySelect = document.getElementById("movieCategory");
  const movieDescriptionInput = document.getElementById("movieDescription");
  const movieImageInput = document.getElementById("movieImage");
  const submitButton = document.querySelector("button[type='submit']");

  const isValid =
    movieNameInput.value.trim() !== "" &&
    movieYearInput.value.trim() !== "" &&
    movieRatingSelect.value.trim() !== "" &&
    movieCategorySelect.value.trim() !== "" &&
    movieDescriptionInput.value.trim() !== "" &&
    movieImageInput.files.length > 0;

  submitButton.disabled = !isValid;
};

const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
//fetch de peliculas
let myMovies;

const fetchMovies = async () => {
  const url = "http://localhost:8080/peliscacbackend/peliculas";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  });
  const data = await response.json();
  return data;
};

// Function to handle form submission
const handleAddMovieFormSubmit = async (event) => {
  event.preventDefault();
  const movieData = new FormData(document.getElementById("addMovieForm"));

  const movieImageInput = document.getElementById("movieImage");
  const imageFile = movieImageInput.files[0];
  const base64Image = await toBase64(imageFile);
  const movieObject = {};
  movieData.forEach((value, key) => {
    if (key === "movieImage") {
      movieObject[key] = base64Image;
    } else {
      movieObject[key] = value;
    }
  });

  const movie = {
    titulo: movieData.get("movieName"),
    duracion: movieData.get("movieYear"),
    imagen:
      "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    synopsis: movieData.get("movieDescription"),
    idDirector: 12890,
  };

  const url = "http://localhost:8080/peliscacbackend/peliculas";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("paso: ", data);
      alert("Se ha agregado la pelicula");
      window.location.reload();
    })
    .catch((err) => console.log("error: ", err));

  if (!response.ok) {
    alert("Hubo un error al agregar la película.");
    throw new Error("Error adding movie: " + response.statusText);
  }
};
const deleteMovie = async (id) => {
  const url = "http://localhost:8080/peliscacbackend/peliculas";
  const options = {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idPelicula: id }),
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Pelicula eliminada:", data);
      // Actualizar la lista de películas en la interfaz de usuario
    })
    .catch((error) => {
      console.error("Error al eliminar la película:", error);
    });
};

// Function to add movie to the list in the DOM
const addMovieToList = (movies) => {
  const moviesList = document.getElementById("moviesList");

  if (!moviesList) {
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

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger mt-3";
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = () => {
      moviesList.removeChild(col);
      deleteMovie(movie.idPelicula);
    };
    cardBody.appendChild(deleteButton);
    cardBody.appendChild(title);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    moviesList.appendChild(col);
  }

  //   const col = document.createElement("div");
  //   col.className = "col-md-3 mb-4";

  //   const card = document.createElement("div");
  //   card.className = "card movie-card";

  //   const img = document.createElement("img");
  //   img.className = "card-img-top";
  //   img.src = movies.imagen ?? "SIN IMAGEN"; // Assuming the file is already uploaded and you have the URL
  //   img.alt = movies.titulo;

  //   const cardBody = document.createElement("div");
  //   cardBody.className = "card-body";

  //   const title = document.createElement("h5");
  //   title.className = "card-title";
  //   title.textContent = movies.titulo;

  //   const rating = document.createElement("p");
  //   rating.className = "card-text";
  //   rating.innerHTML = `<strong>Clasificación:</strong> 9`;

  //   const category = document.createElement("p");
  //   category.className = "card-text";
  //   category.innerHTML = `<strong>Categoría:</strong> accion`;

  //   const description = document.createElement("p");
  //   description.className = "card-text";
  //   description.textContent = movies.synopsis;

  //   cardBody.appendChild(title);
  //   cardBody.appendChild(year);
  //   cardBody.appendChild(rating);
  //   cardBody.appendChild(category);
  //   cardBody.appendChild(description);
  //   cardBody.appendChild(deleteButton);
  //   card.appendChild(img);
  //   card.appendChild(cardBody);
  //   col.appendChild(card);

  //   moviesList.appendChild(col);
};

// Function to fetch categories and ratings
const fetchCategoriesAndRatings = async () => {
  const categories = [
    { id: 1, name: "Acción" },
    { id: 2, name: "Comedia" },
    { id: 3, name: "Drama" },
    { id: 4, name: "Fantasía" },
    { id: 5, name: "Terror" },
  ];

  const ratings = [
    { id: 1, name: "G" },
    { id: 2, name: "PG" },
    { id: 3, name: "PG-13" },
    { id: 4, name: "R" },
    { id: 5, name: "NC-17" },
  ];

  displayCategories(categories);
  displayRatings(ratings);
};

// Function to display categories
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

// Function to display ratings
const displayRatings = (ratings) => {
  const movieRatingSelect = document.getElementById("movieRating");
  movieRatingSelect.innerHTML = "";
  ratings.forEach((rating) => {
    const option = document.createElement("option");
    option.value = rating.id;
    option.textContent = rating.name;
    movieRatingSelect.appendChild(option);
  });
};

// Event listener for form validation
document
  .getElementById("addMovieForm")
  .addEventListener("input", validateAddMovieForm);

// Event listener for form submission
document
  .getElementById("addMovieForm")
  .addEventListener("submit", handleAddMovieFormSubmit);

// Fetch categories and ratings on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchCategoriesAndRatings);

document.addEventListener("DOMContentLoaded", async () => {
  const movies = await fetchMovies();
  if (movies) {
    addMovieToList(movies);
  } else {
    console.log("NO MOVIE DATA");
  }
});
