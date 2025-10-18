import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__top">
          <Link to="/" className="navbar__logo">
            <div className="navbar__logo-svg">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Outer glow */}
                <circle cx="20" cy="20" r="19" fill="url(#paint0_radial_101_2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
                {/* Main circle */}
                <circle cx="20" cy="20" r="15" fill="url(#paint1_radial_101_2)" stroke="url(#paint2_linear_101_2)" strokeWidth="1.5"/>
                {/* Play button */}
                <path d="M25 20L17 25.5V14.5L25 20Z" fill="white" fillOpacity="0.9"/>
                <defs>
                  <radialGradient id="paint0_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(19)">
                    <stop stopColor="#E50914" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#E50914" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="paint1_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 12) rotate(90) scale(14 17.5)">
                    <stop stopColor="#E50914"/>
                    <stop offset="1" stopColor="#B00710"/>
                  </radialGradient>
                  <linearGradient id="paint2_linear_101_2" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9A9E" stopOpacity="0.8"/>
                    <stop offset="1" stopColor="#FAD0C4" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="navbar__logo-content">
              <span className="navbar__logo-text">StreamVista</span>
              <span className="navbar__logo-tagline">Premium Entertainment</span>
            </div>
          </Link>
          
          <nav className="footer__links">
            <Link to="/about" className="footer__link">About</Link>
            <Link to="/privacy" className="footer__link">Privacy Policy</Link>
            <Link to="/terms" className="footer__link">Terms of Use</Link>
          </nav>
        </div>
        
        <div className="footer__meta">
          <span className="footer__tmdb">Data from The Movie Database (TMDB)</span>
          <div className="footer__social" aria-label="Social Links">
            <button 
              type="button" 
              className="footer__icon" 
              aria-label="Twitter" 
              title="Twitter" 
              onClick={() => window.open('https://x.com', '_blank', 'noopener,noreferrer')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 5.92c-.75.33-1.55.55-2.39.65a4.14 4.14 0 0 0 1.82-2.28 8.27 8.27 0 0 1-2.62 1 4.13 4.13 0 0 0-7.04 3.77A11.72 11.72 0 0 1 3 4.9a4.12 4.12 0 0 0 1.28 5.5 4.1 4.1 0 0 1-1.87-.52v.05a4.13 4.13 0 0 0 3.31 4.05 4.16 4.16 0 0 1-1.86.07 4.14 4.14 0 0 0 3.86 2.87A8.3 8.3 0 0 1 2 19.54a11.72 11.72 0 0 0 6.34 1.86c7.61 0 11.77-6.3 11.77-11.77l-.01-.54A8.42 8.42 0 0 0 22 5.92z" 
                fill="#9ca3af"/>
              </svg>
            </button>
            <button 
              type="button" 
              className="footer__icon" 
              aria-label="GitHub" 
              title="GitHub" 
              onClick={() => window.open('https://github.com', '_blank', 'noopener,noreferrer')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.11 2.93.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.74 0 0 .84-.27 2.75 1.05A9.32 9.32 0 0 1 12 7.6c.85 0 1.71.12 2.51.35 1.9-1.32 2.74-1.05 2.74-1.05.55 1.42.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" 
                fill="#9ca3af"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="footer__bottom">
          <div className="footer__copyright-logo">
            <div className="footer__logo-svg">
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" fill="url(#paint0_radial_101_2)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
                <circle cx="20" cy="20" r="15" fill="url(#paint1_radial_101_2)" stroke="url(#paint2_linear_101_2)" strokeWidth="1.5"/>
                <path d="M25 20L17 25.5V14.5L25 20Z" fill="white" fillOpacity="0.9"/>
                <defs>
                  <radialGradient id="paint0_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(19)">
                    <stop stopColor="#E50914" stopOpacity="0.2"/>
                    <stop offset="1" stopColor="#E50914" stopOpacity="0"/>
                  </radialGradient>
                  <radialGradient id="paint1_radial_101_2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 12) rotate(90) scale(14 17.5)">
                    <stop stopColor="#E50914"/>
                    <stop offset="1" stopColor="#B00710"/>
                  </radialGradient>
                  <linearGradient id="paint2_linear_101_2" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9A9E" stopOpacity="0.8"/>
                    <stop offset="1" stopColor="#FAD0C4" stopOpacity="0.2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="footer__copyright-content">
              <span className="footer__copyright-year">© {currentYear}</span>
              <span className="footer__copyright-name">StreamVista</span>
              <span className="footer__copyright-text">All Rights Reserved</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
