import React, { createContext, useContext, useEffect } from 'react'
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

  // Escuchar eventos globales para disparar notificaciones desde capas sin contexto
  useEffect(() => {
    const handler = (ev) => {
      const detail = ev?.detail || {}
      const { type = 'info', message = '', options = {} } = detail
      const map = {
        success: notificationHook.success,
        error: notificationHook.error,
        warning: notificationHook.warning,
        info: notificationHook.info
      }
      const fn = map[type] || notificationHook.info
      fn(message, options)
    }
    window.addEventListener('csdt:notify', handler)
    return () => window.removeEventListener('csdt:notify', handler)
  }, [notificationHook])

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
