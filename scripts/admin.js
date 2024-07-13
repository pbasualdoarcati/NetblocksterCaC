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
    alert("Hubo un error al agregar la pelicula.");
    throw new Error("Error adding movie: " + response.statusText);
  }
};

const deleteMovie = (id) => {
  const url = "http://localhost:8080/peliscacbackend/peliculas";
  const payload = { idPelicula: id };

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text || "Network response was not ok");
        });
      }
      return response.text();
    })
    .then((rawResponse) => {
      alert("Se ha eliminado la pelicula");
      console.log("Pelicula eliminada:", rawResponse);
    })
    .catch((error) => {
      console.error("Error al eliminar la pelicula:", error);
      throw new Error("Error al eliminar la pelicula:" + response.statusText);
    });
};

// Function to add movie to the list in the DOM
const addMovieToList = (movies) => {
  const editMovieModal = new bootstrap.Modal(
    document.getElementById("editMovieModal"),
    {}
  );
  
  const editMovieForm = document.getElementById("editMovieForm");



  const moviesList = document.getElementById("moviesList");

  if (!moviesList) {
    console.error("moviesContainer element not found");
    return;
  }

  editMovieForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // currentEditIndex = i
    let editMovieName = document.getElementById('editMovieName').value;
    let editMovieDescription =  document.getElementById('editMovieYear').value;
    let editMovieYear = document.getElementById('editMovieDescription').value
    
    let editedMovie = {
        // "idPelicula":
        "titulo": editMovieName,
        "synopsis": editMovieDescription,
        "duracion": editMovieYear
    }

    const url = "http://localhost:8080/peliscacbackend/peliculas";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("paso: ", data);
        alert("Se ha editado la pelicula");
        editMovieModal.hide();
        window.location.reload();
      })
      .catch((err) => console.log("error: ", err));
  
    if (!response.ok) {
      alert("Hubo un error al editar la pelicula.");
      throw new Error("Error editando la pelicula: " + response.statusText);
    }

//   post!!!!!!
  });
  

  for (let i = 0; i < 20; i++) {
    const movie = movies[i];
    if (!movie || !movie.imagen) {
      console.error("Invalid movie data:", movie);
      continue;
    }

   

    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.src = movie.imagen;
    img.alt = movie.titulo;
    img.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    cardBody.classList.add("new-card-body", "d-flex", "flex-column");

    const titulo = document.createElement("h5");
    titulo.classList.add("card-title");
    titulo.textContent = movie.titulo;

    const duracion = document.createElement("p");
    duracion.classList.add("card-text");
    duracion.textContent = `Duración: ${movie.duracion}`;

    const synopsis = document.createElement("p");
    synopsis.classList.add("card-text");
    synopsis.textContent = movie.synopsis;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "mr-2");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => {
      moviesList.removeChild(col);
      deleteMovie(movie.idPelicula);
    };

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn", "btn-primary");
    btnEditar.textContent = "Editar";
    btnEditar.onclick = () => {
      document.getElementById("editMovieName").value = movie.titulo;
      document.getElementById("editMovieYear").value = movie.duracion;      
      document.getElementById("editMovieDescription").value = movie.synopsis;

      editMovieModal.show();
    };

    cardBody.appendChild(titulo);
    cardBody.appendChild(duracion);
    cardBody.appendChild(synopsis);
    cardBody.appendChild(btnEliminar);
    cardBody.appendChild(btnEditar);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    moviesList.appendChild(col);
  }
};

// Function to fetch categories and ratings
const fetchCategoriesAndRatings = async () => {
  const categories = [
    { id: 1, name: "Acción" },
    { id: 2, name: "Comedia" },
    { id: 3, name: "Drama" },
    { id: 4, name: "Fantasia" },
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

let currentEditIndex = null;
