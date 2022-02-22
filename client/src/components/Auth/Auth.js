import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from "@material-ui/core";
import useStyles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../actions/auth';

const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useState for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  //useState for switching between Sign In and Sign Up
  const [isSignUp, setIsSignUp] = useState(false);
  //useState for data we're getting from the sign up form
  const [formData, setFormData] = useState(initialState);

  //show/hide password toggle
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  //Sing Up - Sign In toggle
  const switchMode = () => {
      setIsSignUp((prevIsSignUp) => !prevIsSignUp);
      setShowPassword(false);
    }

  //defining what happens after clicking the Sign Up/In button
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignUp) {
      dispatch(signup(formData, navigate));
    } 
    else {
      dispatch(signin(formData, navigate));
    }
  }
  //filling in the form
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <FontAwesomeIcon icon={faLock} />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
              {
                isSignUp && (
                  <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                  </>
                )
              }
              <Input name="email" label="Email address" handleChange={handleChange} type="email" /> 
              <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} /> 
              { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/>}
          </Grid>
          <Button type="submit" fullWidth variant="contained" className={classes.submit}>
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button className={classes.button} onClick={switchMode}>
                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
