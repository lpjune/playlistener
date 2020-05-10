import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import SearchBar from './components/SearchBar/SearchBar';
import Youtube from "./util/Youtube";
import Spotify from "./util/Spotify";
import Util from './util/Util';
import Customers from "./components/customers";

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
                    <SearchBar onSearch={this.findTracks} />
                </div>
            </div>
        );
    }
}

export default App;
