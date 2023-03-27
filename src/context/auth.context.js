import {
    useState,
    useEffect,
    createContext,
    useContext,
    useRef,
  } from 'react'
import { useDispatch } from 'react-redux';
import { logOut,setCredentials } from '../state/auth.slice';
import axios from 'axios';

const AUTH_LOCAL_STORAGE_KEY = 'isLogedIn'
const getAuth = () => {
    if (!localStorage) {
      return
    }
    try {
    const auth = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
    if (auth) {
        return auth
      }
    } catch (error) {
      console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
    }
  }
  const setLocalStorage = (auth) => {
    if (!localStorage) {
      return
    }
    try {
      localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, auth)
    } catch (error) {
      console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
    }
  }
  
  const removeAuth = () => {
    if (!localStorage) {
      return
    }
  
    try {
      localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    } catch (error) {
      console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
    }
  }
  const initAuthContextPropsState = {
    auth: getAuth(),
    saveAuth: () => {},
    currentUser: undefined,
    setCurrentUser: () => {},
    logout: () => {},
  }

  
  const AuthContext = createContext(initAuthContextPropsState)
  
  const useAuth = () => {
    return useContext(AuthContext)
  }
  
  const AuthProvider= ({children}) => {
    const [auth, setAuth] = useState(getAuth())
    const [currentUser, setCurrentUser] = useState()
    const saveAuth = async (auth) => {
        setAuth(auth)
      if (auth) {
        setLocalStorage(auth)
      } else {
        removeAuth()
      }
    }
  
    const logout = () => {
      saveAuth(undefined)
      setCurrentUser(undefined)
    }
  
    return (
      <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  const AuthInit = ({children}) => {
    const {auth, logout, setCurrentUser} = useAuth()
    const didRequest = useRef(false)
    const dispatch =  useDispatch();
    useEffect(() => {
      const requestUser = async () => {
        try {
          if (localStorage.getItem('isLogedIn')) {
            const res = await axios.post('http://localhost:8001/auth/GetUserDetailsFromCookie',{});
            if(res.status === 200){
                dispatch(setCredentials({ ...res.data.userData }));
                setCurrentUser(res.data.userData)
            }
          }
        } catch (error) {
          if (!localStorage.getItem('isLogedIn')) {
             dispatch(logOut());
             logout();
          }
        }
        return () => (didRequest.current = true)
      }
  
      if (localStorage.getItem('isLogedIn')) {
        requestUser()
      }
       else {
        logout();
        dispatch(logOut());
      }
    }, [])
    return <>{children}</>
  }
  export {AuthProvider, AuthInit, useAuth}
  