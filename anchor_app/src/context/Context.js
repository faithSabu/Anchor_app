import React, { createContext, useState } from 'react'

export const modalContext = createContext();
export default function Contextfn({children}) {
  const [postUploadModalIsopen,setPostUploadModalIsopen] = useState(false);
  const [postUploaded,setpostUploaded] = useState(false)
  const [postEditDetails,setPostEditDetails] = useState({})
  return (
    <modalContext.Provider value={{postUploadModalIsopen,setPostUploadModalIsopen,postUploaded,setpostUploaded,postEditDetails,setPostEditDetails}}>
     {children}
    </modalContext.Provider>
  )
}