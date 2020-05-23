import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Link,
    Button,
} from "@material-ui/core";

const SuccessDialog = (props) => {
    const { open, onClose, url } = props;
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

export default SuccessDialog;