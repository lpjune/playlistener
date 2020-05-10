import Youtube from './Youtube';
import Spotify from './Spotify';

const parallel = require("async-await-parallel");

const tracks = [];
const spotifyIds = [];
const batchSize = 5;

const Util = {
    getTracks(youtubeUrl) {
        return Youtube.getPlaylist(youtubeUrl).then((res) => {
            const urls = Youtube.getVideoUrls(res);
            console.log(urls);
            return parallel(
                urls.map((url) => {
                    return () => {
                        return Youtube.getVideoInfo(url).then((track) =>
                            tracks.push(track)
                        );
                    };
                }, batchSize)
            )
                .then(() => {
                    console.log(tracks);

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