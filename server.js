const express = require("express");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

const app = express();

app.get("/api/playlist", (req, res) => {
    const playlistId = req.headers.id.toString();
    const videoUrls = [];
    ytpl(playlistId)
        .then((res) => {
            playlistInfo = res.items;
            playlistInfo.forEach(video => {
                videoUrls.push(video.url);
            })
        })
        .then(() => {
            res.json(videoUrls);
        })
        .catch((err) => console.log(err));
});

app.get("/api/info", (req, res) => {
    const videoUrl = req.headers.url.toString();
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

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
