document.addEventListener("DOMContentLoaded", () => {
    // Datos de ejemplo para una película
    const movie = {
      title: "Godzilla y Kong: El nuevo imperio",
      poster_path: "/assets/movie1.jpg",
      description: "Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida escondida dentro de nuestro mundo. La nueva y épica película profundizará en las historias de estos titanes, sus orígenes y los misterios de Isla Calavera y más allá, mientras descubre la batalla mítica que ayudó a forjar a estos seres extraordinarios y los unió a la humanidad para siempre.",
      year: 2024,
      rating: "PG-13",
      category: "Acción"
    };
  
    // Asignar los datos de la película a los elementos HTML
    document.getElementById("moviePoster").src = movie.poster_path;
    document.getElementById("moviePoster").alt = movie.title;
    document.getElementById("movieTitle").textContent = movie.title;
    document.getElementById("movieDescription").textContent = movie.description;
    document.getElementById("movieYear").textContent = movie.year;
    document.getElementById("movieRating").textContent = movie.rating;
    document.getElementById("movieCategory").textContent = movie.category;
  });