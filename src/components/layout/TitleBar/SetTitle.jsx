import {useTitle} from '../../../context/Title.context'
import React, { useEffect } from "react";

const SetTitle = ({
    title,
  }) => {
    const {setTitle} = useTitle();  
    useEffect(() => {
        setTitle(title);
         }, [title])
    return (<></>)
  }
  export {SetTitle};