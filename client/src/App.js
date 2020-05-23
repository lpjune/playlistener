import React, { Component } from "react";
import SearchBar from "./components/SearchBar";
import Playlist from "./components/Playlist";
import SpotifyLoginButton from "./components/SpotifyLoginButton";
import SuccessDialog from "./components/SuccessDialog";
import {
    checkUrlForSpotifyAccessToken,
    setAccessToken,
    getTracks,
    spotifyCreatePlaylist,
} from "./util/Util";
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
            youtubePlaylistUrl: "",
            spotifyPlaylistUrl: "",
            successDialogOpen: false,
        };
    }
    componentDidMount() {
        const accessToken = checkUrlForSpotifyAccessToken();
        if (accessToken) {
            setAccessToken(accessToken);
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
        return getTracks(playlistUrl).then((res) => {
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
    handleInputChange = (event) => {
        this.setState({ youtubePlaylistUrl: event.target.value });
    };
    clearPlaylist = () => {
        this.setState({
            playlistName: "New Playlist",
            playlistTracks: [],
            urlEntered: false,
            youtubePlaylistUrl: "",
            spotifyPlaylistUrl: "",
        });
    };
    updatePlaylistName = (name) => {
        this.setState({ playlistName: name });
    };
    savePlaylist = () => {
        const trackURIs = this.state.playlistTracks.map(
            (playlistTrack) => playlistTrack.uri
        );
        spotifyCreatePlaylist(this.state.playlistName, trackURIs).then(
            (res) => {
                let url = `http://open.spotify.com/user/spotify/playlist/${res}`;
                this.setState({ spotifyPlaylistUrl: url });
                this.openSuccessDialog();
            }
        );
    };
    openSuccessDialog = () => {
        this.setState({ successDialogOpen: true });
    };
    closeSuccessDialog = () => {
        this.setState({ successDialogOpen: false });
        this.clearPlaylist();
    };
    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
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
                            onSearch={this.findTracks}
                            loggedIntoSpotify={this.state.loggedIntoSpotify}
                        />
                    </Container>
                    {!this.state.loggedIntoSpotify && <SpotifyLoginButton />}

                    <SuccessDialog
                        url={this.state.spotifyPlaylistUrl}
                        open={this.state.successDialogOpen}
                        onClose={this.closeSuccessDialog}
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
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
