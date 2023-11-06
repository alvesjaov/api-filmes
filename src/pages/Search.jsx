import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesCard from "../components/MoviesCard";
import {BiDownArrow}  from 'react-icons/bi';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import './MoviesGrid.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
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
    if (query !== searchTerm) {
      setMovies([]);
      setPage(1);
      setSearchTerm(query);
    }
  }, [query, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      const searchWithQueryURL = `${searchURL}?${apiKey}&query=${searchTerm}&page=${page}`;
      getSearchedMovies(searchWithQueryURL);
    }
  }, [searchTerm, page]);

  const loadMoreMovies = () => {
    setPage(oldPage => oldPage + 1);
  };

  return (
    <div className="container">
      <div className="content">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
          {movies.length > 0 &&
            movies.map((movie) => <MoviesCard key={movie.id} movie={movie} />)}
        </div>
        {movies.length > 0 && <button onClick={loadMoreMovies}>Carregar mais<BiDownArrow/></button>}
      </div>
    </div>
  )
}

export default Search
