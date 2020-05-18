const express = require("express");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const axios = require("axios");

const app = express();

app.get("/api/playlist", (req, res) => {
    const playlistId = req.query.id.toString();
    const videoUrls = [];
    let playlistTitle;
    ytpl(playlistId)
        .then((res) => {
            playlistTitle = res.title;
            playlistInfo = res.items;
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
    ytdl.getInfo(videoUrl)
        .then((res) => {
            videoInfo = {
                name: res.media.song,
                artist: res.media.artist,
                url: videoUrl,
            };
        })
        .then(() => {
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

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
