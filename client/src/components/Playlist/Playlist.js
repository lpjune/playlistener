import React, { Component } from "react";
import TrackList from "../TrackList/TrackList";
import TextField from "@material-ui/core/TextField";

export class Playlist extends Component {
    handleNameChange = (event) => {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <TextField value={this.props.playlistName} onChange={this.handleNameChange}></TextField>
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default Playlist;
