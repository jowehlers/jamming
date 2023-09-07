import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../../utils/spotifyAPI';

const ProfileComponent = ({ token , setSpotifyUserApiEP}) => {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    if (token) {
        console.log("here in profileComponent use effect");
        console.log({ token });
        
        fetchProfile(token)
          .then((data) => {
            setProfile(data);
            console.log("set profile to data");          
            console.log(data);

            console.log(`set EP to ${data.href}`);
            setSpotifyUserApiEP(data.href); // Set the profile ID
            
          })
          .catch(error => {
            console.error('Error fetching profile:', error);
            // Handle the error
          });
      } else {
        console.log("no token in profileComponent use effect");
      }
    }, [token, setSpotifyUserApiEP]);
  
 

  if (!profile) return <div>Loading...</div>;

  return (
        <div>
          {profile ? (
            <>
              <div id="displayName">{profile.display_name}</div>
              {profile.images[0] && (
                <>
                  <img id="avatar" src={profile.images[0].url} width="200" height="200" alt="Profile" />
                  <div id="imgUrl">{profile.images[0].url}</div>
                </>
              )}
              {/*<div id="id">{profile.id}</div>
              <div id="email">{profile.email}</div>
              <a id="uri" href={profile.external_urls.spotify}>{profile.uri}</a>
              <a id="url" href={profile.href}>{profile.href}</a>*/}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    };
    
    export default ProfileComponent;