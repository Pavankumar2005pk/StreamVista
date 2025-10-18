// TMDB API Configuration
const TMDB_BASE_URL = process.env.REACT_APP_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

// Fallback TMDB bearer token (use environment variable if available, otherwise use this fallback)
const FALLBACK_TMDB_BEARER = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODUzZjc0MWNiODhjZjE0MjE4ZjI1NWZhNzBjZjIyNyIsIm5iZiI6MTc2MDQxMjE1Mi41OTUsInN1YiI6IjY4ZWRjMWY4ZDJjMGJmNWZlN2YxMWZiYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fqWH96uuv2qWhnHOJG5vYjukLDaLX2QN1bml-VM3xMs';
const TMDB_BEARER = process.env.REACT_APP_TMDB_BEARER || FALLBACK_TMDB_BEARER;

if (!process.env.REACT_APP_TMDB_BEARER) {
  console.warn('Warning: Using fallback TMDB Bearer token. For production, please set REACT_APP_TMDB_BEARER in your environment variables.');
}

const authHeader = {
  Authorization: `Bearer ${TMDB_BEARER}`,
  'Content-Type': 'application/json;charset=utf-8',
};

async function get(path, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v);
  });

  const res = await fetch(url.toString(), { headers: authHeader });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }
  return res.json();
}

export const tmdb = {
  images: {
    poster: (path, size = 'w342') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : ''),
    backdrop: (path, size = 'w780') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : ''),
  },
  movies: {
    nowPlaying: (page = 1, region) => get('/movie/now_playing', { page, region }),
    popular: (page = 1, region) => get('/movie/popular', { page, region }),
    topRated: (page = 1, region) => get('/movie/top_rated', { page, region }),
    upcoming: (page = 1, region) => get('/movie/upcoming', { page, region }),
    details: (id) => get(`/movie/${id}`),
  },
  collections: {
    details: (id) => get(`/collection/${id}`),
  },
  account: {
    details: () => get('/account/22383246'),
  },
};

export default tmdb;
