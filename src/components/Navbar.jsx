import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import Stars from '../../assets/img/Stars.svg';

import './Navbar.css';

function Navbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef();
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!search) return;
        navigate(`/search?q=${search}`);
        setTimeout(() => {
            setSearch('');
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
                    <div className='on-submit' onSubmit={handleSubmit} ref={formRef}>
                        <div className="input-container">
                            <input type="text" placeholder="Pesquise um filme"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                ref={inputRef}
                                name="movieSearch"  
                            />
                        </div>
                    </div>
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
