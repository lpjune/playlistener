import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = {
    root: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 20,
        position: "relative",
    },
    content: {
        padding: 20,
        objectFit: "cover",
    },
};

export class Track extends Component {
    removeTrack = () => this.props.onRemove(this.props.track);

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography
                        className={classes.artist}
                        color="textSecondary"
                        variant="h6"
                    >
                        {this.props.track.artist}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.track.name}
                    </Typography>
                    <Typography className={classes.album} color="textSecondary">
                        {this.props.track.album}
                    </Typography>
                </CardContent>
                {this.props.isRemoval ? (
                    <IconButton aria-label="delete" onClick={this.removeTrack} size={"sm"}>
                        <ClearIcon />
                    </IconButton>
                ) : (
                    <Button className={classes.addButton}> + </Button>
                )}
            </Card>
        );
    }
}

export default withStyles(useStyles)(Track);