import React, { createContext, useState } from 'react'

export const modalContext = createContext();
export default function Contextfn({children}) {
  const [postUploadModalIsopen,setPostUploadModalIsopen] = useState(false);
  const [postUploaded,setpostUploaded] = useState(false)
  return (
    <modalContext.Provider value={{postUploadModalIsopen,setPostUploadModalIsopen,postUploaded,setpostUploaded}}>
     {children}
    </modalContext.Provider>
  )
}