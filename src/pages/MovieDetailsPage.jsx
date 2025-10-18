import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { tmdb } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import './MovieDetailsPage.css';

function Field({ label, children }) {
  if (!children && children !== 0) return null;
  return (
    <div className="mdetail__field">
      <div className="mdetail__label">{label}</div>
      <div className="mdetail__value">{children}</div>
    </div>
  );
}

function MovieDetailsPage({ movieId: propId }) {
  const heroRef = useRef(null);
  const [movieId, setMovieId] = useState(propId || null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [collection, setCollection] = useState(null);
  const [collectionLoading, setCollectionLoading] = useState(false);
  const [collectionError, setCollectionError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Parse id from URL if not provided via props
  useEffect(() => {
    if (propId) { setMovieId(propId); return; }
    const m = window.location.pathname.match(/\/movie\/(\d+)/);
    if (m) setMovieId(m[1]);
  }, [propId]);

  useEffect(() => {
    if (!movieId) return;
    let canceled = false;
    async function load() {
      try {
        setLoading(true);
        setError('');
        setCollection(null);
        setCollectionError('');
        setCollectionLoading(false);
        const d = await tmdb.movies.details(movieId);
        if (!canceled) setData(d);
      } catch (e) {
        if (!canceled) setError(e.message || 'Failed to load details');
      } finally {
        if (!canceled) setLoading(false);
      }
    }
    load();
    return () => { canceled = true; };
  }, [movieId]);

  // Fetch collection details if present
  useEffect(() => {
    let canceled = false;
    async function loadCollection(colId) {
      try {
        setCollectionLoading(true);
        setCollectionError('');
        const c = await tmdb.collections.details(colId);
        if (!canceled) setCollection(c);
      } catch (e) {
        if (!canceled) setCollectionError(e.message || 'Failed to load collection');
      } finally {
        if (!canceled) setCollectionLoading(false);
      }
    }
    const colId = data?.belongs_to_collection?.id;
    if (colId) loadCollection(colId);
    return () => { canceled = true; };
  }, [data?.belongs_to_collection?.id]);

  const poster = useMemo(() => tmdb.images.poster(data?.poster_path, 'w342'), [data]);
  const backdrop = useMemo(() => tmdb.images.backdrop(data?.backdrop_path, 'w1280'), [data]);
  const colPoster = useMemo(() => tmdb.images.poster(data?.belongs_to_collection?.poster_path, 'w342'), [data]);
  const colBackdrop = useMemo(() => tmdb.images.backdrop(data?.belongs_to_collection?.backdrop_path, 'w780'), [data]);

  const currency = (n) => (typeof n === 'number' ? n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }) : null);
  const year = data?.release_date ? new Date(data.release_date).getFullYear() : null;
  const langName = data?.spoken_languages?.[0]?.english_name || data?.original_language?.toUpperCase();
  const countries = data?.production_countries?.map((c) => c.iso_3166_1).join(', ');
  const genres = data?.genres?.map((g) => g.name) || [];
  const isAdult = data?.adult ? '18+' : 'PG';
  const rating = data?.vote_average ? data.vote_average.toFixed(1) : 'N/A';

  const onSelectMovie = (id) => {
    if (!id) return;
    window.history.pushState({}, '', `/movie/${id}`);
    setMovieId(String(id));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add('is-anim');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        }
      });
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">
      <header className="page__header">
        <Link to="/" className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="navbar__logo-svg">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="19" fill="url(#details_paint0_radial)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
              <circle cx="20" cy="20" r="15" fill="url(#details_paint1_radial)" stroke="url(#details_paint2_linear)" strokeWidth="1.5"/>
              <path d="M25 20L17 25.5V14.5L25 20Z" fill="white" fillOpacity="0.9"/>
              <defs>
                <radialGradient id="details_paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20 20) rotate(90) scale(19)">
                  <stop stopColor="#E50914" stopOpacity="0.2"/>
                  <stop offset="1" stopColor="#E50914" stopOpacity="0"/>
                </radialGradient>
                <radialGradient id="details_paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(15 12) rotate(90) scale(14 17.5)">
                  <stop stopColor="#E50914"/>
                  <stop offset="1" stopColor="#B00710"/>
                </radialGradient>
                <linearGradient id="details_paint2_linear" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
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
      </header>

      {loading ? (
        <div className="modal__loading">Loading…</div>
      ) : error ? (
        <div className="modal__error">{error}</div>
      ) : data ? (
        <div className="mdetail">
          <div className="mdetail__breadcrumb">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Home</Link>
            <span className="sep">/</span>
            <span>Movies</span>
            <span className="sep">/</span>
            <span className="current" title={data.title}>{data.title}</span>
          </div>
          <div className="mdetail__hero" ref={heroRef}>
            {backdrop && <div className="mdetail__hero-bg" style={{ backgroundImage: `url(${backdrop})` }} />}
            <div className="mdetail__hero-mask" />
            <div className="mdetail__hero-spotlight" />
            <div className="mdetail__hero-inner">
              {poster ? (
                <img className="mdetail__hero-poster" src={poster} alt={data.title} />
              ) : (
                <div className="mdetail__hero-poster-fallback" aria-label={data.title} />
              )}
              <div className="mdetail__hero-text">
                <h3 className="mdetail__title">{data.title}</h3>
                {data.tagline && <div className="mdetail__tagline">{data.tagline}</div>}
                <div className="mdetail__badges">
                  <span className="badge">{rating} ★</span>
                  {year && <span className="badge">{year}</span>}
                  {data.runtime ? <span className="badge">{data.runtime} min</span> : null}
                  {langName && <span className="badge">{langName}</span>}
                  {countries && <span className="badge">{countries}</span>}
                  <span className="badge badge--age">{isAdult}</span>
                </div>
                {genres.length > 0 && (
                  <div className="chips">
                    {genres.map((g) => (
                      <span key={g} className="chip">{g}</span>
                    ))}
                  </div>
                )}
                <div className="mdetail__actions">
                  <a className="btn btn--primary" href={data.homepage || '#'} target="_blank" rel="noreferrer">Watch</a>
                  {data.imdb_id && (
                    <a className="btn btn--ghost" href={`https://www.imdb.com/title/${data.imdb_id}`} target="_blank" rel="noreferrer">IMDb</a>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mdetail__layout">
            <aside className="mdetail__sidebar">
              <div className="mdetail__section">
                <h4 className="mdetail__section-title">At a glance</h4>
                <div className="kpis">
                  <div className="kpi"><div className="kpi__label">Rating</div><div className="kpi__value">{rating}</div></div>
                  <div className="kpi"><div className="kpi__label">Runtime</div><div className="kpi__value">{data.runtime ? `${data.runtime}m` : '—'}</div></div>
                  <div className="kpi"><div className="kpi__label">Budget</div><div className="kpi__value">{currency(data.budget) || '—'}</div></div>
                  <div className="kpi"><div className="kpi__label">Revenue</div><div className="kpi__value">{currency(data.revenue) || '—'}</div></div>
                  <div className="kpi"><div className="kpi__label">Popularity</div><div className="kpi__value">{typeof data.popularity === 'number' ? Math.round(data.popularity) : '—'}</div></div>
                </div>
              </div>

              <div className="mdetail__section">
                <h4 className="mdetail__section-title">Key facts</h4>
                <div className="mdetail__facts mdetail__facts--stacked">
                  <Field label="Status">{data.status}</Field>
                  <Field label="Release Date">{data.release_date}</Field>
                  <Field label="Original Title">{data.original_title}</Field>
                  <Field label="Origin Country">{data.origin_country?.join(', ')}</Field>
                  <Field label="Languages">{data.spoken_languages?.map((l) => l.english_name).join(', ')}</Field>
                  <Field label="Votes">{data.vote_count?.toLocaleString?.()}</Field>
                </div>
              </div>
            </aside>

            <main className="mdetail__content">
              <div
                className="tabs"
                role="tablist"
                aria-label="Movie details sections"
                onKeyDown={(e) => {
                  const order = ['overview', 'companies'].concat(data?.belongs_to_collection ? ['collection'] : []);
                  const idx = order.indexOf(activeTab);
                  if (e.key === 'ArrowRight') {
                    const next = order[(idx + 1) % order.length];
                    setActiveTab(next);
                    e.preventDefault();
                  } else if (e.key === 'ArrowLeft') {
                    const prev = order[(idx - 1 + order.length) % order.length];
                    setActiveTab(prev);
                    e.preventDefault();
                  }
                }}
              >
                <button className={`tab ${activeTab === 'overview' ? 'is-active' : ''}`} role="tab" aria-selected={activeTab === 'overview'} aria-controls="tab-overview" id="tabbtn-overview" onClick={() => setActiveTab('overview')}>Overview</button>
                <button className={`tab ${activeTab === 'companies' ? 'is-active' : ''}`} role="tab" aria-selected={activeTab === 'companies'} aria-controls="tab-companies" id="tabbtn-companies" onClick={() => setActiveTab('companies')}>Companies</button>
                {data.belongs_to_collection && (
                  <button className={`tab ${activeTab === 'collection' ? 'is-active' : ''}`} role="tab" aria-selected={activeTab === 'collection'} aria-controls="tab-collection" id="tabbtn-collection" onClick={() => setActiveTab('collection')}>Collection</button>
                )}
              </div>

              {activeTab === 'overview' && (
                <div className="mdetail__section" role="tabpanel" id="tab-overview" aria-labelledby="tabbtn-overview">
                  <h4 className="mdetail__section-title">Overview</h4>
                  <p className="mdetail__overview">{data.overview}</p>
                </div>
              )}

              {activeTab === 'companies' && (
                <div className="mdetail__section" role="tabpanel" id="tab-companies" aria-labelledby="tabbtn-companies">
                  <h4 className="mdetail__section-title">Production Companies</h4>
                  <div className="mdetail__companies">
                    {data.production_companies?.map((c) => (
                      <div key={c.id} className="company">
                        {c.logo_path ? (
                          <img src={tmdb.images.poster(c.logo_path, 'w185')} alt={c.name} />
                        ) : (
                          <div className="company__logo-fallback">{c.name[0]}</div>
                        )}
                        <div className="company__name">{c.name}</div>
                        <div className="company__country">{c.origin_country}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'collection' && data.belongs_to_collection && (
                <>
                  <div className="mdetail__section" role="tabpanel" id="tab-collection" aria-labelledby="tabbtn-collection">
                    <h4 className="mdetail__section-title">Collection</h4>
                    <div className="collection">
                      {colBackdrop && <div className="collection__bg" style={{ backgroundImage: `url(${colBackdrop})` }} />}
                      <div className="collection__mask" />
                      {colPoster && <img className="collection__poster" src={colPoster} alt={data.belongs_to_collection.name} />}                    
                      <div className="collection__info">
                        <div className="collection__name">{data.belongs_to_collection.name}</div>
                        <div className="collection__hint">Explore more from this collection on TMDB</div>
                      </div>
                    </div>
                  </div>

                  {collection?.overview && (
                    <div className="mdetail__section">
                      <h4 className="mdetail__section-title">About this Collection</h4>
                      <p className="mdetail__overview">{collection.overview}</p>
                    </div>
                  )}

                  <div className="mdetail__section">
                    <h4 className="mdetail__section-title">More in this Collection</h4>
                    {collectionError && <div className="error">{collectionError}</div>}
                    <div className="movie-row__scroller" style={{ paddingBottom: 8 }}>
                      {(collectionLoading ? Array.from({ length: 6 }) : collection?.parts || []).map((p, idx) => (
                        collectionLoading ? (
                          <div key={idx} className="movie-card" style={{ width: 180 }}>
                            <div className="movie-card__placeholder">Loading…</div>
                            <div className="movie-card__meta"><div className="movie-card__title">&nbsp;</div></div>
                          </div>
                        ) : (
                          <MovieCard key={p.id} movie={p} onClick={() => onSelectMovie?.(p.id)} />
                        )
                      ))}
                    </div>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default MovieDetailsPage;
