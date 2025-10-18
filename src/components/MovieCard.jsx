import React from 'react';
import { tmdb } from '../api/tmdb';
import { FaPlay, FaStar } from 'react-icons/fa';
import './MovieCard.css';

function MovieCard({ movie, onClick }) {
  const title = movie?.title || movie?.name || 'Untitled';
  const year = movie?.release_date ? new Date(movie.release_date).getFullYear() : undefined;
  const rating = typeof movie?.vote_average === 'number' ? movie.vote_average.toFixed(1) : null;
  const img = tmdb.images.poster(movie?.poster_path, 'w342');

  return (
    <div
      className="movie-card"
      title={title}
      role="button"
      tabIndex={0}
      aria-label={year ? `${title} (${year})` : title}
      data-id={movie?.id}
      onClick={() => onClick && movie && onClick(movie)}
      onKeyDown={(e) => {
        if (!onClick || !movie) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(movie);
        }
      }}
    >
      {img ? (
        <img className="movie-card__img" src={img} alt={title} loading="lazy" />
      ) : (
        <div className="movie-card__placeholder">No Image</div>
      )}
      
      {/* Play Button */}
      <button 
        className="movie-card__play" 
        aria-label={`Play ${title}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick && movie && onClick(movie);
        }}
      >
        <FaPlay />
      </button>
      
      {/* Card Content */}
      <div className="movie-card__content">
        <h3 className="movie-card__title">{title}</h3>
        <div className="movie-card__meta">
          <div className="movie-card__info">
            {rating && (
              <span className="movie-card__rating">
                <FaStar /> {rating}
              </span>
            )}
            {year && <span className="movie-card__year">{year}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
