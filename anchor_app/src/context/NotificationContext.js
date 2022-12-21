import React, { createContext, useState } from 'react'

export const notificationContext = createContext();
export default function NotificationContextFn({children}) {
//   const [notificationModalIsopen,setNotificationModalIsopen] = useState(false);
const [notificationModalIsopen,setNotificationModalIsopen] = useState(false);
  return (
    <notificationContext.Provider value={{notificationModalIsopen,setNotificationModalIsopen}}>
     {children}
    </notificationContext.Provider>
  )
}

