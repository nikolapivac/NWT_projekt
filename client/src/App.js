import React from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import logo from './images/logo.png';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';

const App = () => {
    return (
        <Container maxwidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">TITLE</Typography>
                <img src={logo} alt="logo" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;