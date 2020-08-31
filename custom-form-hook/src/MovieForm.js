import React, { useState, useEffect } from 'react';
import useMvsiDropdown from './useMvsiDropdown';
import axios from 'axios';

const MovieForm = () => {
  const [genreID, setGenreID] = useState([]);
  const [movies, setMovies] = useState([]);

  const [genre, GenreDropdown] = useMvsiDropdown('Genre', '', genreID);
  const [movie, MovieDropdown, setMovie] = useMvsiDropdown('Movies', '', movies);

  useEffect(() => {
    axios(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=f0f7cf52670158a9cb881c11bc876ddd&language=en-US'
    )
      .then((result) => {
        const genreArr = result.data.genres.map((genre) => genre.id);
        setGenreID(genreArr);
      })
      .catch((error) => console.log(error));
  }, [setGenreID]);

  useEffect(() => {
    axios(
      `https://api.themoviedb.org/3/discover/movie?api_key=f0f7cf52670158a9cb881c11bc876ddd&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_original_language=en`
    )
      .then((result) => {
        const movieArr = result.data.results.map((movie) => movie.title);
        setMovies(movieArr);
        console.log('movies', movieArr);

        console.log('%c' + movie, 'color:hotpink; font-size: 24px');
      })
      .catch((error) => console.log(error));
  }, [genre, movie]);

  return (
    <div className='search-params'>
      <form action=''>
        <GenreDropdown />
        <MovieDropdown />
      </form>
    </div>
  );
};

export default MovieForm;
