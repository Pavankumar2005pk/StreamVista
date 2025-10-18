import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Page.css';

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page">
      <header className="page__header">
        <Link to="/" className="back-button">
          <FiArrowLeft /> Back
        </Link>
        <div className="page__title">Privacy Policy</div>
      </header>
      <div className="mdetail__section">
        <h2 className="mdetail__section-title">Your Privacy Matters</h2>
        <div className="mdetail__overview">
          <p>At StreamVista, we respect your privacy. Here's how we handle your information.</p>
          
          <h3>🔍 What We Don't Collect</h3>
          <p>We don't collect personal data. Everything happens in your browser.</p>
          
          <h3>🎬 Movie Data</h3>
          <p>Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" style={{color: '#e50914'}}>TMDB</a>. We're not affiliated with TMDB.</p>
          
          <h3>🍪 No Cookies</h3>
          <p>We don't use cookies or tracking technologies.</p>
          
          <h3>🌐 External Links</h3>
          <p>We link to other sites but can't control their privacy practices.</p>
          
          <h3>📝 Policy Updates</h3>
          <p>We may update this policy. Check back for changes.</p>
          
          <p style={{marginTop: '2rem', color: '#999', fontSize: '0.9em'}}>
            © {new Date().getFullYear()} StreamVista. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
