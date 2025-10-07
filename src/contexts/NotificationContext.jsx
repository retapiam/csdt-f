import React, { createContext, useContext } from 'react'
import useNotifications from '@hooks/useNotifications'
import NotificationContainer from '@components/NotificationContainer'

const NotificationContext = createContext()

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de NotificationProvider')
  }
  return context
}

export const NotificationProvider = ({ children }) => {
  const notificationHook = useNotifications()

  return (
    <NotificationContext.Provider value={notificationHook}>
      {children}
      <NotificationContainer
        notifications={notificationHook.notifications}
        onRemove={notificationHook.removeNotification}
      />
    </NotificationContext.Provider>
  )
}
