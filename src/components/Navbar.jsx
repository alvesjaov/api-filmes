import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import Stars from '../../assets/img/Stars.svg';

import './Navbar.css';

const apiKey = import.meta.env.VITE_API_KEY;
const searchUrl = import.meta.env.VITE_SEARCH;
const lang = import.meta.env.VITE_LANG;

function Navbar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const inputRef = useRef();
    const formRef = useRef();
    const [showResults, setShowResults] = useState(false);


    const fetchMovies = async (query) => {
        if (!query) return;
        const response = await fetch(`${searchUrl}?${apiKey}&language=${lang}&query=${query}`);
        const data = await response.json();
        // Cria um objeto para armazenar os títulos dos filmes
        const titles = {};

        // Adiciona cada título ao objeto como uma chave
        data.results.forEach(result => {
            titles[result.title] = result;
        });

        // Converte o objeto de volta para um array
        const uniqueResults = Object.values(titles);

        setResults(uniqueResults);
    }

    useEffect(() => {
        fetchMovies(search);
    }, [search]);

    const handleChange = (e) => {
        const input = e.target.value;
        setSearch(input);
        setShowResults(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearch(suggestion);
        setShowResults(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        navigate(`/search?q=${search}`);
        setTimeout(() => {
            setSearch('');
            setResults([]);
        }, 100);
    }

    return (
        <div>
            <nav id="navbar">
                <h2>
                    <Link to="/">
                        <img src={Stars} alt="Logo" className='bibi-stars' />Space+
                    </Link>
                </h2>
                <div className='form-container'>
                    <form className='on-submit' onSubmit={handleSubmit} ref={formRef}>
                        <div className="input-container">
                            <input type="text" placeholder="Pesquise um filme"
                                onChange={handleChange}
                                value={search}
                                ref={inputRef}
                                name="movieSearch"  /* Adicionado atributo name */
                            />
                        </div>
                        <div className="select-container">
                        <select className={search && showResults ? 'visible' : 'hidden'} size={results.length > 0 ? "5" : "1"}>
                                {results.map((result) => (
                                    <option key={result.id} onClick={() => handleSuggestionClick(result.title)}>
                                        {result.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <div className='button'>
                        <button type="button" title='buscar' onClick={handleSubmit}>
                            <BiSearchAlt2 />
                        </button>

                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Navbar