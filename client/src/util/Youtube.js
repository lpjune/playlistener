const axios = require("axios");
const YOUTUBE_API = "AIzaSyClBqE-9PVuFN93FhHNcpIzV9KKbxRWk6c";

const Youtube = {
    getPlaylist(url) {
        var reg = new RegExp("[&?]list=([a-z0-9_-]+)", "i");
        var id = reg.exec(url)[1];
        console.log(id);
        let api_url = "https://www.googleapis.com/youtube/v3/playlistItems";
        return axios
            .get(api_url, {
                params: {
                    part: "id,snippet",
                    playlistId: id,
                    key: YOUTUBE_API,
                    maxResults: 20,
                },
            })
            .then((res) => {
                return res.data.items;
            })
            .catch((err) => console.log(err));
    },

    getVideoUrls(items) {
        const urls = [];
        for (let i = 0; i < items.length - 1; i++) {
            urls.push(
                "https://www.youtube.com/watch?v=" +
                    items[i].snippet.resourceId.videoId
            );
        }
        return urls;
    },

    getVideoInfo(ytUrl) {
        const apiUrl = "/api/info";
        return axios
            .get(apiUrl, {
                headers: { ytUrl: ytUrl },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.log(err));
    },

    allYT() {
        const tracks = [];
        return Youtube.getPlaylist(
            "https://www.youtube.com/playlist?list=PLsAk6h4n-dS3IG4H69AMcWI1-3CmasVWb"
        ).then((res) => {
            let urls = Youtube.getVideoUrls(res);
            console.log(urls);
            for (let i = 0; i < urls.length - 1; i++) {
                Youtube.getVideoInfo(urls[i]).then((info) => {
                    tracks.push(info);
                });
            }
        }).then(() => {
            return tracks
        });
        
    },
};

export default Youtube;
