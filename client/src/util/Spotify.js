const axios = require("axios");
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
const REDIRECT_URI = "http://localhost:3000/";
const USER_URI = "https://api.spotify.com/v1/me";
var spotifyURI = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        const urlAccessToken = window.location.href.match(
            /access_token=([^&]*)/
        );
        const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (urlAccessToken && urlExpiresIn) {
            accessToken = urlAccessToken[1];
            expiresIn = urlExpiresIn[1];
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
        } else {
            window.location = spotifyURI;
        }
    },

    search(name, artist) {
        const searchURI = `https://api.spotify.com/v1/search?query=track%3A${name}+artist%3A${artist}&type=track&offset=0&limit=1`;
        return axios
            .get(searchURI, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((res) => {
                if (!res.data.tracks) return [];
                let tracks = res.data.tracks.items;
                return tracks.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        art: track.album.images[0].url,
                        uri: track.uri,
                    };
                });
            })
            .catch((err) => console.log(err));
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) return;
        let userToken = accessToken;
        let userID;
        let playlistID;

        axios
            .get(USER_URI, {
                headers: { Authorization: `Bearer ${userToken}` },
            })
            .then((res) => {
                userID = res.data.id;
                let createPlaylistURI = `https://api.spotify.com/v1/users/${userID}/playlists`;
                let createPlaylistData = JSON.stringify({
                    name: playlistName
                });

                axios
                    .post(createPlaylistURI, createPlaylistData, {
                        headers: { Authorization: `Bearer ${userToken}` },
                    })
                    .then((res) => {
                        playlistID = res.data.id;
                    })
                    .then(() => {
                        let addToPlaylistURI = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
                        let addToPlaylistData = JSON.stringify({
                            uris: trackURIs
                        });
                        
                        axios
                            .post(addToPlaylistURI, addToPlaylistData, {
                                headers: { Authorization: `Bearer ${userToken}`}
                            })
                            .then((res) => {
                                console.log(res);
                                return true;
                            })
                    });
            });
    },
};

export default Spotify;
