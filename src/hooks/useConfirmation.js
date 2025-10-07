import { useState, useCallback } from 'react'

const useConfirmation = () => {
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    onConfirm: null,
    onCancel: null,
    type: 'warning'
  })

  const confirm = useCallback(({
    title = 'Confirmar acción',
    message = '¿Estás seguro de que quieres realizar esta acción?',
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    onConfirm,
    onCancel,
    type = 'warning'
  }) => {
    return new Promise((resolve) => {
      setConfirmation({
        isOpen: true,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: () => {
          if (onConfirm) onConfirm()
          setConfirmation(prev => ({ ...prev, isOpen: false }))
          resolve(true)
        },
        onCancel: () => {
          if (onCancel) onCancel()
          setConfirmation(prev => ({ ...prev, isOpen: false }))
          resolve(false)
        },
        type
      })
    })
  }, [])

  const close = useCallback(() => {
    setConfirmation(prev => ({ ...prev, isOpen: false }))
  }, [])

  return {
    confirmation,
    confirm,
    close
  }
}

export default useConfirmation
