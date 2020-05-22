import React from "react";
import { redirectUrlToSpotifyForLogin } from "../util/Util";
import { withStyles, Container, Button, Link } from "@material-ui/core";

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        textAlign: "center",
        marginBottom: 10,
    },
});

const SpotifyLoginButton = (props) => {
    const { classes } = props;
    return (
        <Container maxWidth={"md"} className={classes.button}>
            <Link
                href={redirectUrlToSpotifyForLogin()}
                style={{ textDecoration: "none" }}
            >
                <Button
                    variant="contained"
                    color="default"
                    startIcon={
                        <img
                            src="./images/Spotify_Icon_Black.png"
                            width="40"
                            alt="spotify logo"
                        />
                    }
                >
                    login with spotify
                </Button>
            </Link>
        </Container>
    );
};

export default withStyles(styles)(SpotifyLoginButton);
