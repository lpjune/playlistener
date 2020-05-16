import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Playlist from "./components/Playlist";
import Logos from "./components/Logos";
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
        marginBottom: 10,
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
            urlEntered: false,
            playlistName: "New Playlist",
            playlistTracks: [],
        };
    }
    findTracks = (playlistUrl) => {
        this.setState({ loading: true, urlEntered: true });
        let results = [];
        return Util.getTracks(playlistUrl).then((res) => {
            res.forEach((trackArray) => {
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
                            <Typography
                                className={classes.title}
                                color="textPrimary"
                                variant="h4"
                            >
                                playlistener
                            </Typography>
                            <Container
                                className={classes.search}
                                maxWidth={"md"}
                            >
                                <SearchBar onSearch={this.findTracks} />
                            </Container>

                            {this.state.urlEntered ? (
                                <Container maxWidth={"sm"}>
                                    <Playlist
                                        loading={this.state.loading}
                                        playlistName={this.state.playlistName}
                                        playlistTracks={
                                            this.state.playlistTracks
                                        }
                                        onRemove={this.removeTrack}
                                        onNameChange={this.updatePlaylistName}
                                        onSave={this.savePlaylist}
                                    />
                                </Container>
                            ) : (
                                <Logos />
                            )}
                        </div>
                    </div>
                </Container>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
