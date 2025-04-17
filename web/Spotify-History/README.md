# 🎵 Spotify Recent Tracks

Aplicação web para visualizar suas músicas mais recentes tocadas no Spotify.

## 🛠️ Tecnologias Utilizadas
- **Frontend**:
  - React + TypeScript
  - Vite (Build Tool)
  - CSS Modules
- **Backend**:
  - Node.js
  - Express
  - Spotify Web API
- **Autenticação**:
  - OAuth 2.0 do Spotify

---

## 📋 Pré-requisitos
- Node.js (v18 ou superior)
- Conta no [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/spotify-recent-tracks.git
```

### 2. Configure o backend

```bash
cd api
npm install
```

### 3. Configure o frontend

```bash
cd ../web/Spotify-History
npm install
```

# 🔄 Configuração do Spotify

### 1. Crie um app no Spotify Dashboard.

### 2. Defina o Redirect URI como http://localhost:3220/callback.

### 3. Atualize as credenciais no arquivo api/server.js:

```javascript
const spotifyConfig = {
  clientId: 'SEU_CLIENT_ID',
  clientSecret: 'SEU_CLIENT_SECRET',
  redirectUri: 'http://localhost:3220/callback'
};
```

# 🚀 Execução

### 1. Inicie o backend:

```bash
cd api
node server.js
```

### 2. Inicie o frontend:

```bash
cd ../web/Spotify-History
npm run dev
```

### 3. Acesse no navegador:

http://localhost:5173