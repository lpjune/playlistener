import React from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
} from "@material-ui/core";

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        textAlign: "center",
        marginBottom: 10,
    },
});

const SuccessDialog = (props) => {
    const { classes, open, onClose, url } = props;
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Spotify playlist created!</DialogTitle>
            <a href={url} target="_blank">View playlist</a>
        </Dialog>
    );
};

export default withStyles(styles)(SuccessDialog);
