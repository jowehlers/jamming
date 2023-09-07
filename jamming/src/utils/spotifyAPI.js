export async function fetchProfile(token) {
    console.log("here in fetchProfile");
    console.log({token});

    const result = await fetch("https://api.spotify.com/v1/me", {        
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export const fetchPlaylists = async (token=null, spotifyUserApiEP=null) => {
    console.log("here in fetchPlaylists");
    console.log(token, spotifyUserApiEP);
    
    const result = await fetch(`${spotifyUserApiEP}/playlists`, {        
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    console.log(result);

    return await result.json();
}
