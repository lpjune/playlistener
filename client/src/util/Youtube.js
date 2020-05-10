const axios = require("axios");
const ytdl = require("ytdl-core");
const YOUTUBE_API = "AIzaSyClBqE-9PVuFN93FhHNcpIzV9KKbxRWk6c";

const Youtube = {
    getPlaylist(id) {
        let url = "https://www.googleapis.com/youtube/v3/playlistItems";
        axios
            .get(url, {
                params: {
                    part: "id,snippet",
                    playlistId: id,
                    key: YOUTUBE_API,
                    maxResults: 3,
                },
            })
            .then((res) => console.log(res.data.items))
            .catch((err) => console.log(err));
    },

    getVideoInfo(ytUrl) {
        const apiUrl = "/api/info";
        axios
            .get(apiUrl, {
                headers: { ytUrl: ytUrl },
            })
            .then(res => console.log(res.data))
            .catch((err) => console.log(err));
    },
};

export default Youtube;
