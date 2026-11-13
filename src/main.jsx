import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './components/Header'
import Sugerencias from './despensa/sugerencias/components/Sugerencias'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header>
      <Sugerencias />
    </Header>
  </StrictMode>,
)
