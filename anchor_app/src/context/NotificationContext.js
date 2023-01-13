import React, { createContext, useState } from 'react'

export const notificationContext = createContext();
export default function NotificationContextFn({children}) {
//   const [notificationModalIsopen,setNotificationModalIsopen] = useState(false);
const [notification,setNotification] = useState('')
const [messageNotification,setMessageNotification] = useState(false)
  return (
    <notificationContext.Provider value={{notification,setNotification,messageNotification,setMessageNotification}}>
     {children}
    </notificationContext.Provider>
  )
}

