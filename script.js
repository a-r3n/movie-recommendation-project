document.addEventListener('DOMContentLoaded', function() {
  // Movie genres
  var genres = {
    "Action": 28,
    "Adventure": 12,
    "Comedy": 35,
    "Drama": 18,
    "Fantasy": 14,
    "Horror": 27,
    "Mystery": 9648,
    "Romance": 10749,
    "Sci-Fi": 878,
    "Animation": 16
  };

  // Select the 'movie-preferences' element
  var selectElement = document.getElementById('movie-preferences');

  // Populate the select element with options
  Object.keys(genres).forEach(function(genre) {
      var option = document.createElement('option');
      option.value = genres[genre];
      option.text = genre;
      selectElement.appendChild(option);
  });

  // Listen for genre selection changes
  selectElement.addEventListener('change', function() {
      var selectedGenreId = this.value;
      updateCarousel(selectedGenreId);
  });

  // Initialize the carousel
  var carouselElements = document.querySelectorAll('.carousel');
  var carouselOptions = {
      // Your carousel options here
  };
  var carouselInstances = M.Carousel.init(carouselElements, carouselOptions);

  // Function to update carousel with movies from the selected genre
  function updateCarousel(genreId) {
      // API call to MovieDB
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4db37776638550cb726212c6dc2ebd11&with_genres=${genreId}&sort_by=vote_average.desc`)
          .then(response => response.json())
          .then(data => {
              populateCarousel(data.results);
          })
          .catch(error => console.error('Error:', error));
  }

  // Function to populate carousel with movie data
  function populateCarousel(movies) {
      var carousel = document.querySelector('.carousel');
      carousel.innerHTML = ''; // Clear existing items

      movies.forEach(movie => {
          var carouselItem = document.createElement('a');
          carouselItem.href = '#!';
          carouselItem.className = 'carousel-item';
          carouselItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><span>${movie.title}</span>`;
          carousel.appendChild(carouselItem);
      });

      // Reinitialize the carousel with new items
      M.Carousel.init(carouselElements, carouselOptions);
  }
});

// Function to populate carousel with movie data
function populateCarousel(movies) {
  var carousel = document.querySelector('.carousel');
  carousel.innerHTML = ''; // Clear existing items

  movies.forEach(movie => {
    var carouselItem = document.createElement('a');
    carouselItem.href = '#!';
    carouselItem.className = 'carousel-item';
    carouselItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><span>${movie.title}</span>`;
    carouselItem.onclick = function() { showMovieDetails(movie.id); }; // Attach click event
    carousel.appendChild(carouselItem);
  });

  // Reinitialize the carousel with new items
  M.Carousel.init(carouselElements, carouselOptions);
}

// Function to show movie details
function showMovieDetails(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4db37776638550cb726212c6dc2ebd11`)
    .then(response => response.json())
    .then(movie => {
      var detailsContainer = document.getElementById('movie-details');
      detailsContainer.innerHTML = `
        <h4>${movie.title}</h4>
        <p>${movie.overview}</p>
        <!-- Add more movie details here as needed -->
      `;
      // Additional styling or actions
    })
    .catch(error => console.error('Error:', error));
}
