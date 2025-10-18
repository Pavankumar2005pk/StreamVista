import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import VirtualMovieRow from './components/VirtualMovieRow';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Footer from './components/Footer';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { tmdb } from './api/tmdb';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailsWrapper />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function MovieDetailsWrapper() {
  const { id } = useParams();
  
  // Hide navbar and footer for movie details page
  useEffect(() => {
    document.body.classList.add('movie-details-page');
    return () => {
      document.body.classList.remove('movie-details-page');
    };
  }, []);
  
  return <MovieDetailsPage movieId={id} />;
}

function HomePage() {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        const [np, pop, tr, up] = await Promise.all([
          tmdb.movies.nowPlaying(1),
          tmdb.movies.popular(1),
          tmdb.movies.topRated(1),
          tmdb.movies.upcoming(1),
        ]);
        if (!cancelled) {
          setNowPlaying(np.results || []);
          setPopular(pop.results || []);
          setTopRated(tr.results || []);
          setUpcoming(up.results || []);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const navigateToMovie = (id) => {
    if (!id) return;
    navigate(`/movie/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroMovie = useMemo(() => {
    const pickWithBackdrop = (arr) => (arr || []).find((m) => m && m.backdrop_path) || (arr || [])[0];
    return pickWithBackdrop(popular) || pickWithBackdrop(nowPlaying) || null;
  }, [popular, nowPlaying]);

  return (
    <>
      <Hero 
        movie={heroMovie} 
        movies={popular.length ? popular : nowPlaying} 
        onMoreInfo={(m) => m && m.id && navigateToMovie(m.id)} 
      />
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div className="loading">Loading…</div>
      ) : (
        <div className="movie-rows">
          <VirtualMovieRow id="now-playing" title="Now Playing" movies={nowPlaying} onSelect={(m) => m && m.id && navigateToMovie(m.id)} />
          <VirtualMovieRow id="popular" title="Popular" movies={popular} onSelect={(m) => m && m.id && navigateToMovie(m.id)} />
          <VirtualMovieRow id="top-rated" title="Top Rated" movies={topRated} onSelect={(m) => m && m.id && navigateToMovie(m.id)} />
          <VirtualMovieRow id="upcoming" title="Upcoming" movies={upcoming} onSelect={(m) => m && m.id && navigateToMovie(m.id)} />
        </div>
      )}
    </>
  );
}

export default App;
