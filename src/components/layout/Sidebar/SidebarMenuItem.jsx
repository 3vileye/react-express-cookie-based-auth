import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'



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
    children,
    to,
    title,
    icon,
    fontIcon,
    hasBullet = false,
  }) => {
    const {pathname} = useLocation()
    const isActive = checkIsActive(pathname, to)
  
    return (
      <div className='menu-item'>
        <Link to={to}>
          {hasBullet && (
            <span className='menu-bullet'>
              <span className='bullet bullet-dot'></span>
            </span>
          )}
          {icon=== 'svg' && (
            <span className='menu-icon'>
              {' '}
            </span>
          )}
          <span className='menu-title'>{title}</span>
        </Link>
        {children}
      </div>
    )
  }
  export {SidebarMenuItem}

  