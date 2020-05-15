import React, { Component } from "react";
import { Button, TextField, withStyles } from "@material-ui/core";
import { ImportExport as ImportExportIcon } from "@material-ui/icons";

const styles = theme => ({
    ...theme.spreadThis,
    searchDiv: {
        display: "flex",
    },
    searchButton: {
        marginLeft: 10,
    },
});

export class SearchBar extends Component {
    search = (term) => this.props.onSearch(term);

    handleClick = (event) => {
        event.preventDefault();
        const urlInput = document.getElementById("urlInput");
        this.search(urlInput.value);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.searchDiv}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter a Youtube Playlist URL"
                    id="urlInput"
                ></TextField>
                <Button
                    className={classes.searchButton}
                    onClick={this.handleClick}
                    variant="contained"
                    color="default"
                    startIcon={<ImportExportIcon />}
                >
                    Go!
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(SearchBar);
