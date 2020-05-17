import Youtube from "./Youtube";
import Spotify from "./Spotify";

const parallel = require("async-await-parallel");

const tracks = [];
const spotifyIds = [];
const batchSize = 10;
const tracksNotFound = [];

const Util = {
    getTracks(playlistUrl) {
        return Youtube.getPlaylist(playlistUrl).then((res) => {
            const videoUrls = res;
            return parallel(
                videoUrls.map((url) => {
                    return () => {
                        return Youtube.getVideoInfo(url).then((track) => {
                            if (track.name && track.artist) tracks.push(track);
                            else tracksNotFound.push(track.url);
                        });
                    };
                }, batchSize)
            )
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
