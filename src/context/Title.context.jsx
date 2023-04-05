import {
    useState,
    createContext,
    useContext
  } from 'react'

  const initTitleContextPropsState = {
    title: null
  }
  const TitleContext = createContext(initTitleContextPropsState)
  
  const useTitle = () => {
    return useContext(TitleContext)
  }
  
  const TitleProvider= ({children}) => {
    const [title, setTitle] = useState(initTitleContextPropsState.title)
    return (
      <TitleContext.Provider value={{title,setTitle}}>
        {children}
      </TitleContext.Provider>
    )
  }
  

  export {TitleProvider, useTitle}
  