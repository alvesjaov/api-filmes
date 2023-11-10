import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/img/Placeholder.svg'; // Importa a imagem padrão

const imageUrl = import.meta.env.VITE_IMG;
const notImg = defaultImage;
const ContentCard = ({ content, showLink = true }) => {
    if (!content) {
        return null; // or render some fallback UI
    }

    // Se content.poster_path for nulo, usa a imagem padrão
    const posterPath = content?.poster_path ? imageUrl + content.poster_path : notImg;
    const isDefaultImage = posterPath === notImg;
    const title = content.title || content.name;
    const detailsLink = window.location.origin + `/${content.contentType}/${content.id}`;

    return (
        <div className="movie-card">
            <img src={posterPath} alt={title} className={isDefaultImage ? "no-events" : ""} />
            <h2>{title}</h2>
            {showLink && (
                <>
                    <p>
                        <FaStar /> {content?.vote_average?.toFixed(1)}
                    </p>
                    <a className='details' href={detailsLink}>Ver detalhes</a>
                </>
            )}
        </div>
    );
}

ContentCard.propTypes = {
    content: PropTypes.object.isRequired,
    showLink: PropTypes.bool
};

export default ContentCard;
