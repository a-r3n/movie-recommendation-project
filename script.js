document.addEventListener('DOMContentLoaded', function () {
// Movie genres (numbers are genre identifiers for the TMDb API)
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

// Selects the 'movie-preferences' element via DOM tree
  var selectElement = document.getElementById('movie-preferences');

  // Select element options for genres
  Object.keys(genres).forEach(function (genre) {
    var option = document.createElement('option');
    option.value = genres[genre];
    option.text = genre;
    selectElement.appendChild(option);
  });

// Initially hides the carousel and shows the prompt message 
  var carouselContainer = document.querySelector('.slideshow');
  var promptMessage = document.createElement('p');
  promptMessage.id = 'prompt-message';
  promptMessage.textContent = 'Select a genre to see our movie recommendations';
  carouselContainer.appendChild(promptMessage);

// Hide the carousel initially
  var carousel = document.querySelector('.carousel');
  carousel.style.display = 'none';

// Initialize the carousel
  var carouselElements = document.querySelectorAll('.carousel');
  var carouselOptions = {
// Your carousel options here
  };
  var carouselInstances = M.Carousel.init(carouselElements, carouselOptions);

// Listen for genre selection changes
  selectElement.addEventListener('change', function () {
    var selectedGenreId = this.value;

// Show the carousel and hide the prompt message
    carousel.style.display = 'block';
    promptMessage.style.display = 'none';

    updateCarousel(selectedGenreId);
  });

// Function to update carousel with movies from the selected genre
function updateCarousel(genreId) {
  // API call to MovieDB, filtered for English language movies
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4db37776638550cb726212c6dc2ebd11&with_genres=${genreId}&language=en-US&sort_by=vote_average.desc`)
    .then(response => response.json())
    .then(data => {
      populateCarousel(data.results);
    })
    .catch(error => console.error('Error:', error));
}

// Function to populate carousel with movie data from the API
function populateCarousel(movies) {
  // Clears existing items
  carousel.innerHTML = ''; 

  movies.forEach(movie => {
    if (movie.poster_path && movie.title && movie.overview) {
      var carouselItem = document.createElement('a');
      carouselItem.href = '#!';
      carouselItem.className = 'carousel-item';
      carouselItem.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><span>${movie.title}</span>`;
      carouselItem.onclick = function () {
        showMovieDetails(movie.id);
      };
      carousel.appendChild(carouselItem);
    }
  });

// Reinitialize the carousel with new items
  M.Carousel.init(carouselElements, carouselOptions);
}

// Function to show movie details
function showMovieDetails(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4db37776638550cb726212c6dc2ebd11&language=en-US`)
    .then(response => response.json())
    .then(movie => {
      var detailsContainer = document.getElementById('movie-details');
      detailsContainer.innerHTML = `
        <h4>${movie.title}</h4>
        <p>${movie.overview}</p>
      `;
      // Adds visited movie to shortlist
      addToShortlist(movie);
      // Update the shortlist display 
      displayShortlist(); 
    })
    .catch(error => console.error('Error:', error));
}

// Function to add movie to shortlist in local storage
function addToShortlist(movie) {
  let shortlist = JSON.parse(localStorage.getItem('shortlist')) || [];
  if (!shortlist.some(m => m.id === movie.id)) {
    shortlist.push(movie);
    localStorage.setItem('shortlist', JSON.stringify(shortlist));
  }
}

// Function to display shortlist
function displayShortlist() {
  let shortlist = JSON.parse(localStorage.getItem('shortlist')) || [];
  let shortlistContainer = document.getElementById('shortlist');
  shortlistContainer.innerHTML = '<h4>Your Shortlist</h4>';
  shortlist.forEach(movie => {
    let movieElem = document.createElement('p');
    movieElem.textContent = movie.title;
    movieElem.onclick = function () {
      showMovieDetails(movie.id);
    };
    shortlistContainer.appendChild(movieElem);
  });
}

// Function to clear shortlist
function clearShortlist() {
  localStorage.removeItem('shortlist');
  // Update the shortlist display
  displayShortlist(); 
}

// Event listener for the 'Clear Shortlist' button
var clearButton = document.getElementById('clear-shortlist-btn');
if (clearButton) {
  clearButton.addEventListener('click', clearShortlist);
} else {
  console.error('Clear shortlist button not found');
}

// Call displayShortlist function on page load to show the existing shortlist
displayShortlist();
});
