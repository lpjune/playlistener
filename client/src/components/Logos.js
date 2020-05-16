import React, { Component } from 'react';
import { withStyles, Container } from "@material-ui/core";

const styles = theme => ({
    ...theme.spreadThis,
    container: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "80%",
    },
    image: {
        width: "45%",
        margin: "auto",
    },
});

export class Logos extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Container className={classes.container}>
                <img className={classes.image} src="./images/info.png" alt="" />
            </Container>
        )
    }
}

export default withStyles(styles)(Logos);