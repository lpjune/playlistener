import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import { withStyles, TextField, Button } from "@material-ui/core";

const useStyles = {
    name: {
        display: "flex",
        textAlign: "center",
        marginBottom: 10,
    },
    saveButton: {
        marginBottom: 20,
    },
};

export class Playlist extends Component {
    handleNameChange = (event) => {
        this.props.onNameChange(event.target.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className="Playlist">
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
        );
    }
}

export default withStyles(useStyles)(Playlist);
