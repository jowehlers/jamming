import React from 'react';
import { useToken } from './TokenContext';

const Authorize = () => {
  const { token, loginWithSpotify } = useToken();

  return (
    <div>
      <button onClick={loginWithSpotify}>Login with Spotify</button>
      {token ? <p>Token received: {token}</p> : <p>No token received yet</p>}
    </div>
  );
};

export default Authorize;
