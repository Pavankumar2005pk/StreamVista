import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFilm, FiStar, FiCalendar, FiMonitor } from 'react-icons/fi';
import './Page.css';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const features = [
    { icon: <FiFilm />, text: 'Discover trending movies' },
    { icon: <FiStar />, text: 'Explore top-rated content' },
    { icon: <FiCalendar />, text: 'Check upcoming releases' },
    { icon: <FiMonitor />, text: 'Works on all devices' }
  ];

  return (
    <div className="page">
      <header className="page__header">
        <Link to="/" className="back-button">
          <FiArrowLeft /> Back
        </Link>
        <div className="page__title">About StreamVista</div>
      </header>
      <div className="mdetail__section">
        <h2 className="mdetail__section-title">Discover More Movies</h2>
        <div className="mdetail__overview">
          <p>StreamVista helps you explore the world of cinema with ease. Find your next favorite movie today!</p>
          
          <h3>✨ Why Choose Us</h3>
          <p>We make movie discovery simple, fast, and fun. No accounts needed, just start browsing!</p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px',
            margin: '25px 0'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '15px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
                <div style={{ 
                  fontSize: '24px',
                  marginBottom: '10px',
                  color: '#e50914'
                }}>
                  {feature.icon}
                </div>
                <div>{feature.text}</div>
              </div>
            ))}
          </div>
          
          <h3>🎥 Powered by TMDB</h3>
          <p>Movie data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" style={{color: '#e50914'}}>The Movie Database</a>.</p>
          
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <p style={{ color: '#999', fontSize: '0.9em' }}>
              © {new Date().getFullYear()} StreamVista. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
