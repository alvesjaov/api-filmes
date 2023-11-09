import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsCurrencyDollar,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsPlayFill,
  BsCalendarFill
} from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import ContentCard from "../components/ContentCard";

import "./Details.css";

const moviesURL = import.meta.env.VITE_API_MOVIE;
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
    return number ? number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }) : 'Não há informações disponíveis.';
  };
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  
  useEffect(() => {
    const movieURLWithParams = `${moviesURL}${id}?${apiKey}&language=${language}`;
    getMovie(movieURLWithParams);
    getProviders(`${moviesURL}${id}/watch/providers?${apiKey}`);
  }, [id]);
  
    
  const displayStyle = (value) => {
    return value ? 'block' : 'none';
  };
  
  return (
      <div className="content-page">
        {movie && (
          <>
            <div className="content-header">
              <ContentCard content={movie} showLink={false} />
              <div className="content-details">
                <p className="tagline" style={{ display: displayStyle(movie.tagline) }}>{movie.tagline}</p>
                <div className="content-rating" style={{ display: displayStyle(movie.vote_average) }}>
                  <p className="vote"> <FaStar /> {movie.vote_average.toFixed(1)} </p>
                </div>
                <div className="info" style={{ display: displayStyle(movie.release_date) }}>
                  <h3> <BsCalendarFill /> Data de Lançamento:</h3>
                  <p>{formatDate(movie.release_date)}</p>
                </div>
                <div className="info" style={{ display: displayStyle(movie.budget) }}>
                  <h3><BsCurrencyDollar /> Orçamento:</h3>
                  <p>{formatCurrency(movie.budget)}</p>
                </div>
                <div className="info" style={{ display: displayStyle(movie.revenue) }}>
                  <h3><BsGraphUp /> Receita:</h3>
                  <p>{formatCurrency(movie.revenue)}</p>
                </div>
                <div className="info" style={{ display: displayStyle(movie.runtime) }}>
                  <h3><BsHourglassSplit /> Duração:</h3>
                  <p>{movie.runtime} minutos</p>
                </div>
              </div>
            </div>
            <div className="info description" style={{ display: displayStyle(movie.overview) }}>
              <h3><BsFillFileEarmarkTextFill /> Descrição:</h3>
              <p>{movie.overview}</p>
            </div>
            <div className="info" style={{ display: displayStyle(providers?.results?.BR?.flatrate?.length) }}>
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
  