import { useState, useEffect } from 'react';

const useSpotifyToken = () => {
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  const setSession = (hash) => {
    const expiresAt = new Date().getTime() + hash.expires_in * 1000;
    setToken(hash.access_token);
    setExpiresIn(expiresAt);
  };

  const handleTokenExpiration = (expiresAt) => {
    const timeout = expiresAt - new Date().getTime();
    setTimeout(() => {
      setToken(null);
      setExpiresIn(null);
    }, timeout);
  };

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((initial, item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
      }, {});

    if (hash.error) {
      console.error("There was an error during the authentication:", hash.error);
      return;
    }

    if (hash.access_token && hash.expires_in) {
      setSession(hash);
      handleTokenExpiration(expiresIn);
    }

    window.location.hash = "";
  }, [expiresIn]);

  return token;
};

export default useSpotifyToken;