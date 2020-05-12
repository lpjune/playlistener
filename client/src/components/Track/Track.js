import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import "./Track.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export class Track extends Component {
    renderAction() {
        if (this.props.isRemoval) {
            return (
                <button className="Track-action" onClick={this.removeTrack}>
                    {" "}
                    x{" "}
                </button>
            );
        } else {
            return <button className="Track-action"> + </button>;
        }
    }
    removeTrack = () => this.props.onRemove(this.props.track);

    render() {
    const {classes} = this.props;

        // return (
        //     <div className="Track">
        //         <div className="Track-information">
        //             <h3>{this.props.track.name}</h3>
        //             <p>{this.props.track.artist} | {this.props.track.album}</p>
        //         </div>
        //         {this.renderAction()}
        //     </div>
        // );
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        {this.props.track.artist}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {this.props.track.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {this.props.track.album}
                    </Typography>
                </CardContent>
                <CardActions>{this.renderAction()}</CardActions>
            </Card>
        );
    }
}

export default withStyles(useStyles)(Track)