import { useEffect, useState } from 'react'
import './App.css'


type Track = {
  id: string;
  title: string;
  artist: string;
  album: string;
  url: string;
  played_at: string;
};

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authStatus = urlParams.get('auth');

    const initFlow = async () => {
      try {
        if (authStatus === 'success') {
          window.history.replaceState({}, document.title, '/');
          await loadTracks();
        } else {
          await checkAuth();
        }
      } catch (err) {
        setError('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    initFlow();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/recently-played'); // Via proxy
      if (!response.ok) throw new Error('Não autenticado');
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      window.location.href = 'http://localhost:3220/login'; 
    }
  };

  const loadTracks = async () => {
    try {
      const response = await fetch('/api/recently-played', {
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Erro na resposta');
      const data = await response.json();
      setTracks(data);
    } catch (error) {
      setError('Falha ao carregar músicas');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h1>Suas Músicas Recentes no Spotify</h1>
      <div className="tracks-list">
        {tracks.map(track => (
          <div key={track.id} className="track-card">
            <h2>{track.title}</h2>
            <div className="track-info">
              <p><strong>Artista:</strong> {track.artist}</p>
              <p><strong>Álbum:</strong> {track.album}</p>
              <p><strong>Ouvida em:</strong> {new Date(track.played_at).toLocaleString()}</p>
            </div>
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="spotify-link"
            >
              ▶️ Ouvir no Spotify
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;