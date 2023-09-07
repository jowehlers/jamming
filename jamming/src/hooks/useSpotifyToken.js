import { useState, useEffect } from 'react';

const useSpotifyToken = () => {
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    // Check if token and expiration are stored in session storage
    const storedToken = sessionStorage.getItem('spotify_access_token');
    const storedExpiresAt = sessionStorage.getItem('spotify_token_expires_at');

    if (storedToken && storedExpiresAt) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(storedExpiresAt, 10)) {
        setToken(storedToken);
        setExpiresIn(storedExpiresAt);
      } else {
        sessionStorage.removeItem('spotify_access_token');
        sessionStorage.removeItem('spotify_token_expires_at');
      }
    }
  }, []);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        const parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});

    if (hash.access_token && hash.expires_in) {
      const expiresAt = new Date().getTime() + hash.expires_in * 1000;
      setToken(hash.access_token);
      setExpiresIn(expiresAt);

      // Store the token and expiration in session storage
      sessionStorage.setItem('spotify_access_token', hash.access_token);
      sessionStorage.setItem('spotify_token_expires_at', expiresAt.toString());

      const timeout = expiresAt - new Date().getTime();
      setTimeout(() => {
        setToken(null);
        setExpiresIn(null);

        // Remove the token and expiration from session storage
        sessionStorage.removeItem('spotify_access_token');
        sessionStorage.removeItem('spotify_token_expires_at');
      }, timeout);
    }

    window.location.hash = "";
  }, []);

  return token;
};

export default useSpotifyToken;
