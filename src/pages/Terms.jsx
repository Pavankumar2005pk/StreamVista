import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './Page.css';

export default function Terms() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page">
      <header className="page__header">
        <Link to="/" className="back-button">
          <FiArrowLeft /> Back
        </Link>
        <div className="page__title">Terms of Use</div>
      </header>
      <div className="mdetail__section">
        <h2 className="mdetail__section-title">StreamVista Terms</h2>
        <div className="mdetail__overview">
          <p>Welcome to StreamVista! By using our service, you agree to these terms.</p>
          
          <h3>📝 Your Agreement</h3>
          <p>Using StreamVista means you accept these terms. If you don't agree, please don't use our service.</p>
          
          <h3>🎬 Content Usage</h3>
          <p>Movie data is provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" style={{color: '#e50914'}}>TMDB</a>. We're not affiliated with TMDB.</p>
          
          <h3>🔒 Your Responsibility</h3>
          <p>Use StreamVista legally and respectfully. Don't misuse our service or its content.</p>
          
          <h3>⚖️ Service Disclaimer</h3>
          <p>StreamVista is provided "as is" without any warranties. We're not responsible for any issues that may arise.</p>
          
          <h3>🔄 Updates</h3>
          <p>We may update these terms. Continued use means you accept the changes.</p>
          
          <p style={{marginTop: '2rem', color: '#999', fontSize: '0.9em'}}>
            &copy; {new Date().getFullYear()} StreamVista. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
