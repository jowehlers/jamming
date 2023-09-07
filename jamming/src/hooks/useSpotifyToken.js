import { useState, useEffect } from 'react';

const useSpotifyToken = () => {
  const [token, setToken] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

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
      //expiresin is also given in the response from spotify so likely shouldn't hard code it as current known value of 1 minute?
      const expiresAt = new Date().getTime() + hash.expires_in * 1000;
      setToken(hash.access_token);
      setExpiresIn(expiresAt);
      
      const timeout = expiresAt - new Date().getTime();
      setTimeout(() => {
        setToken(null);
        setExpiresIn(null);
      }, timeout);
    }

    window.location.hash = "";
  }, []);

  return token;
};

export default useSpotifyToken;
