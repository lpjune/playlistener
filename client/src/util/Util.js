import Spotify from "spotify-web-api-js";
import uniq from "lodash";
import flatten from "lodash";
import chunk from "lodash";

const spotifyApi = new Spotify();
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
    //helper function to parse the query string that spotify sends back when you log in
    var hashParams = {};
    var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    // eslint-disable-next-line
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

export function setAccessToken(accessToken) {
    //since using spotifyApi as helper library you can set the access code once
    //you get it and then not have to include it in every request
    spotifyApi.setAccessToken(accessToken);
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
            return trackInfo;
        })
        .catch((err) => console.log(err));
}

/**
 * SPOTIFY
 *
 */
// export function spotifyGetAccessToken() {
//     if (accessToken) {
//         return accessToken;
//     }
//     const urlAccessToken = window.location.href.match(/access_token=([^&]*)/);
//     const urlExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
//     if (urlAccessToken && urlExpiresIn) {
//         accessToken = urlAccessToken[1];
//         expiresIn = urlExpiresIn[1];
//         window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
//         window.history.pushState("Access Token", null, "/");
//     } else {
//         window.location = spotifyURI;
//     }
// }

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
            return trackInfo;
        })
        .catch((err) => console.log(err));
}

export function spotifyCreatePlaylist(playlistName, trackURIs) {
    if (!playlistName || !trackURIs) return;
    let userToken = globalAccessToken;
    axios
        .get("/api/createplaylist", {
            params: {
                name: playlistName,
                tracks: trackURIs,
                token: userToken,
            },
        })
        .then((res) => console.log(res));
}
