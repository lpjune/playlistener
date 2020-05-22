import React from "react";
import {
    Button,
    TextField,
    withStyles,
    Typography,
    Popover,
} from "@material-ui/core";
import { ImportExport as ImportExportIcon } from "@material-ui/icons";

const styles = (theme) => ({
    ...theme.spreadThis,
    searchDiv: {
        display: "flex",
    },
    searchButton: {
        marginLeft: 10,
    },
    typography: {
        padding: 10,
    },
});

const SearchBar = (props) => {
    const { classes } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const search = (term) => props.onSearch(term);

    const handleClick = (event) => {
        event.preventDefault();
        const urlInput = document.getElementById("urlInput");
        search(urlInput.value);
    };

    const handleDisabledClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let searchbarMarkup = props.loggedIntoSpotify ? (
        <div className={classes.searchDiv}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter a Youtube Playlist URL"
                id="urlInput"
            ></TextField>
            <Button
                className={classes.searchButton}
                onClick={handleClick}
                variant="contained"
                color="default"
                startIcon={<ImportExportIcon />}
            >
                Go!
            </Button>
        </div>
    ) : (
        <div className={classes.searchDiv}>
            <TextField
                disabled
                fullWidth
                variant="outlined"
                placeholder="Please login with Spotify"
                id="urlInput"
            ></TextField>
            <Button
                onClick={handleDisabledClick}
                className={classes.searchButton}
                variant="contained"
                color="default"
                startIcon={<ImportExportIcon />}
            >
                Go!
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Typography className={classes.typography}>
                    Please login with Spotify
                </Typography>
            </Popover>
        </div>
    );

    return searchbarMarkup;
};

export default withStyles(styles)(SearchBar);
