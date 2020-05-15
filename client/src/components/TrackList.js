import React, { Component } from "react";
import Track from "./Track";

export class TrackList extends Component {
    render() {

        return (
            <div>
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => 
                    <Track  key={track.id} 
                            track={track}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval} />)}
            </div>
        );
    }
}

export default TrackList;
