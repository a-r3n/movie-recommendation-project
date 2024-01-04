document.addEventListener('DOMContentLoaded', function() {
    // Movie genres
    var genres = [
      "Action",
      "Adventure",
      "Comedy",
      "Drama",
      "Fantasy",
      "Horror",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Animation"
    ];
  
    // Select the 'movie-preferences' element
    var selectElement = document.getElementById('movie-preferences');
  
    // Populate the select element with options
    genres.forEach(function(genre) {
        var option = document.createElement('option');
        option.value = genre;
        option.text = genre;
        selectElement.appendChild(option);
      });
  
    // Initialize the carousel if needed
    var carouselElements = document.querySelectorAll('.carousel');
    if (carouselElements.length > 0) {
      var carouselOptions = {
        // Your carousel options here
      };
      var carouselInstances = M.Carousel.init(carouselElements, carouselOptions);
    }
  });