import { Link } from "react-router-dom";
import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import defaultImage from '../assets/img/Placeholder.svg'; // Importa a imagem padrão

const imageUrl = import.meta.env.VITE_IMG;
const notImg = defaultImage;

const MoviesCard = ({ movie, showLink = true }) => {
    // Se movie.poster_path for nulo, usa a imagem padrão
    const posterPath = movie.poster_path ? imageUrl + movie.poster_path : notImg;
    const isDefaultImage = posterPath === notImg;

    return (
        <div className="movie-card">
            <img src={posterPath} alt={movie.title} className={isDefaultImage ? "no-events" : ""} />
            <h2>{movie.title}</h2>
            {showLink && (
                <>
                    <p>
                        <FaStar /> {movie.vote_average.toFixed(1)}
                    </p>
                    <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                </>
            )}
        </div>
    );
}

MoviesCard.propTypes = {
    movie: PropTypes.object.isRequired,
    showLink: PropTypes.bool
};

export default MoviesCard;
