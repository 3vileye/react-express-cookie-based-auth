import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import {login} from '../../../_services/auth.service';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../state/auth.slice';
import { useAuth } from '../../../context/auth.context';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const theme = createTheme();
//https://www.youtube.com/watch?v=-JJFQ9bkUbo&ab_channel=DaveGray

function Login() {
  const dispatch =  useDispatch();
    const navigate = useNavigate();
    const {saveAuth, setCurrentUser} = useAuth()
    const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const res = await login({email:data.get('email'),password:data.get('password')});
   if(res.status === 200){
      const res = await axios.post(`${API_URL}/auth/GetUserDetailsFromCookie`,{});
      if(res.status === 200){
          saveAuth(true);
          setCurrentUser(res.data.userData);
          dispatch(setCredentials({ ...res.data.userData }))
          navigate('/welcome');
      }
    }
    // dispatch(setCredentials({ ...res.data }))
  };
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
export default Login;
