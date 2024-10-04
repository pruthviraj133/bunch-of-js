const apiKey = 'YOUR_OMDB_API_KEY'; // Replace with your OMDb API key
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

let currentPage = 1;
let totalResults = 0;

// Event listener for form submission
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = searchInput.value;
  currentPage = 1; // Reset to page 1 for a new search
  searchMovies(query, currentPage);
});

// Fetch movies based on search query
function searchMovies(query, page) {
  fetch(`https://www.omdbapi.com/?s=${query}&page=${page}&apikey=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === 'True') {
        totalResults = data.totalResults;
        displayMovies(data.Search);
        updatePagination();
      } else {
        movieList.innerHTML = `<p>No results found.</p>`;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Display movie search results
function displayMovies(movies) {
  movieList.innerHTML = '';
  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');
    movieItem.innerHTML = `
      <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;
    movieList.appendChild(movieItem);
  });
}

// Update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(totalResults / 10); // 10 results per page
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  prevBtn.addEventListener('click', () => changePage(-1));
  nextBtn.addEventListener('click', () => changePage(1));
}

// Change page for pagination
function changePage(direction) {
  const query = searchInput.value;
  currentPage += direction;
  searchMovies(query, currentPage);
}
