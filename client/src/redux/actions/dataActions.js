import {
    LOADING_DATA,
    SET_ACCESS_TOKEN,
    SET_YT_URL,
    SET_SPOTIFY_URL,
    SET_PLAYLIST_NAME,
    SET_TRACKS,
    DELETE_TRACK,
    SET_VIDEO_URLS,
    SET_VIDEO_INFO,
} from "../types";

import store from "../store";
import axios from "axios";

export const loginSpotify = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
};

export const getTracks = (playlistUrl) => (dispatch) => {
    return dispatch(youtubeGetPlaylist(playlistUrl))
        .then((res) => {
            return dispatch(youtubeGetVideos(res.videoUrls));
        })
        .then((res) => {
            dispatch(spotifySearch(res));
        })
        .catch((err) => console.log(err));
};

export const youtubeGetPlaylist = (playlistUrl) => (dispatch) => {
    dispatch({ type: LOADING_DATA });

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
            dispatch({
                type: SET_PLAYLIST_NAME,
                payload: res.data.playlistTitle,
            });
            dispatch({
                type: SET_VIDEO_URLS,
                payload: res.data.videoUrls,
            });
            return res.data;
        })
        .catch((err) => console.log(err));
};

export const youtubeGetVideos = (videoUrls) => (dispatch) => {
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
            dispatch({
                type: SET_VIDEO_INFO,
                payload: trackInfo,
            });
            return trackInfo;
        })
        .catch((err) => console.log(err));
};

export const spotifySearch = (trackSearchInfo) => (dispatch) => {
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
                    token: store.getState().data.accessToken,
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
            dispatch({
                type: SET_TRACKS,
                payload: trackInfo,
            });
        })
        .catch((err) => console.log(err));
};

export const spotifyCreatePlaylist = (playlistName, trackURIs, description) => (
    dispatch
) => {
    if (!playlistName || !trackURIs) {
        return false;
    }
    let userToken = store.getState().data.accessToken;
    return axios
        .get("/api/createplaylist", {
            params: {
                name: playlistName,
                tracks: trackURIs,
                token: userToken,
                description: description,
            },
        })
        .then((res) => {
            if (res.status === 201) {
                console.log("spotifyCreatePlaylist:");
                console.log(res.data);
                let url = `http://open.spotify.com/user/spotify/playlist/${res.data}`;
                dispatch({
                    type: SET_SPOTIFY_URL,
                    payload: url,
                });
            } else {
                return false;
            }
        })
        .catch((err) => console.log(err));
};

export const removeTrack = (track) => (dispatch) => {};
