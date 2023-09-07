import React from 'react';
import { useToken } from './TokenContext';

const Authorize = () => {
  const { token, loginWithSpotify } = useToken();

  return (
    <div>
       {token ? <p>Token received: {token}</p> : <button onClick={loginWithSpotify}>Login with Spotify</button>}
    </div>

  );
};

export default Authorize;
