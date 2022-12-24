import React, { createContext, useState } from 'react'

export const notificationContext = createContext();
export default function NotificationContextFn({children}) {
//   const [notificationModalIsopen,setNotificationModalIsopen] = useState(false);
const [notification,setNotification] = useState('')
  return (
    <notificationContext.Provider value={{notification,setNotification}}>
     {children}
    </notificationContext.Provider>
  )
}

