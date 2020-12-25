const express = require("express");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.get("/api/playlist", (req, res) => {
    const playlistId = req.query.id.toString();
    const videoUrls = [];
    let playlistTitle;
    ytpl(playlistId)
        .then((res) => {
            playlistTitle = res.title;
            let playlistInfo = res.items;
            playlistInfo.forEach((video) => {
                videoUrls.push(video.url);
            });
        })
        .then(() => {
            res.json({ playlistTitle, videoUrls });
        })
        .catch((err) => console.log(err));
});

app.get("/api/info", (req, res) => {
    const videoUrl = req.query.url.toString();
    let videoInfo;
    ytdl.getInfo(videoUrl)
        .then((res) => {
            videoInfo = {
                name: res.videoDetails.media.song,
                artist: res.videoDetails.media.artist,
                url: videoUrl,
            };
        })
        .then(() => {
            console.log(videoInfo);
            res.json(videoInfo);
        })
        .catch((err) => console.log(err));
});

app.get("/api/search", (req, res) => {
    const token = req.query.token;
    const name = req.query.name;
    const artist = req.query.artist;
    const searchURI = `https://api.spotify.com/v1/search?query=track%3A${name}+artist%3A${artist}&type=track&offset=0&limit=1`;
    axios
        .get(searchURI, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((song) => {
            // console.log(song.data.tracks.items);
            let track = song.data.tracks.items[0];
            // console.log(track);
            res.status(200).send({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                art: track.album.images[0].url,
                uri: track.uri,
            });
        })
        .catch((err) => console.log(err));
});

app.get("/api/createplaylist", (req, result) => {
    const USER_URI = "https://api.spotify.com/v1/me";
    const userToken = req.query.token;
    const playlistName = req.query.name;
    const trackURIs = req.query.tracks;
    const playlistDescription = req.query.description;
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
                name: playlistName,
                description: playlistDescription,
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
                        uris: trackURIs,
                    });

                    axios
                        .post(addToPlaylistURI, addToPlaylistData, {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        })
                        .then(() => {
                            result.status(201).send(playlistID);
                        })
                        .catch((err) => console.log(err));
                });
        });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
