import React from 'react'
import { AlertTriangle, AlertCircle, CheckCircle, Info } from 'lucide-react'
import { Button } from './ui/button'
import Modal from './Modal'

const ConfirmationModal = ({ confirmation, onClose }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-600" />
      case 'error':
        return <AlertCircle className="h-6 w-6 text-red-600" />
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />
      default:
        return <Info className="h-6 w-6 text-blue-600" />
    }
  }

  const getButtonVariant = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700'
      case 'error':
        return 'bg-red-600 hover:bg-red-700'
      case 'warning':
        return 'bg-yellow-600 hover:bg-yellow-700'
      default:
        return 'bg-blue-600 hover:bg-blue-700'
    }
  }

  if (!confirmation.isOpen) return null

  return (
    <Modal
      isOpen={confirmation.isOpen}
      onClose={onClose}
      size="sm"
      closeOnOverlayClick={false}
    >
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {getIcon(confirmation.type)}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {confirmation.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6">
          {confirmation.message}
        </p>
        
        <div className="flex justify-center space-x-3">
          <Button
            variant="outline"
            onClick={confirmation.onCancel}
            className="px-6"
          >
            {confirmation.cancelText}
          </Button>
          <Button
            onClick={confirmation.onConfirm}
            className={`px-6 text-white ${getButtonVariant(confirmation.type)}`}
          >
            {confirmation.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
