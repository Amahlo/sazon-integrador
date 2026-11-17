import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import HistorialConsumoPage from './despensa/historialConsumo/components/HistorialConsumoPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header>
      <HistorialConsumoPage />
    </Header>
  </StrictMode>,
)
