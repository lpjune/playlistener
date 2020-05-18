const express = require("express");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

const app = express();

app.get("/api/playlist", (req, res) => {
    const playlistId = req.query.id.toString();
    const videoUrls = [];
    let playlistTitle;
    ytpl(playlistId)
        .then((res) => {
            playlistTitle = res.title;
            playlistInfo = res.items;
            playlistInfo.forEach(video => {
                videoUrls.push(video.url);
            })
            
        })
        .then(() => {
            res.json({playlistTitle, videoUrls});
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

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
