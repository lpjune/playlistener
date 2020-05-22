const axios = require("axios");

let globalAccessToken = "";

export function redirectUrlToSpotifyForLogin() {
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_KEY;
    const REDIRECT_URI = "http://localhost:3000/";
    const scopes = [
        "user-modify-playback-state",
        "user-library-read",
        "user-library-modify",
        "playlist-read-private",
        "playlist-modify-public",
        "playlist-modify-private",
    ];
    return (
        "https://accounts.spotify.com/authorize?client_id=" +
        CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&scope=" +
        encodeURIComponent(scopes.join(" ")) +
        "&response_type=token"
    );
}

export function checkUrlForSpotifyAccessToken() {
    const params = getHashParams();
    const accessToken = params.access_token;
    if (!accessToken) {
        return false;
    } else {
        return accessToken;
    }
}

function getHashParams() {
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

export function setAccessToken(accessToken) {
    globalAccessToken = accessToken;
}

/**
 * PROMISE CHAIN
 *
 */
export function getTracks(playlistUrl) {
    return youtubeGetPlaylist(playlistUrl)
        .then((res) => {
            return youtubeGetVideos(res.videoUrls);
        })
        .then((res) => {
            return spotifySearch(res);
        });
}

/**
 * YOUTUBE
 *
 */
export function youtubeGetPlaylist(playlistUrl) {
    var reg = new RegExp("[&?]list=([a-z0-9_-]+)", "i");
    var playlistId = reg.exec(playlistUrl)[1];
    const apiUrl = "/api/playlist";
    return axios
        .get(apiUrl, {
            params: { id: playlistId },
        })
        .then((res) => {
            console.log("youtubeGetPlaylist:");
            console.log(res.data);
            return res.data;
        })
        .catch((err) => console.log(err));
}

export function youtubeGetVideos(videoUrls) {
    const apiUrl = "/api/info";
    let trackInfo = [];
    let axiosArray = [];
    videoUrls.forEach((videoUrl) => {
        let newPromise = axios({
            method: "get",
            url: apiUrl,
            params: { url: videoUrl },
        });
        axiosArray.push(newPromise);
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
            console.log("youtubeGetVideos:");
            console.log(trackInfo);
            return trackInfo;
        })
        .catch((err) => console.log(err));
}

/**
 * SPOTIFY
 *
 */

export function spotifySearch(trackSearchInfo) {
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
                    token: globalAccessToken,
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
            console.log("spotifySearch:");
            console.log(trackInfo);
            return trackInfo;
        })
        .catch((err) => console.log(err));
}

export function spotifyCreatePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) return;
    let userToken = globalAccessToken;
    return axios
        .get("/api/createplaylist", {
            params: {
                name: playlistName,
                tracks: trackURIs,
                token: userToken,
            },
        })
        .then((res) => {
            if (res.status === 201) {
                console.log("spotifyCreatePlaylist:");
                console.log(res.data);
                return res.data;
            } else {
                return false;
            }
        });
}
