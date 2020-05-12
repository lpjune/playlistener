import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";
import Util from "./util/Util";

Spotify.getAccessToken();

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: "New Playlist",
            playlistTracks: [
                {
                    name: "Acid Wash Ocean",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                },

                {
                    name: "Sweet Thang",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                },

                {
                    name: "Teenage Blue",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                },

                {
                    name: "Pretty Sexual",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                },

                {
                    name: "Stranger Feelings",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                },
            ],
        };
    }
    findTracks = (playlistUrl) => {
        let results = [];
        return Util.getTracks(playlistUrl).then((res) => {
            res.map((trackArray) => {
                results.push(trackArray[0]);
            });
            this.setState({
                playlistTracks: results,
            });
        });
    };
    removeTrack = (track) => {
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(
                (playlistTrack) => playlistTrack.id !== track.id
            ),
        });
    };
    updatePlaylistName = (name) => {
        this.setState({ playlistName: name });
    };
    savePlaylist = () => {
        const trackURIs = this.state.playlistTracks.map(
            (playlistTrack) => playlistTrack.uri
        );
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({
            playlistName: "New Playlist",
            playlistTracks: [],
        });
    };
    render() {
        return (
            <div>
                <h1>Playlistener</h1>
                <div className="App">
                    <SearchBar onSearch={this.findTracks} />
                    <Playlist
                        playlistName={this.state.playlistName}
                        playlistTracks={this.state.playlistTracks}
                        onRemove={this.removeTrack}
                        onNameChange={this.updatePlaylistName}
                        onSave={this.savePlaylist}
                    />
                </div>
            </div>
        );
    }
}

export default App;
