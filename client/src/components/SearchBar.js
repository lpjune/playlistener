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
    const { classes, loggedIntoSpotify, onSearch, url, onChange } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const search = (term) => onSearch(term);

    const handleClick = (event) => {
        event.preventDefault();
        search(url);
    };

    const handleDisabledClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    let searchbarMarkup = loggedIntoSpotify ? (
        <div className={classes.searchDiv}>
            <TextField
                fullWidth
                value={url}
                onChange={onChange}
                variant="outlined"
                placeholder="Enter a Youtube Playlist URL"
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
                value={url}
                variant="outlined"
                placeholder="Please login with Spotify"
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
