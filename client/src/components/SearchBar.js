import React from "react";
import { youtubeValidateURL } from "../util/Util";
import {
    Button,
    TextField,
    withStyles,
    Typography,
    Popover,
    IconButton,
} from "@material-ui/core";
import store from "../redux/store";
import { getTracks } from "../redux/actions/dataActions";
import {
    ImportExport as ImportExportIcon,
    Clear as ClearIcon,
} from "@material-ui/icons";

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
        if (url.length === 0) {
            setEmptyError();
        } else {
            if (!youtubeValidateURL(url)) {
                setInvalidError();
            } else {
                store.dispatch(getTracks(url));
            }
        }
    };

    const clearErrors = () => {
        setError(false);
        setErrorLabel("");
    };

    const setEmptyError = () => {
        setError(true);
        setErrorLabel("Enter a Youtube playlist URL");
    };

    const setInvalidError = () => {
        setError(true);
        setErrorLabel("Enter a valid Youtube playlist URL");
    };

    const handleNameChange = (event) => {
        onChange(event.target.value);

        if (event.target.value.length === 0) {
            setEmptyError();
        } else {
            if (!youtubeValidateURL(event.target.value)) {
                setInvalidError();
            } else {
                clearErrors();
            }
        }
    };

    const handleNameClear = () => {
        onChange("");
        setEmptyError();
    };

    const handleEnter = (event) => {
        if (event.key === "Enter" && !error) {
            search(url);
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
                InputProps={
                    url
                        ? {
                              endAdornment: (
                                  <IconButton onClick={handleNameClear}>
                                      <ClearIcon />
                                  </IconButton>
                              ),
                          }
                        : null
                }
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
