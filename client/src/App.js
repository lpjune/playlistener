import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Playlist from "./components/Playlist";
import * as Util from "./util/Util";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme,
    Container,
    Typography,
    Button,
    Link,
} from "@material-ui/core";
import themeFile from "./util/Theme";

const theme = createMuiTheme(themeFile);
const styles = (theme) => ({
    ...theme.spreadThis,
    title: {
        textAlign: "center",
        marginBottom: 10,
    },
    searchContainer: {
        marginBottom: 20,
    },
    imgContainer: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
    },
    image: {
        width: "45%",
        margin: "auto",
    },
});

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIntoSpotify: false,
            accessToken: null,
            loading: false,
            urlEntered: false,
            playlistName: "New Playlist",
            playlistTracks: [],
        };
    }
    componentDidMount() {
        const accessToken = Util.checkUrlForSpotifyAccessToken();
        if (accessToken) {
            Util.setAccessToken(accessToken);
            this.setState({
                loggedIntoSpotify: true,
                accessToken: accessToken,
            });
        } else {
            this.setState({ loggedIntoSpotify: false, accessToken: null });
        }
    }
    findTracks = (playlistUrl) => {
        this.setState({ loading: true, urlEntered: true, playlistTracks: [] });
        return Util.getTracks(playlistUrl).then((res) => {
            this.setState({
                playlistTracks: res,
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
        Util.spotifyCreatePlaylist(this.state.playlistName, trackURIs);
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
                                className={classes.searchContainer}
                                maxWidth={"md"}
                            >
                                <SearchBar onSearch={this.findTracks} />
                            </Container>
                            {!this.state.loggedIntoSpotify && (
                                <Container maxWidth={"md"} className={classes.title}>
                                <Link href={Util.redirectUrlToSpotifyForLogin()} style={{textDecoration: 'none'}}>
                                    <Button variant="contained" color="default" startIcon={<img src="./images/Spotify_Icon_Black.png" width="40"/>}>
                                        login with spotify
                                    </Button>
                                </Link>
                                </Container>
                            )}

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
                                <Container className={classes.imgContainer}>
                                    <img
                                        className={classes.image}
                                        src="./images/info.png"
                                        alt=""
                                    />
                                </Container>
                            )}
                        </div>
                    </div>
                </Container>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
