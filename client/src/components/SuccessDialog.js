import React from "react";
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Link,
    Button,
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
            <DialogTitle>Success!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Your playlist has been added to your Spotify account.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Link href={url} target="_blank">
                    <Button>View playlist</Button>
                </Link>
            </DialogActions>
        </Dialog>
    );
};

export default withStyles(styles)(SuccessDialog);
