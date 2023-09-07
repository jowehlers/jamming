export async function fetchProfile(token) {
    console.log("here in fetchProfile");
    console.log({token});

    const result = await fetch("https://api.spotify.com/v1/me", {        
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

export const fetchPlaylists = async (token=null, spotifyUserApiHref=null) => {
    console.log("here in fetchPlaylists");
    console.log({token}, { spotifyUserApiHref });
    
    const result = await fetch(`${spotifyUserApiHref}/playlists`, {        
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}
