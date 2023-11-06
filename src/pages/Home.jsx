import { useState, useEffect } from 'react';
import MoviesCard from '../components/MoviesCard';
import {BiDownArrow}  from 'react-icons/bi';

import './MoviesGrid.css';

const apiKey = import.meta.env.VITE_API_KEY;
const moviesURL = import.meta.env.VITE_API;
const genreURL = import.meta.env.VITE_GENRE;
const language = import.meta.env.VITE_LANG;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('top_rated');
  const [page, setPage] = useState(1);
  const genreNames = {
    'top_rated': 'Melhores Filmes',
    '28': 'Ação',
    '12': 'Aventura',
    '16': 'Animação',
    '35': 'Comédia',
    '80': 'Crime',
    '99': 'Documentário',
    '18': 'Drama',
    '10751': 'Família',
    '14': 'Fantasia',
    '36': 'História',
    '27': 'Terror',
    '10402': 'Música',
    '9648': 'Mistério',
    '10749': 'Romance',
    '878': 'Ficção científica',
    '10770': 'Cinema TV',
    '53': 'Thriller',
    '10752': 'Guerra',
    '37': 'Faroeste'
  };

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
  
    setMovies(oldMovies => {
      // Cria um novo conjunto de filmes, excluindo quaisquer duplicatas
      const newMovies = [...oldMovies, ...data.results].reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return newMovies;
    });
  };
  

  useEffect(() => {
    const url = genre === 'top_rated' ? `${moviesURL}top_rated?${apiKey}&language=${language}&page=${page}` : `${genreURL}?${apiKey}&with_genres=${genre}&language=${language}&page=${page}`;
  
    getMovies(url);
  }, [genre, page]);

  const handleGenreChange = (newGenre) => {
    if (newGenre !== genre) {
      setMovies([]);
      setPage(1);
      setGenre(newGenre);
    }
  };

  const loadMoreMovies = () => {
    setPage(oldPage => oldPage + 1);
  };


  return (
    <div className="container">
      <div className="content">
        <div className="title-container">
          <select
            name="genre"
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
          >
            {Object.entries(genreNames).map(([value, name]) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <h2 className="title">{genreNames[genre]}</h2>
        <div className="movies-container">
          {movies.length === 0 && <p>Carregando...</p>}
          {movies.length > 0 && movies.map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
        </div>
        {movies.length > 0 && <button onClick={loadMoreMovies}>Carregar mais<BiDownArrow/></button>}
      </div>
    </div>
  );
}

export default Home;
