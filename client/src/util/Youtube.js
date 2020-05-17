const axios = require("axios");

const Youtube = {
    getPlaylist(playlistUrl) {
        var reg = new RegExp("[&?]list=([a-z0-9_-]+)", "i");
        var playlistId = reg.exec(playlistUrl)[1];
        const apiUrl = "/api/playlist";
        return axios
            .get(apiUrl, {
                headers: { id: playlistId },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.log(err));
    },

    getVideoInfo(videoUrl) {
        const apiUrl = "/api/info";
        return axios
            .get(apiUrl, {
                headers: { url: videoUrl },
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.log(err));
    },
};

export default Youtube;
