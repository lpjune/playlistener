import React, { Component } from "react";
import "./App.css";
import SearchBar from './components/SearchBar/SearchBar';
import Spotify from "./util/Spotify";
import Util from './util/Util';

Spotify.getAccessToken();


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
        return Util.getTracks(playlistUrl).then((res) =>
            {console.log(res);
                this.setState({
                searchResults: res,
            })}
        );
    };
    render() {
        return (
            <div>
                <h1>Playlistener</h1>
                <div className="App">
                    <SearchBar onSearch={this.findTracks} />
                </div>
            </div>
        );
    }
}

export default App;
