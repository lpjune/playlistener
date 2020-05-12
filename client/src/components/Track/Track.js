import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = ({
    root: {
        minWidth: 275
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    artist: {
        fontSize: 14,
    },
    album: {
        marginBottom: 8,
    },
});

export class Track extends Component {
    renderAction() {
        if (this.props.isRemoval) {
            return (
                <Button className="Track-action" onClick={this.removeTrack}>
                    {" "}
                    x{" "}
                </Button>
            );
        } else {
            return <Button className="Track-action"> + </Button>;
        }
    }
    removeTrack = () => this.props.onRemove(this.props.track);

    render() {
    const {classes} = this.props;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        className={classes.artist}
                        color="textSecondary"
                        gutterBottom
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
                <CardActions>{this.renderAction()}</CardActions>
            </Card>
        );
    }
}

export default withStyles(useStyles)(Track)