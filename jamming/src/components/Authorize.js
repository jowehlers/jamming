import React from 'react';
import useSpotifyToken from '../hooks/useSpotifyToken';

function Authorize() {
  const token = useSpotifyToken();

  const loginWithSpotify = () => {
    const client_id = "a6fe982e706643b2ae9d34a3a43b6d0e";
    const redirect_uri = "https://jowehlers.github.io/jamming/";
    const scope = "user-read-private user-read-email";

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&response_type=token`;

    window.location.href = authUrl;
  };

  return (
    <div className="App">
      <button onClick={loginWithSpotify}>Login with Spotify</button>
      {token ? <p>Token received: {token}</p> : <p>No token received yet</p>}
    </div>
  );
}

export default Authorize;
