import React, { Component } from "react";
import TrackList from "./TrackList";
import PlaylistSkeleton from "./PlaylistSkeleton";
import {
    withStyles,
    TextField,
    Button,
} from "@material-ui/core";

const styles = (theme) => ({
    ...theme.spreadThis,
    playlist: {
        textAlign: "center",
    },
    name: {
        display: "flex",
        marginBottom: 10,
    },
    saveButton: {
        marginBottom: 20,
    },
});

export class Playlist extends Component {
    handleNameChange = (event) => {
        this.props.onNameChange(event.target.value);
    };

    render() {
        const { classes } = this.props;

        let playlistMarkup = !this.props.loading ? (
            <div className={classes.playlist}>
                <TextField
                    className={classes.name}
                    inputProps={{ style: { textAlign: "center" } }}
                    value={this.props.playlistName}
                    onChange={this.handleNameChange}
                ></TextField>
                <Button
                    className={classes.saveButton}
                    onClick={this.props.onSave}
                    variant="contained"
                    color="default"
                >
                    SAVE TO SPOTIFY
                </Button>
                <TrackList
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}
                />
            </div>
        ) : (
            <PlaylistSkeleton />
        );

        return playlistMarkup;
    }
}

export default withStyles(styles)(Playlist);
