import Youtube from "./Youtube";
import Spotify from "./Spotify";

const parallel = require("async-await-parallel");

const Util = {
    getTracks(playlistUrl) {
        const tracks = [];
        const tracksNotFound = [];
        const spotifyIds = [];
        const batchSize = 10;

        return Youtube.getPlaylist(playlistUrl).then((res) => {
            const videoUrls = res;

            return Youtube.getInfo(videoUrls)
                .then((res) => {
                    res.forEach((track) => {
                        if (track.name && track.artist) tracks.push(track);
                        else tracksNotFound.push(track);
                    });
                })

                .then(() => {
                    console.log(tracks);
                    console.log(tracksNotFound);
                    return parallel(
                        tracks.map((track) => {
                            return () => {
                                return Spotify.search(
                                    track.name,
                                    track.artist
                                ).then((id) => spotifyIds.push(id));
                            };
                        }, batchSize)
                    )
                        .then(() => {
                            console.log(spotifyIds);
                            return spotifyIds;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })

                .catch((err) => {
                    console.log(err);
                });
        });
    },
};
export default Util;
