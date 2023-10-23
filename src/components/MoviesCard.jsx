import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';

const imageUrl = import.meta.env.VITE_IMG;

import PropTypes from 'prop-types';

const MoviesCard = ({ movie, showLink = true }) => {
    return (
        <div className="movie-card">
            <img src={imageUrl + movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>
                <FaStar /> {movie.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>}
        </div>
    );
}

MoviesCard.propTypes = {
    movie: PropTypes.object.isRequired,
    showLink: PropTypes.bool
};

export default MoviesCard;
