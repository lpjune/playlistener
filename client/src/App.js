import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Playlist from "./components/Playlist";
import Spotify from "./util/Spotify";
import Util from "./util/Util";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme,
    Container,
    Typography,
} from "@material-ui/core";
import themeFile from "./util/Theme";

const theme = createMuiTheme(themeFile);
const styles = (theme) => ({
    ...theme.spreadThis,
    title: {
        textAlign: "center",
        marginBottom: 5,
    },
    search: {
        marginBottom: 20,
    },
});

Spotify.getAccessToken();

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            playlistName: "New Playlist",
            playlistTracks: [
                {
                    name: "Acid Wash Ocean",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art:
                        "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
                },

                {
                    name: "Sweet Thang",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art:
                        "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
                },

                {
                    name: "Teenage Blue",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art:
                        "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
                },

                {
                    name: "Pretty Sexual",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art:
                        "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
                },

                {
                    name: "Stranger Feelings",
                    album: "Illuminaughty - EP",
                    artist: "Dreamgirl",
                    art:
                        "https://i.scdn.co/image/ab67616d0000b27382b243023b937fd579a35533",
                },
            ],
        };
    }
    findTracks = (playlistUrl) => {
        this.setState({ loading: true });
        let results = [];
        return Util.getTracks(playlistUrl).then((res) => {
            res.map((trackArray) => {
                results.push(trackArray[0]);
            });
            this.setState({
                playlistTracks: results,
                loading: false,
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
            <MuiThemeProvider theme={theme}>
                <Container>
                    <div>
                        <div>
                            <Typography className={classes.title} color="textPrimary" variant="h4">
                                playlistener
                            </Typography>
                            <Container
                                className={classes.search}
                                maxWidth={"md"}
                            >
                                <SearchBar onSearch={this.findTracks} />
                            </Container>
                            <Container maxWidth={"sm"}>
                                <Playlist
                                    loading={this.state.loading}
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
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
