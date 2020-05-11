import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import Spotify from "./util/Spotify";
import Util from "./util/Util";

Spotify.getAccessToken();

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            playlistName: "New Playlist",
        };
    }
    findTracks = (playlistUrl) => {
        let results = [];
        return Util.getTracks(playlistUrl).then((res) => {
            res.map((trackArray) => {
                results.push(trackArray[0]);
            });
            this.setState({
                searchResults: results,
            });
        });
    };
    render() {
        return (
            <div>
                <h1>Playlistener</h1>
                <div className="App">
                    <SearchBar onSearch={this.findTracks} />
                    <SearchResults searchResults={this.state.searchResults} />
                </div>
            </div>
        );
    }
}

export default App;
