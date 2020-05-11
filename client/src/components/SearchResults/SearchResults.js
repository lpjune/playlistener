import React, { Component } from "react";
import TrackList from '../TrackList/TrackList';

export class SearchResults extends Component {
    renderAction() {
        console.log(this.props.searchResults);
    }
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {/* <!-- Add a TrackList component --> */}
                <TrackList tracks={this.props.searchResults} isRemoval={true} />
                
            </div>
        );
    }
}

export default SearchResults;
