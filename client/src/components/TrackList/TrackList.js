import React, { Component } from "react";
import Track from "../Track/Track";

export class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => 
                    <Track  key={track.id} 
                            track={track}
                            isRemoval={this.props.isRemoval} />)}
            </div>
        );
    }
}

export default TrackList;
