import React, { Component } from 'react';
import { withStyles, Container } from "@material-ui/core";

const styles = theme => ({
    ...theme.spreadThis,
    container: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
        paddingTop: "8%",
    },
    ytImage: {
        backgroundColor: "black",
        width: "40%",
        margin: "auto",
        marginBottom: "10%",
    },
    spotifyImage: {
        width: "40%",
        margin: "auto",
    },
});

export class Logos extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Container className={classes.container}>
                <img className={classes.ytImage} src="./images/yt_logo_mono_dark.png" />
                <img className={classes.spotifyImage} src="./images/Spotify_Logo_RGB_Black.png" />
            </Container>
        )
    }
}

export default withStyles(styles)(Logos);