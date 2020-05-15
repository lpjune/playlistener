import React, { Component } from "react";
import { withStyles, Card, CardContent, Button, IconButton, Typography, CardMedia } from "@material-ui/core";
import { Clear as ClearIcon } from "@material-ui/icons";

const useStyles = {
    card: {
        display: "flex",
        position: "relative",
        marginBottom: 15,
        marginLeft: "10%",
        marginRight: "10%",
    },
    content: {
        padding: 10,
        objectFit: "cover",
        textAlign: "left",
    },
    art: {
        width: 100,
        height: 100,
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: 5,
    },
    cardButton: {
        position: "absolute",
        right: 5,
        bottom: 5,
    },
};

export class Track extends Component {
    removeTrack = () => this.props.onRemove(this.props.track);

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia className={classes.art} image={this.props.track.art}></CardMedia>
                <CardContent className={classes.content}>
                    <Typography
                        className={classes.artist}
                        color="textSecondary"
                        variant="h6"
                    >
                        {this.props.track.artist}
                    </Typography>
                    <Typography variant="h5">
                        {this.props.track.name}
                    </Typography>
                    <Typography className={classes.album} color="textSecondary">
                        {this.props.track.album}
                    </Typography>
                </CardContent>
                {this.props.isRemoval ? (
                    <IconButton
                        className={classes.cardButton}
                        aria-label="delete"
                        onClick={this.removeTrack}
                        size={"small"}
                    >
                        <ClearIcon />
                    </IconButton>
                ) : (
                    <Button className={classes.cardButton}> + </Button>
                )}
            </Card>
        );
    }
}

export default withStyles(useStyles)(Track);
