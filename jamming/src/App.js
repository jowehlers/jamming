import React, { useState, useEffect } from 'react';
import useSpotifyToken from './hooks/useSpotifyToken';
import Authorize from './components/Authorize';

const App = () => {
  const token = useSpotifyToken();
  //use below for learning and testing purposes only
  const [tokenReceived, setTokenReceived] = useState(false);

  useEffect(() => {
    if (token) {
      setTokenReceived(true);
      console.log('Token received:', token);
    }
  }, [token]);

  return (
    <div>
      <Authorize />
      {/*remove the following after learning and verifying that the token is being received*/}
      {tokenReceived && <div className="alert">Token Received: {token}</div>}
      {/* You can use `token` here to pass it to other components if needed */}
    </div>
  );
};

export default App;