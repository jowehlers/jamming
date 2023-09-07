import React , {useState} from 'react';
import { TokenProvider, useToken } from './components/Authorization/TokenContext';
import Authorize from './components/Authorization/Authorize';
import ProfileComponent from './components/Profile/Profile';
import PlaylistsComponent from './components/Playlist/Playlist';


const AppContent = () => {
  const { token, /*loginWithSpotify*/ } = useToken();
  const [ spotifyUserApiEP, setSpotifyUserApiEP ] = useState(null);

  console.log("here in AppContent");
  console.log({ token });
  //<Authorize />
  return (
    <div>
      {/*token ? <p>Token received: {token}</p> : <button onClick={loginWithSpotify}>Login with Spotify</button>*/}
      {token ? <ProfileComponent token={token} spotifyUserApiEP={setSpotifyUserApiEP} /> : <Authorize />}
      {spotifyUserApiEP ? <PlaylistsComponent token={token} spotifyUserApiEP={spotifyUserApiEP} /> : <p>Waiting for list token T:{token} EP:{spotifyUserApiEP}</p>}
    </div>
  );
  /*return (
    token ? <ProfileComponent token={token} /> : <Authorize />
  );*/
}

const App = () => {
  return (
    <TokenProvider>
      <AppContent />
    </TokenProvider>
  );
};

export default App;