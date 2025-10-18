import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setShowMobileMenu(false);
    }
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
    if (showSearch) setShowSearch(false);
  };

  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu if open
      if (showMobileMenu) {
        setShowMobileMenu(false);
      }
      // Scroll to section with smooth behavior
      window.scrollTo({
        top: sectionId === 'home' ? 0 : element.offsetTop - 80, // Adjust for header height
        behavior: 'smooth'
      });
      // Update URL without page reload
      window.history.pushState({}, '', `#${sectionId}`);
    }
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <div className="navbar__left">
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
          
          <nav className="navbar__desktop-nav">
            <Link 
              to="/" 
              className="navbar__nav-item navbar__nav-button" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                if (showMobileMenu) setShowMobileMenu(false);
              }}
            >
              <span>Home</span>
            </Link>
            <a href="#now-playing" className="navbar__nav-item" onClick={(e) => scrollToSection('now-playing', e)}>
              <span>Now Playing</span>
            </a>
            <a href="#popular" className="navbar__nav-item" onClick={(e) => scrollToSection('popular', e)}>
              <span>Popular</span>
            </a>
            <a href="#top-rated" className="navbar__nav-item" onClick={(e) => scrollToSection('top-rated', e)}>
              <span>Top Rated</span>
            </a>
            <a href="#upcoming" className="navbar__nav-item" onClick={(e) => scrollToSection('upcoming', e)}>
              <span>Upcoming</span>
              <span className="navbar__badge">NEW</span>
            </a>
          </nav>
        </div>

        <div className="navbar__right">
          <button 
            className="navbar__search-toggle" 
            onClick={toggleSearch}
            aria-label={showSearch ? 'Close search' : 'Open search'}
          >
            <svg className="navbar__search-icon" viewBox="0 0 24 24" fill="none">
              <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          <button className="navbar__subscribe-btn">
            <span>Subscribe</span>
          </button>
          
          <div className="navbar__profile">
            <div className="navbar__avatar">
              <span>U</span>
            </div>
          </div>
          
          <button 
            className={`navbar__hamburger ${showMobileMenu ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
            aria-expanded={showMobileMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div className={`navbar__search-container ${showSearch ? 'active' : ''}`}>
          <div className="navbar__search-box">
            <input
              type="text"
              placeholder="Search for Movies, TV Shows, etc."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
            />
            <button className="navbar__search-close" onClick={toggleSearch}>
              <svg viewBox="0 0 24 24" fill="none" className="navbar__search-close-icon">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className={`navbar__mobile-menu ${showMobileMenu ? 'active' : ''}`}>
        <div className="navbar__mobile-menu-header">
          <div className="navbar__mobile-avatar">
            <span>U</span>
          </div>
          <span className="navbar__mobile-login">Login / Sign Up</span>
        </div>
        <nav className="navbar__mobile-nav">
          <Link 
            to="/" 
            className="navbar__mobile-nav-item navbar__nav-button" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setShowMobileMenu(false);
            }}
          >
            <span>Home</span>
          </Link>
          <a href="#now-playing" className="navbar__mobile-nav-item" onClick={(e) => scrollToSection('now-playing', e)}>
            <span>Now Playing</span>
          </a>
          <a href="#popular" className="navbar__mobile-nav-item" onClick={(e) => scrollToSection('popular', e)}>
            <span>Popular</span>
          </a>
          <a href="#top-rated" className="navbar__mobile-nav-item" onClick={(e) => scrollToSection('top-rated', e)}>
            <span>Top Rated</span>
          </a>
          <a href="#upcoming" className="navbar__mobile-nav-item" onClick={(e) => scrollToSection('upcoming', e)}>
            <span>Upcoming</span>
            <span className="navbar__badge">NEW</span>
          </a>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
