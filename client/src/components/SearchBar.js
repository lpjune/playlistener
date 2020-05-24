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
    searchButtonDisabled: {
        marginLeft: 10,
        color: "rgba(0,0,0,0.26)",
        boxShadow: "none",
        backgroundColor: "rgba(0,0,0,0.12)",
        "&:hover": {
            boxShadow: "none",
            backgroundColor: "rgba(0,0,0,0.12)",
        },
    },
    typography: {
        padding: 10,
    },
    label: {
        color: "#f44336",
    },
});

const SearchBar = (props) => {
    const { classes, loggedIntoSpotify, onSearch, url, onChange } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [error, setError] = React.useState(false);
    const [errorLabel, setErrorLabel] = React.useState("");
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const search = (term) => onSearch(term);

    const handleClick = () => {
        if (!error && url.length > 0) {
            search(url);
        } else {
            setError(true);
            setErrorLabel("Enter a Youtube Playlist URL");
        }
    };

    const handleNameChange = (event) => {
        onChange(event.target.value);
        if (event.target.value.length > 0) {
            setError(false);
            setErrorLabel("");
        } else {
            setError(true);
            setErrorLabel("Enter a Youtube playlist URL");
        }
    };

    const handleEnter = (event) => {
        if (event.key === "Enter" && !error && url.length > 0) {
            search(url);
        } else {
            setError(true);
            setErrorLabel("Enter a Youtube playlist URL");
        }
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
                onChange={handleNameChange}
                onKeyPress={handleEnter}
                error={error}
                label={errorLabel}
                labelclassname={classes["label"]}
                variant="outlined"
                placeholder={error ? "" : "Enter a Youtube playlist URL"}
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
                onClick={handleDisabledClick}
                disabled
                fullWidth
                value={url}
                variant="outlined"
                placeholder="Please login with Spotify"
            ></TextField>
            <Button
                onClick={handleDisabledClick}
                className={classes.searchButtonDisabled}
                variant="contained"
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
