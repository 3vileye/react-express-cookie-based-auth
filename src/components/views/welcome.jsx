import React,{useState} from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
const API_URL = import.meta.env.VITE_API_URL;

function Welcome(){
    const [progress, setProgress] = useState(0);
    const [open, setOpen] = useState(false);
    const handleDownload = async (event) => {
        event.preventDefault();
        await axios({
            url: `${API_URL}/auth/download/file`,
            method: "GET",
            responseType: "blob", // important
            onDownloadProgress: (progressEvent) => {
                setOpen(!open);
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
                console.log(percentCompleted);
                setProgress((prevProgress) => (percentCompleted));
                if(percentCompleted===100){
                    setOpen(false);
                }
            }
        })
    };
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={(e)=>handleDownload(e)} variant="contained">Download</Button>
                <Backdrop
                    sx={{ color: '#fff',width: '100%' }}
                    open={open}
                    >
                    {/* <LinearProgress size={50}
                        thickness={4} variant="determinate" value={progress} /> */}
                        <span>{progress}</span>
                    <CircularProgress size={100}
                        thickness={4}
                        variant="determinate" value={progress} />
                </Backdrop>
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
function Copyright() {
    
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
export default Welcome