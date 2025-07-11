import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavRouter from './router/routers.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={NavRouter}/>
  </React.StrictMode>
)