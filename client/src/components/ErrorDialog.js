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
    const { open, onClose, errors } = props;
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {errors}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SuccessDialog;
