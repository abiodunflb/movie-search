$('#searchForm').on('submit', function (e) {
  let searchText = $('#formText').val();
  getMovies(searchText);
  e.preventDefault();
});

function getMovies(searchText) {
  axios
    .get('https://www.omdbapi.com/?apikey=dfa38912&s=' + searchText)
    .then(function (response) {
      console.log(response);

      let movies = response.data.Search;

      let output = '';
      $.each(movies, function (index, movie) {
        output += `
          <div class="col-md-3">
              <div class="well text-center">
                  <img src="${movie.Poster}" alt="">
                  <h5>${movie.Title}</h5>
                  <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
              </div>
          </div>
          
          `;
      });

      $('#movies').html(output);
    })

    .catch(function (err) {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios
    .get('https://www.omdbapi.com/?apikey=dfa38912&i=' + movieId)
    .then(function (response) {
      console.log(response);

      let movie = response.data;
      let output = `
      <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" alt="" class="thumbnail" />
          </div>

          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item">
                <strong>Genre:</strong> ${movie.Genre}
              </li>
              <li class="list-group-item">
                <strong>Released:</strong> ${movie.Released}
              </li>
              <li class="list-group-item">
                <strong>Rated:</strong> ${movie.Rated}
              </li>
              <li class="list-group-item">
                <strong>imdbRating:</strong> ${movie.imdbRating}
              </li>
              <li class="list-group-item">
                <strong>Actors:</strong> ${movie.Actors}
              </li>
              <li class="list-group-item">
                <strong>Writer:</strong> ${movie.Writer}
              </li>
            </ul>
          </div>
        </div>
        
        <div class="row">
        <div class="card-footer">
          <h3>Plot</h3>
          <p>${movie.Plot}</p>
          <hr />

          <a
            href="https://imdb.com/title/${movie.imdbID}"
            target="_blank"
            class="btn btn-primary"
            >View imdB</a
          >

          <a href="index.html" class="btn btn-warning"> Go Back To Search</a>
          </div>
        </div>
      
      `;

      $('#movie').html(output);
    })

    .catch(function (err) {
      console.log(err);
    });
}
