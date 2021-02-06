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

const initialState = {
    loading: false,
    accessToken: null,
    youtubePlaylistUrl: "",
    videoUrls: [],
    videoInfo: [],
    spotifyPlaylistUrl: "",
    playlistName: "",
    playlistTracks: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true,
            };
        case SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload,
            };
        case SET_YT_URL:
            return {
                ...state,
                youtubePlaylistUrl: action.payload,
            };
        case SET_VIDEO_URLS:
            return {
                ...state,
                videoUrls: action.payload,
            };
        case SET_VIDEO_INFO:
            return {
                ...state,
                videoInfo: action.payload,
            };
        case SET_SPOTIFY_URL:
            return {
                ...state,
                spotifyPlaylistUrl: action.payload,
            };
        case SET_PLAYLIST_NAME:
            return {
                ...state,
                playlistName: action.payload,
            };
        case SET_TRACKS:
            return {
                ...state,
                playlistTracks: action.payload,
            };
        case DELETE_TRACK:
            return {
                ...state,
                playlistTracks: [],
            };
        // if (playlistTracks.length === 1) {
        //     return {
        //         ...state,
        //         playlistTracks: [],
        //     };
        // }
        // return {
        //     ...state,
        //     playlistTracks: playlistTracks.filter(
        //         (track) => track.id !== action.payload.id
        //     ),
        // };
        default:
            return state;
    }
}
