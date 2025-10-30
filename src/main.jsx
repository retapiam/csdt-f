import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { quickDatabaseTest, testDatabaseConnection } from './utils/testDatabaseConnection'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Exponer utilidades de prueba en window para ejecución desde consola
if (typeof window !== 'undefined') {
  window.quickDatabaseTest = quickDatabaseTest
  window.testDatabaseConnection = testDatabaseConnection
}
