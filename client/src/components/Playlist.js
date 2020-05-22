import React, { Component } from "react";
import TrackList from "./TrackList";
import PlaylistSkeleton from "./PlaylistSkeleton";
import { withStyles, TextField, Button } from "@material-ui/core";
import {
    SaveAlt as SaveIcon,
    DeleteOutline as DeleteIcon,
} from "@material-ui/icons";

const styles = (theme) => ({
    ...theme.spreadThis,
    playlist: {
        textAlign: "center",
    },
    name: {
        display: "flex",
        marginBottom: 10,
    },
    buttonDiv: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "10%",
        marginRight: "10%",
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
                <div className={classes.buttonDiv}>
                    <Button
                        onClick={this.props.onSave}
                        variant="contained"
                        color="default"
                        startIcon={<SaveIcon />}
                    >
                        SAVE TO SPOTIFY
                    </Button>
                    <Button
                        onClick={this.props.onClear}
                        variant="contained"
                        color="default"
                    >
                        <DeleteIcon />
                    </Button>
                </div>
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
