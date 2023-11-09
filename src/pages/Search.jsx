import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MoviesCard from "../components/ContentCard";
import { BiDownArrow } from 'react-icons/bi';

const searchMovieURL = import.meta.env.VITE_SEARCH_MOVIE;
const searchTvURL = import.meta.env.VITE_SEARCH_TV;
const apiKey = import.meta.env.VITE_API_KEY;
const language = import.meta.env.VITE_LANG;

import './Content.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [singleContent, setSingleContent] = useState(false);
  const [contentType, setContentType] = useState('movie');
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o carregamento
  const query = searchParams.get("q");

  const getSearchedContent = async (url, contentType) => {
    setIsLoading(true); // Inicia o carregamento
    const res = await fetch(url);
    const data = await res.json();

    setContent(oldContent => {
      // Cria um novo conjunto de conteúdo, excluindo quaisquer duplicatas
      const newContent = [...oldContent, ...data.results.map(item => ({ ...item, contentType }))].reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      return newContent;
    });
    setIsLoading(false); // Termina o carregamento
  };

  useEffect(() => {
    if (query !== searchTerm) {
      setContent([]);
      setPage(1);
      setSearchTerm(query);
    }
  }, [query, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
      let url;
      if (contentType === 'movie') {
        url = `${searchMovieURL}?${apiKey}&query=${searchTerm}&language=${language}&page=${page}`;
      } else {
        url = `${searchTvURL}?${apiKey}&query=${searchTerm}&language=${language}&page=${page}`;
      }
      getSearchedContent(url, contentType);
    }
  }, [searchTerm, page, contentType]); // Adicione contentType às dependências do useEffect

  useEffect(() => {
    setSingleContent(content.length === 1);
  }, [content]);

  useEffect(() => {
    if (query.toLowerCase().includes('filme')) {
      setContentType('movie');
    } else if (query.toLowerCase().includes('série')) {
      setContentType('tv');
    }
  }, [query]);

  const handleContentTypeChange = (newContentType) => {
    if (newContentType !== contentType) {
      setContentType(newContentType);
      setContent([]);
      setPage(1);
    }
  };

  const loadMoreContent = () => {
    setPage(oldPage => oldPage + 1);
  };

  let titleText = '';
  if (isLoading) {
    titleText = 'Buscando...';
  } else if (content.length > 0) {
    titleText = 'Resultados para: ';
  } else {
    titleText = 'Nenhum resultados para: ';
  }

  return (
    <div className="container">
      <div className="content">
        <div className="toggle-search">
          <button className={contentType === 'movie' ? 'active' : ''} onClick={() => handleContentTypeChange('movie')} style={contentType === 'movie' ? { color: '#E50914', background: 'transparent' } : {}}>Filmes</button>
          <button className={contentType === 'tv' ? 'active' : ''} onClick={() => handleContentTypeChange('tv')} style={contentType === 'tv' ? { color: '#E50914', background: 'transparent' } : {}}>Séries</button>
        </div>
        <h2 className="title">
          {titleText}
          {!isLoading && <span className="query-text">{query}</span>}
        </h2>
        <div className={`content-container ${singleContent ? 'single-content' : ''}`}>
          {content.length > 0 &&
            content.map((item) => <MoviesCard key={item.id} content={item} contentType={item.contentType} />)}
        </div>
        {content.length > 0 && <button type='button' title='carregar' onClick={loadMoreContent}>Carregar mais<BiDownArrow /></button>}
      </div>
    </div>
  )

}

export default Search
