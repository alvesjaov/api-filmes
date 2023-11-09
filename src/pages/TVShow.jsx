import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsFillFileEarmarkTextFill,
  BsCalendarFill,
  BsInfoCircle,
  BsPlayFill
} from "react-icons/bs";
import { FaStar } from "react-icons/fa";

import ContentCard from "../components/ContentCard";

import "./Details.css";

const tvShowsURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;
const logo = import.meta.env.VITE_LOGO;
const statusTraduzido = {
  'Ended': 'Finalizada',
  'In Production': 'Em Produção',
  'Canceled': 'Cancelada',
  'Returning Series': 'Retornando',
  'Planned': 'Planejado',
  'Pilot': 'Piloto',
  'Rumored': 'Rumor',
  'Post Production': 'Pós Produção',
  'Released': 'Lançado',
  'In Development': 'Em Desenvolvimento',
  'Pre Production': 'Pré Produção',
  'Running': 'Em exibição'

};

const TVShow = () => {
  const { id } = useParams();
  const [tvShow, setTVShow] = useState(null);
  const [providers, setProviders] = useState(null);

  const getTVShow = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setTVShow(data);
  };

  const getProviders = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    setProviders(data);
  };


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  useEffect(() => {
    const tvShowUrlWithPrams = `${tvShowsURL}${id}?${apiKey}&language=${language}`;
    getTVShow(tvShowUrlWithPrams);
    getProviders(`${tvShowsURL}${id}/watch/providers?${apiKey}`);
  }, [id]);

  const traduzirStatus = (status) => {
    return statusTraduzido[status] || status;
  };

  const numTemporadas = tvShow?.seasons?.filter(season => season.air_date)?.length || 0;
  
  const displayStyle = (value) => {
    const statusList = ['In Production', 'Planned', 'Rumored', 'In Development', 'Pre Production'];
    return (value && !statusList.includes(tvShow.status)) ? 'block' : 'none';
  };
  
  return (
      <div className="content-page">
        {tvShow && (
          <>
            <div className="content-header">
              <ContentCard content={tvShow} showLink={false} />
              <div className="content-details">
                {tvShow.tagline && <p className="tagline">{tvShow.tagline}</p>}
                <div className="content-rating" style={{ display: displayStyle(tvShow.vote_average) }}>
                  <p className="vote"> <FaStar /> {tvShow.vote_average.toFixed(1)} </p>
                </div>
                <div className="info" style={{ display: displayStyle(tvShow.first_air_date) }}>
                  <h3> <BsCalendarFill /> Data de Lançamento:</h3>
                  <p>{formatDate(tvShow.first_air_date)}</p>
                </div>
                <div className="info" style={{ display: displayStyle(tvShow.last_air_date) }}>
                  <h3><BsCalendarFill /> Última Data de Exibição:</h3>
                  <p>{formatDate(tvShow.last_air_date)}</p>
                </div>
                <div className="info" style={{ display: displayStyle(tvShow.number_of_episodes) }}>
                  <h3><BsInfoCircle /> Número de Episódios:</h3>
                  <p>{tvShow.number_of_episodes} Episódios</p>
                </div>
                <div className="info" style={{ display: displayStyle(numTemporadas) }}>
                  <h3><BsInfoCircle /> Número de Temporadas:</h3>
                  <p>{numTemporadas} Temporadas</p>
                </div>
                <div className="info" style={{ display: displayStyle(tvShow.status) }}>
                  <h3><BsInfoCircle /> Estaus da Serie:</h3>
                  <p>{traduzirStatus(tvShow.status)}</p>
                </div>
              </div>
            </div>
            <div className="info description" style={{ display: displayStyle(tvShow.overview) }}>
              <h3><BsFillFileEarmarkTextFill /> Sinopse:</h3>
              <p>{tvShow.overview}</p>
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
  }
  
  export default TVShow;
  