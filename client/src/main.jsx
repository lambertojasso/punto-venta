import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Importa libreria bootstra para estilos
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import AppRouter from './routes/AppRouter.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
