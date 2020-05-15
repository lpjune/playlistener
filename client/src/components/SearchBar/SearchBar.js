import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export class SearchBar extends Component {
    search = (term) => this.props.onSearch(term);

    handleClick = (event) => {
        event.preventDefault();
        const urlInput = document.getElementById("urlInput")
        this.search(urlInput.value);
    }

    render() {
        return (
            <div className="SearchBar">
                <TextField fullWidth variant="outlined" placeholder="Enter A Youtube Playlist URL" id="urlInput"></TextField>
                <button className="SearchButton" onClick={this.handleClick}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;
