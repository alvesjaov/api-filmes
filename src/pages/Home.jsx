import { useState, useEffect, useMemo } from 'react';
import ContentCard from '../components/ContentCard';
import { BiDownArrow } from 'react-icons/bi';

import './Content.css';

const apiKey = import.meta.env.VITE_API_KEY;
const moviesURL = import.meta.env.VITE_API_MOVIE;
const tvURL = import.meta.env.VITE_API_TV;
const genreURL = import.meta.env.VITE_GENRE_MOVIE;
const tvGenreURL = import.meta.env.VITE_GENRE_TV;
const language = import.meta.env.VITE_LANG;

const Home = () => {
  const [content, setContent] = useState([]);
  const [genre, setGenre] = useState('top_rated');
  const [page, setPage] = useState(1);
  const [contentType, setContentType] = useState('movie');
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controlar o carregamento 

  const genres = useMemo(() => ({
    'movie': {
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
    },
    'tv': {
      'top_rated': 'Melhores Séries',
      '10759': 'Ação & Aventura',
      '16': 'Animação',
      '35': 'Comédia',
      '80': 'Crime',
      '99': 'Documentário',
      '18': 'Drama',
      '10751': 'Família',
      '10762': 'Kids',
      '9648': 'Mistério',
      '10763': 'News',
      '10764': 'Reality',
      '10765': 'Sci-Fi & Fantasy',
      '10766': 'Soap',
      '10767': 'Talk',
      '10768': 'War & Politics'
    }
  }), []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getContent = async (url, contentType) => {
      setIsLoading(true); // Inicia o carregamento

      const res = await fetch(url, { signal });
      if (!signal.aborted) {
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
      }
    }

    let url;
    if (contentType === 'movie') {
      url = genre === 'top_rated' ? `${moviesURL}top_rated?${apiKey}&language=${language}&page=${page}` : `${genreURL}?${apiKey}&with_genres=${genre}&language=${language}&page=${page}`;
    } else {
      url = genre === 'top_rated' ? `${tvURL}top_rated?${apiKey}&language=${language}&page=${page}` : `${tvGenreURL}?${apiKey}&with_genres=${genre}&language=${language}&page=${page}`;
    }

    getContent(url, contentType);
  }, [genre, page, contentType]); // Adicione contentType às dependências do useEffect

  const handleContentTypeChange = (newContentType) => {
    if (newContentType !== contentType) {
      setContentType(newContentType);
      setContent([]);
      setPage(1);
      setGenre('top_rated');
    }
  };

  const handleGenreChange = (newGenre) => {
    if (newGenre !== genre) {
      setContent([]);
      setPage(1);
      setGenre(newGenre);
    }
  };

  const loadMoreContent = () => {
    setPage(oldPage => oldPage + 1);
  };
  let titleText = '';
  if (isLoading) {
    titleText = 'Carregando...';
  } else if (content.length > 0) {
    titleText = genres[contentType][genre];
  }

  return (
    <div className='container'>
      <div className='content'>
        <div className='title-container'>
          <div className="toggle">
            <button className={contentType === 'movie' ? 'active-content-type' : ''} onClick={() => handleContentTypeChange('movie')}>Filmes</button>
            <button className={contentType === 'tv' ? 'active-content-type' : ''} onClick={() => handleContentTypeChange('tv')}>Séries</button>
          </div>
          <select
            name='genre'
            value={genre}
            onChange={(e) => handleGenreChange(e.target.value)}
            title='Selecione um gênero'
          >
            {Object.entries(genres[contentType]).map(([value, name]) => (
              <option key={value} value={value}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <h2 className='title'>{titleText}</h2>
        <div className='content-container'>
          {content.length > 0 && content.map((item) => <ContentCard key={item.id} content={item} contentType={item.contentType} />)}
        </div>
        {content.length > 0 && <button type='button' title='carregar' className='carregar-mais' onClick={loadMoreContent}>Carregar mais<BiDownArrow /></button>}
      </div>
    </div>
  );

};

export default Home;
