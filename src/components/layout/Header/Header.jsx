import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { logOut ,selectCurrentUser} from '../../../state/auth.slice';



function Header(){
    const navItems = [{name:'Home'}, {name:'Contact'}];
    const dispatch =  useDispatch();
    const navigate = useNavigate();
    const user =useSelector(selectCurrentUser)
    const handlelogout= (event)=>{
        event.preventDefault();
        dispatch(logOut());
        navigate('/login');
    }
    const handlelogin= (event)=>{
        event.preventDefault();
        navigate('/login');
    }

    return (
        <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {user?user.name:null}
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {user ? (
            <>
             {navItems.map((item) => (
              <Button key={item.name} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            ))}
            <Button onClick={(e)=>handlelogout(e)} sx={{ color: '#fff' }}>
                {'logout'}
            </Button>
            </>
          ) : (
            <>
             <Button onClick={(e)=>handlelogin(e)} sx={{ color: '#fff' }}>
                {'login'}
            </Button>
            </>
          )}
            
          </Box>
        </Toolbar>
      </AppBar>
    )
}
export default Header