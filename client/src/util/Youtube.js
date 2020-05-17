const axios = require("axios");

const Youtube = {
    youtubeGetPlaylist(playlistUrl) {
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

    youtubeGetVideos(videoUrl) {
        const apiUrl = "/api/info";
        let trackInfo = []
        let axiosArray = [];
        videoUrl.forEach((url) => {
            let newPromise = axios({
                method: "get",
                url: apiUrl,
                headers: { url: url },
            });
            axiosArray.push(newPromise);
        });

        return axios
            .all(axiosArray)
            .then(
                axios.spread((...responses) => {
                    responses.forEach((res) => {
                        trackInfo.push(res.data)
                    });
                })
            )
            .then(() => { return trackInfo })
            .catch((err) => console.log(err));
    },
};

export default Youtube;
