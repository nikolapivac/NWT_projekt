import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return (
    //if the half prop is true, we want half the size (for Name and Last Name)
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField 
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProps={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                        </IconButton>
                    </InputAdornment>
                )
            } : null}
        
        />
    </Grid>
  )
}

export default input
