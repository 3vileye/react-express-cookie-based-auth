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

  const initTitleContextPropsState = {
    title: 'page-title'
  }
  const TitleContext = createContext(initTitleContextPropsState)
  
  const useTitle = () => {
    return useContext(TitleContext)
  }
  
  const TitleProvider= ({children}) => {
    const [title, setTitle] = useState(initTitleContextPropsState.title)
    console.log(title);
    return (
      <TitleContext.Provider value={{title,setTitle}}>
        {children}
      </TitleContext.Provider>
    )
  }
  

  export {TitleProvider, useTitle}
  