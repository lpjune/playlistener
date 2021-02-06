import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Playlist from "./components/Playlist";
import SpotifyLoginButton from "./components/SpotifyLoginButton";
import SuccessDialog from "./components/SuccessDialog";
import ErrorDialog from "./components/ErrorDialog";
import { Provider } from "react-redux";

import {
    checkUrlForSpotifyAccessToken,
    setAccessToken,
    youtubeGetPlaylist,
    youtubeGetVideos,
    spotifySearch,
    spotifyCreatePlaylist,
} from "./util/Util";
import { getTracks } from "./redux/actions/dataActions";
import {
    withStyles,
    MuiThemeProvider,
    createMuiTheme,
    Container,
    Typography,
} from "@material-ui/core";
import themeFile from "./util/Theme";
import store from "./redux/store";
import { SET_ACCESS_TOKEN } from "./redux/types";

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
            playlistName: "",
            playlistTracks: [],
            youtubePlaylistUrl: "",
            spotifyPlaylistUrl: "",
            successDialogOpen: false,
            errorDialogOpen: false,
            errors: [],
        };
    }
    componentDidMount() {
        const token = checkUrlForSpotifyAccessToken();
        if (token) {
            // setAccessToken(token);
            store.dispatch({
                type: SET_ACCESS_TOKEN,
                payload: token,
            });
            this.setState({
                loggedIntoSpotify: true,
                accessToken: token,
            });
        } else {
            this.setState({ loggedIntoSpotify: false, accessToken: null });
        }
    }
    findTracks = (playlistUrl) => {
        this.setState({ loading: true, urlEntered: true, playlistTracks: [] });
        return youtubeGetPlaylist(playlistUrl)
            .then((res) => {
                this.updatePlaylistName(res.playlistTitle);
                return youtubeGetVideos(res.videoUrls);
            })
            .then((res) => {
                return spotifySearch(res);
            })
            .then((res) => {
                this.setState({
                    playlistTracks: res,
                    loading: false,
                });
            })
            .catch((err) => {
                this.setState({ errors: err.message, openErrorDialog: true });
            });
    };
    removeTrack = (track) => {
        if (this.state.playlistTracks.length === 1) {
            this.clearPlaylist();
        }
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(
                (playlistTrack) => playlistTrack.id !== track.id
            ),
        });
    };
    handleInputChange = (url) => {
        this.setState({ youtubePlaylistUrl: url });
    };
    clearPlaylist = () => {
        this.setState({
            playlistName: "",
            playlistTracks: [],
            urlEntered: false,
            youtubePlaylistUrl: "",
            spotifyPlaylistUrl: "",
            errors: [],
        });
    };
    updatePlaylistName = (name) => {
        this.setState({ playlistName: name });
    };
    savePlaylist = () => {
        const trackURIs = this.state.playlistTracks.map(
            (playlistTrack) => playlistTrack.uri
        );
        spotifyCreatePlaylist(
            this.state.playlistName,
            trackURIs,
            this.state.youtubePlaylistUrl
        )
            .then((res) => {
                let url = `http://open.spotify.com/user/spotify/playlist/${res}`;
                this.setState({ spotifyPlaylistUrl: url });
                this.openSuccessDialog();
            })
            .catch((err) => console.log(err));
    };
    openSuccessDialog = () => {
        this.setState({ successDialogOpen: true });
    };
    closeSuccessDialog = () => {
        this.setState({ successDialogOpen: false });
        this.clearPlaylist();
    };
    openErrorDialog = () => {
        this.setState({ errorDialogOpen: true });
    };
    closeErrorDialog = () => {
        this.setState({ errorDialogOpen: false });
    };
    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <Container>
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
                            <SearchBar
                                url={this.state.youtubePlaylistUrl}
                                onChange={this.handleInputChange}
                                onSearch={getTracks}
                                loggedIntoSpotify={this.state.loggedIntoSpotify}
                            />
                        </Container>
                        {!this.state.loggedIntoSpotify && (
                            <SpotifyLoginButton />
                        )}

                        <SuccessDialog
                            url={this.state.spotifyPlaylistUrl}
                            open={this.state.successDialogOpen}
                            onClose={this.closeSuccessDialog}
                        />

                        <ErrorDialog
                            open={this.state.errorDialogOpen}
                            onClose={this.closeErrorDialog}
                            errors={this.state.errors}
                        />

                        {this.state.urlEntered ? (
                            <Container maxWidth={"sm"}>
                                <Playlist
                                    loading={this.state.loading}
                                    playlistName={this.state.playlistName}
                                    playlistTracks={this.state.playlistTracks}
                                    onRemove={this.removeTrack}
                                    onNameChange={this.updatePlaylistName}
                                    onSave={this.savePlaylist}
                                    onClear={this.clearPlaylist}
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
                    </Container>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
