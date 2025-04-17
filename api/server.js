const express = require('express')
const axios = require('axios');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors')
const app = express()
const port = 3220;
const tokens = new Map();
const cookieParser = require('cookie-parser');

const spotifyConfig = {
    clientId: 'SEU_CLIENT_ID',
    clientSecret: 'SEU_CLIENT_SECRET',
    redirectUri: 'http://localhost:3220/callback'
  };

let spotifyApi = new SpotifyWebApi(spotifyConfig);

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(express.json())

let accessToken = '';

app.get('/', (req, res) => {
    res.send('Backend do Spotify funcionando!');
  });

  app.get('/login', (req, res) => {
    const scopes = ['user-read-recently-played'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
    res.redirect(authorizeURL); // Deve redirecionar para o Spotify
  });
  
  // Rota de callback depois de autenticar no Spotify
  app.get('/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        
        const sessionId = require('crypto').randomBytes(16).toString('hex');
        
        tokens.set(sessionId, data.body.access_token);
        
        res
          .cookie('spotify_session', sessionId, { maxAge: 3600000, httpOnly: true })
          .redirect('http://localhost:5173/?auth=success');
          
      } catch (error) {
        console.error('Erro na autenticação:', error);
        res.redirect('http://localhost:5173/?auth=error');
      }
    });
  
  // Rota para mostrar o histórico de músicas tocadas
  app.get('/recently-played', async (req, res) => {
    try {
        const sessionId = req.cookies.spotify_session;
        const accessToken = tokens.get(sessionId);
    
        if (!accessToken) {
          return res.status(401).json({ error: 'Não autenticado' });
        }
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 });
        const tracks = data.body.items.map(item => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.artists[0].name,
          album: item.track.album.name,
          url: item.track.external_urls.spotify,
          played_at: item.played_at
        }));
  
      res.json(tracks);
      
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ error: 'Erro ao buscar músicas' });
    }
  });

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})