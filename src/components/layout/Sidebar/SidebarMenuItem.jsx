import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import { ListItemButton,Typography, Divider,Icon } from "@mui/material";
import BlindIcon from '@mui/icons-material/Blind';


export function getCurrentUrl(pathname) {
    return pathname.split(/[?#]/)[0]
  }
  
  export function checkIsActive(pathname, url) {
    const current = getCurrentUrl(pathname)
    if (!current || !url) {
      return false
    }
  
    if (current === url) {
      return true
    }
  
    if (current.indexOf(url) > -1) {
      return true
    }
  
    return false
  }



  const SidebarMenuItem = ({
    to,
    title,
    children
  }) => {
    const {pathname} = useLocation();
    const isActive = checkIsActive(pathname, to);
    return (
      // <div className='menu-item'>
      //   <Link to={to}>
      //     {hasBullet && (
      //       <span className='menu-bullet'>
      //         <span className='bullet bullet-dot'></span>
      //       </span>
      //     )}
      //     {icon=== 'svg' && (
      //       <span className='menu-icon'>
      //         {' '}
      //       </span>
      //     )}
      //     <span className='menu-title'>{title}</span>
      //   </Link>
      //   {children}
      // </div>
      <>
        <ListItemButton disableGutters={true}
            component={Link}
            to={to}
            sx={{
            "&: hover": {
                backgroundColor:  "#c1d5f7",
                color:'white'
            },
            backgroundColor: isActive
            ? '#c1d5f7':'white' ,
            paddingY: "12px",
            paddingX: "24px",
            
          }}
        >
          {/* <Icon>HomeSharpIcon</Icon>; */}
          {children ?
          <Icon>{children}</Icon> :<BlindIcon/>}
          <Typography>{title}</Typography>
        </ListItemButton>
        <Divider />
      </>
        

    )
  }
  export {SidebarMenuItem}

  