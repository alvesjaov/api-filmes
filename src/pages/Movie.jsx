import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsPlayFill
} from "react-icons/bs";

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
          <MoviesCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
          {providers && providers.results.BR && (
            <div className="info">
              <h3>
                <BsPlayFill /> Onde assistir:
              </h3>
              {providers?.results?.BR?.flatrate?.map((provider, index) => {
                const logoPath = provider.logo_path;
                const logoUrl = `${logo}${logoPath}`;
                return (
                  <img key={index} className="logo" src={logoUrl} alt="Logo do provedor"
                    title={provider.provider_name} />
                );
              }) || 'Sem provedores disponíveis.'}
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Movie;
