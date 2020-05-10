const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

app.get("/api/customers", (req, res) => {
    const customers = [
        { id: 1, firstName: "Joh", lastName: "Doe" },
        { id: 2, firstName: "Brad", lastName: "Traversy" },
        { id: 3, firstName: "Mary", lastName: "Swanson" },
    ];

    res.json(customers);
});

app.get("/api/info", (req, res) => {
    const ytUrl = (req.headers.yturl).toString()
    ytdl.getInfo(ytUrl)
        .then((res) => {
            info = {
                name: res.media.song,
                artist: res.media.artist,
            };
        })
        .then(() => {
          res.json(info);
        })
        .catch((err) => console.log(err));
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
