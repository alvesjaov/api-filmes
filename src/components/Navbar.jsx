import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearchAlt2 } from 'react-icons/bi';
import Stars from '../../assets/img/Stars.svg';

import './Navbar.css';

function Navbar() {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

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
                        <img src={Stars} alt="Logo" className='bibi-stars'/>Space+
                    </Link>
                </h2>
                <div className='form-container'>
                    <form className='on-submit' onSubmit={handleSubmit}>
                        <div className="input-container">
                             <input type="text" placeholder="Pesquise um filme ou série"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                name="movieSearch"  
                            />
                        </div>
                    </form>
                    <div className='button'>
                        <button type="submit" title='buscar' onClick={handleSubmit}>
                            <BiSearchAlt2 />
                        </button>
                    </div>
                </div>
            </nav >
        </div >
    );
}

export default Navbar
