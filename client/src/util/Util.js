import Youtube from "./Youtube";
import Spotify from "./Spotify";

const Util = {
    getTracks(playlistUrl) {
        const tracks = [];
        const tracksNotFound = [];
        let spotifyIds = [];

        return Youtube.youtubeGetPlaylist(playlistUrl).then((res) => {
            const playlistTitle = res.playlistTitle;
            const videoUrls = res.videoUrls;

            return Youtube.youtubeGetVideos(videoUrls)
                .then((res) => {
                    res.forEach((track) => {
                        if (track.name && track.artist) tracks.push(track);
                        else tracksNotFound.push(track);
                    });
                })

                .then(() => {
                    console.log(playlistTitle);
                    console.log(tracks);
                    console.log(tracksNotFound);

                    return Spotify.spotifySearch(tracks)
                        .then((res) => {
                            spotifyIds = res;
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
