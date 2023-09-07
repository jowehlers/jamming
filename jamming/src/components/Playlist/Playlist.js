import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../../utils/spotifyAPI';

const PlaylistsComponent = ({ token , spotifyUserApiEP}) => {
  const [playlists, setPlaylists] = useState(null);
  
  useEffect(() => {
    if (token && spotifyUserApiEP) {
        console.log("here in PlayListsComponent of Playlist.js");
        console.log(token, spotifyUserApiEP);
        
        fetchPlaylists(token, spotifyUserApiEP)
          .then((data) => {
            console.log("Setting playlists with: ", data);
            setPlaylists(data.items);
          })
          .catch(error => {
            console.error('Error fetching profile:', error);
            // Handle the error
          });
      } else {
        console.log("no token in PlaylistsComponent of Playlist.js");
        console.log(token, spotifyUserApiEP);
      }
    }, [token, spotifyUserApiEP]);
  
// note to self - don't forget to add the save to spotify button
 

  if (!playlists) return <div>Loading...</div>;

  return (
    <div>
      <h2>Playlists</h2>
      {playlists.map(playlist => (
        <div key={playlist.id}>
          <h3>{playlist.name}</h3>
          <p>Owner: {playlist.owner.display_name}</p>
          <p>Tracks: {playlist.tracks.total}</p>
          <p>
            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
              Open in Spotify
            </a>
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};
    
    export default PlaylistsComponent;