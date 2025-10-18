import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { tmdb } from '../api/tmdb';
import { FaPlay, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Hero.css';

function Hero({ movie, movies = [], onMoreInfo }) {
  // Backward compatibility: if only a single movie prop is provided, use that as the sole slide.
  const slides = useMemo(() => {
    const list = (movies && movies.length ? movies : movie ? [movie] : [])
      .filter((m) => m && (m.backdrop_path || m.poster_path));
    // Shuffle to get random order initially
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5); // Show 5 featured items
  }, [movie, movies]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const contentRef = useRef(null);

  const go = useCallback((delta) => {
    // Add fade-out class
    if (contentRef.current) {
      contentRef.current.classList.add('fade-out');
    }
    
    // Wait for fade out to complete before changing the slide
    setTimeout(() => {
      setIndex((i) => (i + delta + slides.length) % slides.length);
      
      // Remove fade-out and add fade-in class after a short delay
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.classList.remove('fade-out');
          contentRef.current.classList.add('fade-in');
          
          // Remove fade-in class after animation completes
          setTimeout(() => {
            if (contentRef.current) {
              contentRef.current.classList.remove('fade-in');
            }
          }, 500);
        }
      }, 50);
    }, 300);
  }, [slides.length]);

  useEffect(() => {
    if (!slides.length) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!paused) go(1);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [slides, paused, go]);

  const current = slides[index];
  if (!current) return null;


  const bgImage = current.backdrop_path 
    ? tmdb.images.backdrop(current.backdrop_path, 'original')
    : tmdb.images.poster(current.poster_path, 'original');

  // Get year from release date
  const year = current.release_date ? new Date(current.release_date).getFullYear() : '';
  
  // Get genres (if available)
  const genres = current.genre_ids?.map(id => {
    // You would need to map genre_ids to genre names using your genres data
    // This is a simplified example
    const genreMap = {
      28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
      80: 'Crime', 18: 'Drama', 10751: 'Family', 14: 'Fantasy',
      36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery',
      10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller', 10752: 'War', 37: 'Western'
    };
    return genreMap[id] || '';
  }).filter(Boolean).slice(0, 2).join(' • ');

  return (
    <section 
      className="hero" 
      onMouseEnter={() => setPaused(true)} 
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image */}
      <div 
        className="hero__bg"
        style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 100%), url(${bgImage})` }}
      >
        <div className="hero__gradient-overlay" />
      </div>
      
      {/* Content */}
      <div className="hero__content" ref={contentRef}>
        <div className="container">
          <div className="hero__info">
            <h1 className="hero__title">{current.title || current.name}</h1>
            
            <div className="hero__meta">
              {year && <span className="hero__year">{year}</span>}
              {genres && <span className="hero__genres">{genres}</span>}
              <span className="hero__rating">
                <span className="hero__rating-icon">★</span> 
                {current.vote_average ? current.vote_average.toFixed(1) : 'N/A'}/10
              </span>
            </div>
            
            <p className="hero__overview">
              {current.overview?.length > 200 
                ? `${current.overview.substring(0, 200)}...` 
                : current.overview}
            </p>
            
            <div className="hero__actions">
              <button 
                className="hero__btn hero__btn--play"
                onClick={() => onMoreInfo?.(current, 'play')}
              >
                <FaPlay className="hero__btn-icon" />
                <span>Watch Now</span>
              </button>
              
              <button 
                className="hero__btn hero__btn--info"
                onClick={() => onMoreInfo?.(current, 'info')}
              >
                <FaInfoCircle className="hero__btn-icon" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button 
            className="hero__nav hero__nav--prev" 
            onClick={() => go(-1)}
            aria-label="Previous slide"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            className="hero__nav hero__nav--next" 
            onClick={() => go(1)}
            aria-label="Next slide"
          >
            <FaChevronRight />
          </button>
          
          {/* Dots Indicator */}
          <div className="hero__dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Hero;
