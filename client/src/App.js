import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Youtube from "./util/Youtube";
import Spotify from "./util/Spotify";
import Customers from "./components/customers";

const tracks = [];
Youtube.getPlaylist(
    "https://www.youtube.com/playlist?list=PLsAk6h4n-dS3IG4H69AMcWI1-3CmasVWb"
)
    .then((res) => {
        let urls = Youtube.getVideoUrls(res);
        console.log(urls)
        for (let i = 0; i < urls.length-1; i++) {
          
          Youtube.getVideoInfo(urls[i])
          .then((info) => {
            tracks.push(info);
        })}})
        


// Spotify.getAccessToken();
// Youtube.getPlaylist(
//     "https://www.youtube.com/playlist?list=PLsAk6h4n-dS3IG4H69AMcWI1-3CmasVWb"
// ).then((res) => {
//     let urls = Youtube.getVideoUrls(res);

//     Youtube.getVideoInfo(urls[0]).then((info) => {
//         tracks.push(info);
//     }).then(() => console.log(tracks))
// });

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
    search = (term) => {
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
