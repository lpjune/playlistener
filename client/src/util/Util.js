import Youtube from "./Youtube";
import Spotify from "./Spotify";

const Util = {
    getTracks(playlistUrl) {

        return Youtube.youtubeGetPlaylist(playlistUrl)
            .then((res) => {
                return Youtube.youtubeGetVideos(res.videoUrls);
            })
            .then((res) => {
                return Spotify.spotifySearch(res)
            })

    }
};
export default Util;
