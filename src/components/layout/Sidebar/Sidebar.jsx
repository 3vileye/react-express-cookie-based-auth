import {SidebarMenuItem} from './SidebarMenuItem'
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import BlindIcon from '@mui/icons-material/Blind';


const Sidebar = () => {

  return (
    <>
      <SidebarMenuItem
        to='/welcome'
        // icon='/media/icons/duotune/art/art002.svg'
        title='Dashboard'
        fontIcon='bi-app-indicator'
      >
        <HomeSharpIcon/>
      </SidebarMenuItem>
      <SidebarMenuItem
        to='/download'
        title='Download'
        fontIcon='bi-app-indicator'
      ><BlindIcon/></SidebarMenuItem>
    </>
  )
}

export {Sidebar}
