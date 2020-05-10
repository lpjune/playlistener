import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Youtube from "./util/Youtube";
import Spotify from "./util/Spotify";
import Customers from "./components/customers";
const parallel = require("async-await-parallel");

const tracks = [];
const spotifyIds = [];
const batchSize = 1;

Spotify.getAccessToken();

Youtube.getPlaylist(
    "https://www.youtube.com/playlist?list=PLKwdCSm79ywfMn7teN_Y1GbA5VLkeiKVy"
).then((res) => {
    const urls = Youtube.getVideoUrls(res);
    console.log(urls);
    parallel(
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

            parallel(
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

// Youtube.getVideoInfo('https://www.youtube.com/watch?v=pok8H_KF1FA').then(res => {
//   Spotify.search(res.name, res.artist)
// })

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "New Playlist",
            playlistTracks: [],
        };
    }
    findTracks = (playlistUrl) => {
        return Spotify.search(term).then((res) =>
            this.setState({
                searchResults: res,
            })
        );
    };
    render() {
        return (
            <div>
                <h1>Playlistener</h1>
                <div className="App">
                    {/* <!-- Add a SearchBar component --> */}
                    {/* <SearchBar onSearch={this.search} /> */}
                </div>
            </div>
        );
    }
}

export default App;
