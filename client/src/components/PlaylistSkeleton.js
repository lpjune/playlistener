import React, { Component } from "react";
import { withStyles, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const styles = (theme) => ({
    ...theme.spreadThis,
    playlist: {
        textAlign: "center",
    },
    name: {
        marginBottom: 10,
    },
    saveButton: {
        margin: "auto",
        marginBottom: 20,
    },
    card: {
        display: "flex",
        position: "relative",
        marginBottom: 15,
        marginLeft: "10%",
        marginRight: "10%",
    },
});

export class PlaylistSkeleton extends Component {
    render() {
        const { classes } = this.props;

        let trackSkeleton = (
            <div className={classes.playlist}>
                <Skeleton
                    className={classes.name}
                    variant="rect"
                    animation="wave"
                    height={32}
                />
                <Skeleton
                    className={classes.saveButton}
                    variant="rect"
                    animation="wave"
                    width={161}
                    height={36}
                    component="div"
                />
                <Skeleton
                    className={classes.card}
                    variant="rect"
                    animation="wave"
                    height={108}
                />
                <Skeleton
                    className={classes.card}
                    variant="rect"
                    animation="wave"
                    height={108}
                />
                <Skeleton
                    className={classes.card}
                    variant="rect"
                    animation="wave"
                    height={108}
                />
                <Skeleton
                    className={classes.card}
                    variant="rect"
                    animation="wave"
                    height={108}
                />
                <Skeleton
                    className={classes.card}
                    variant="rect"
                    animation="wave"
                    height={108}
                />
            </div>
        );

        return trackSkeleton;
    }
}

export default withStyles(styles)(PlaylistSkeleton);
