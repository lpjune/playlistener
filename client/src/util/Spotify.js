import * as React from 'react';

const CLIENT_ID = "af5f2146af744806b816c937c6514317";
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
        return fetch(searchURI, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (!res.tracks) return [];
                return res.tracks.items.map((track) => {
                    return {
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri,
                    };
                });
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs) return;
        let userToken = accessToken;
        let userID;
        let playlistID;
        fetch(USER_URI, {
            headers: { Authorization: `Bearer ${userToken}` },
        })
            .then((res) => res.json())
            .then((res) => (userID = res.id))
            .then(() => {
                let createPlaylistURI = `https://api.spotify.com/v1/users/${userID}/playlists`;
                fetch(createPlaylistURI, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${userToken}` },
                    body: JSON.stringify({
                        name: name,
                    }),
                })
                    .then((res) => res.json())
                    .then((res) => (playlistID = res.id))
                    .then(() => {
                        let addItemToPlaylistURI = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
                        fetch(addItemToPlaylistURI, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${userToken}` },
                            body: JSON.stringify({
                                uris: trackURIs,
                            }),
                        });
                    });
            });
    },
};

export default Spotify;
