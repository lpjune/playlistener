const axios = require("axios");
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
const REDIRECT_URI = "http://localhost:3000/";
var spotifyURI = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
let accessToken = undefined;
let expiresIn = undefined;

const Spotify = {
    spotifyGetAccessToken() {
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

    spotifySearch(trackSearchInfo) {
        let axiosArray = [];
        let trackInfo = [];
        trackSearchInfo.forEach((track) => {
            if (track.name && track.artist) {
                const searchURI = "/api/search";
                let newPromise = axios({
                    method: "get",
                    url: searchURI,
                    params: {
                        name: track.name,
                        artist: track.artist,
                        token: accessToken,
                    },
                });
                axiosArray.push(newPromise);
            }
        });

        return axios
            .all(axiosArray)
            .then(
                axios.spread((...responses) => {
                    responses.forEach((res) => {
                        trackInfo.push(res.data);
                    });
                })
            )
            .then(() => {
                return trackInfo;
            })
            .catch((err) => console.log(err));
    },

    spotifyCreatePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs) return;
        let userToken = accessToken;
        axios
            .get("/api/createplaylist", {
                params: {
                    name: playlistName,
                    tracks: trackURIs,
                    token: userToken,
                },
            })
            .then((res) => console.log(res));
    },
};

export default Spotify;
