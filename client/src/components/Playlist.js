import React, { Component } from "react";
import Track from "./Track";
import PlaylistSkeleton from "./PlaylistSkeleton";
import { withStyles, TextField, Button, IconButton } from "@material-ui/core";
import {
    SaveAlt as SaveIcon,
    DeleteOutline as DeleteIcon,
    Clear as ClearIcon,
} from "@material-ui/icons";
import { connect } from "react-redux";

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
    input: {
        textAlign: "center",
        marginLeft: 24,
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
            this.setState({
                error: true,
                errorLabel: "Enter a playlist title",
            });
        }
    };
    handleNameClear = () => {
        this.props.onNameChange("");
        this.setState({ error: true, errorLabel: "Enter a playlist title" });
    };

    render() {
        const { classes } = this.props;
        // const { playlistName, playlistTracks } = this.props.data;

        let playlistMarkup = (
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
                        inputProps: { className: classes.input },
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
                {this.props.data.playlistTracks ? this.props.data.playlistTracks.map((track) => (
                    

                    <Track
                        key={track.id}
                        track={track}
                        onRemove={this.props.onRemove}
                    />
                )) : <div></div>}
            </div>
        );

        return playlistMarkup;
    }
}

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(Playlist));
