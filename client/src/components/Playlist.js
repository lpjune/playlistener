import React, { Component } from "react";
import TrackList from "./TrackList";
import PlaylistSkeleton from "./PlaylistSkeleton";
import { withStyles, TextField, Button, IconButton } from "@material-ui/core";
import {
    SaveAlt as SaveIcon,
    DeleteOutline as DeleteIcon,
    Clear as ClearIcon,
} from "@material-ui/icons";

const styles = (theme) => ({
    ...theme.spreadThis,
    playlist: {
        textAlign: "center",
    },
    textField: {
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
    label: {
        color: "#f44336",
    },
});

export class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            errorLabel: "",
        };
    }
    handleClick = () => {
        if (!this.state.error) {
            this.props.onSave();
        }
    };
    handleNameChange = (event) => {
        this.props.onNameChange(event.target.value);
        if (event.target.value.length > 0) {
            this.setState({ error: false, errorLabel: "" });
        } else {
            this.setState({ error: true, errorLabel: "Enter a playlist title" });
        }
    };
    handleNameClear = () => {
        this.props.onNameChange("");
        this.setState({ error: true, errorLabel: "Enter a playlist title" });
    };

    render() {
        const { classes } = this.props;

        let playlistMarkup = !this.props.loading ? (
            <div className={classes.playlist}>
                <TextField
                    className={classes.textField}
                    value={this.props.playlistName}
                    onChange={this.handleNameChange}
                    error={this.state.error}
                    label={this.state.errorLabel}
                    labelclassname={classes["label"]}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={this.handleNameClear}>
                                <ClearIcon />
                            </IconButton>
                        ),
                        inputProps: {
                            style: {
                                textAlign: "center",
                                marginLeft: 24,
                            },
                        },
                    }}
                ></TextField>
                <div className={classes.buttonDiv}>
                    <Button
                        onClick={this.handleClick}
                        variant="contained"
                        color="default"
                        startIcon={<SaveIcon />}
                        disabled={this.state.error}
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
