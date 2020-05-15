import React, { Component } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Playlist from "./components/Playlist/Playlist";
import Spotify from "./util/Spotify";
import Util from "./util/Util";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

Spotify.getAccessToken();

const useStyles = {
    search: {
        marginBottom: 20,
    },
};

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
                    art: "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533"
                },

                {
                    name: "Sweet Thang",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art: "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533"
                },

                {
                    name: "Teenage Blue",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art: "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533"
                },

                {
                    name: "Pretty Sexual",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art: "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533"
                },

                {
                    name: "Stranger Feelings",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art: "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533"
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
        const { classes } = this.props;

        return (
            <Container>
            <div>
                <h1>playlistener</h1>
                <div className="App">
                    <Container className={classes.search} maxWidth={"md"}>
                        <SearchBar onSearch={this.findTracks} />
                    </Container>
                    <Container maxWidth={"sm"}>
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </Container>
                </div>
            </div>
            </Container>
        );
    }
}

export default withStyles(useStyles)(App);
