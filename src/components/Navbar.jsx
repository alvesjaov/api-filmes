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

                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Pesquise um filme" list="movie-titles"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        ref={inputRef}
                        name="movieSearch"  /* Adicionado atributo name */
                    />
                    <datalist id="movie-titles">
                        {results.map((result) => (
                            <option key={result.id} value={result.title} />
                        ))}
                    </datalist>
                    <button type="submit" title='buscar'>
                        <BiSearchAlt2 />
                    </button>
                </form>
            </nav>
        </div>
    );
}

export default Navbar