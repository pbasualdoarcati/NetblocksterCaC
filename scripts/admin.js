// Validation function for the add movie form
const validateAddMovieForm = () => {
    const movieNameInput = document.getElementById("movieName");
    const movieYearInput = document.getElementById("movieYear");
    const movieRatingSelect = document.getElementById("movieRating");
    const movieCategorySelect = document.getElementById("movieCategory");
    const movieDescriptionInput = document.getElementById("movieDescription");
    const movieImageInput = document.getElementById("movieImage");
    const submitButton = document.querySelector("button[type='submit']");
    
    const isValid = movieNameInput.value.trim() !== "" &&
                    movieYearInput.value.trim() !== "" &&
                    movieRatingSelect.value.trim() !== "" &&
                    movieCategorySelect.value.trim() !== "" &&
                    movieDescriptionInput.value.trim() !== "" &&
                    movieImageInput.files.length > 0;
    
    submitButton.disabled = !isValid;
};

// Function to handle form submission
const handleAddMovieFormSubmit = (event) => {
    event.preventDefault();
    const movieData = new FormData(document.getElementById("addMovieForm"));
    
    // Convert FormData to a regular object
    const movieObject = {};
    movieData.forEach((value, key) => {
        movieObject[key] = value;
    });

    // Example to show movie data in console
    console.log('Película agregada:', movieObject);
    alert('Película agregada');
    
    // Here you should send movieObject to your backend server
    // For now, just add it to the list of movies
    addMovieToList(movieObject);
    
    document.getElementById("addMovieForm").reset();
    validateAddMovieForm(); // Revalidate form after reset
};

// Function to add movie to the list in the DOM
const addMovieToList = (movie) => {
    const moviesList = document.getElementById("moviesList");
    
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    
    const card = document.createElement("div");
    card.className = "card movie-card";
    
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = movie.movieImage; // Assuming the file is already uploaded and you have the URL
    img.alt = movie.movieName;
    
    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = movie.movieName;
    
    const year = document.createElement("p");
    year.className = "card-text";
    year.innerHTML = `<strong>Año:</strong> ${movie.movieYear}`;
    
    const rating = document.createElement("p");
    rating.className = "card-text";
    rating.innerHTML = `<strong>Clasificación:</strong> ${movie.movieRating}`;
    
    const category = document.createElement("p");
    category.className = "card-text";
    category.innerHTML = `<strong>Categoría:</strong> ${movie.movieCategory}`;
    
    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = movie.movieDescription;
    
    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger mt-3";
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = () => {
        moviesList.removeChild(col);
    };
    
    cardBody.appendChild(title);
    cardBody.appendChild(year);
    cardBody.appendChild(rating);
    cardBody.appendChild(category);
    cardBody.appendChild(description);
    cardBody.appendChild(deleteButton);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);
    
    moviesList.appendChild(col);
};

// Function to fetch categories and ratings
const fetchCategoriesAndRatings = async () => {
    const categories = [
        { id: 1, name: "Acción" },
        { id: 2, name: "Comedia" },
        { id: 3, name: "Drama" },
        { id: 4, name: "Fantasía" },
        { id: 5, name: "Terror" }
    ];
    
    const ratings = [
        { id: 1, name: "G" },
        { id: 2, name: "PG" },
        { id: 3, name: "PG-13" },
        { id: 4, name: "R" },
        { id: 5, name: "NC-17" }
    ];
    
    displayCategories(categories);
    displayRatings(ratings);
};

// Function to display categories
const displayCategories = (categories) => {
    const movieCategorySelect = document.getElementById("movieCategory");
    movieCategorySelect.innerHTML = "";
    categories.forEach(category => {
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
    ratings.forEach(rating => {
        const option = document.createElement("option");
        option.value = rating.id;
        option.textContent = rating.name;
        movieRatingSelect.appendChild(option);
    });
};

// Event listener for form validation
document.getElementById("addMovieForm").addEventListener("input", validateAddMovieForm);

// Event listener for form submission
document.getElementById("addMovieForm").addEventListener("submit", handleAddMovieFormSubmit);

// Fetch categories and ratings on DOMContentLoaded
document.addEventListener("DOMContentLoaded", fetchCategoriesAndRatings);
