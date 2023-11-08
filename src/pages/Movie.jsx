import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsPlayFill,
  BsCalendar
} from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import MoviesCard from "../components/MoviesCard";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;
const logo = import.meta.env.VITE_LOGO;

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [providers, setProviders] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setMovie(data);
  };

  const getProviders = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setProviders(data);
  };

  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}&language=${language}`;
    getMovie(movieUrl);

    const providersUrl = `${moviesURL}${id}/watch/providers?${apiKey}`;
    getProviders(providersUrl);
  }, [id]);

  return (
    <div className="movie-page">
      {movie && (
        <>
          <div className="movie-header">
            <MoviesCard movie={movie} showLink={false} />
            <div className="movie-details">
              <p className="tagline">{movie.tagline}</p>
              <div className="movie-rating">
                <p className="vote"> <FaStar /> {movie.vote_average.toFixed(1)} </p>
              </div>
              <div className="info">
                <h3> <BsCalendar /> Data de Lançamento:</h3>
                <p>{formatDate(movie.release_date)}</p>
              </div>
              <div className="info">
                <h3><BsWallet2 /> Orçamento:</h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
              <div className="info">
                <h3><BsGraphUp /> Receita:</h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div className="info">
                <h3><BsHourglassSplit /> Duração:</h3>
                <p>{movie.runtime} minutos</p>
              </div>
            </div>
          </div>
          <div className="info description">
            <h3><BsFillFileEarmarkTextFill /> Descrição:</h3>
            <p>{movie.overview}</p>
          </div>
          <div className="info">
            <h3><BsPlayFill /> Onde assistir:</h3>
            <div className="info-provider">
              {providers?.results?.BR?.flatrate?.map((provider) => (
                <div key={provider.provider_id}>
                  <img
                    src={`${logo}${provider.logo_path}`}
                    alt={provider.provider_name}
                    className="logo"
                    title={provider.provider_name}
                  />
                </div>
              )) || "Sem provedores disponíveis."}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Movie;