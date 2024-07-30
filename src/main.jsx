import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from "sonner"
import { RouterProvider } from 'react-router-dom'
import appRouter from './routes/user/userRoutes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster closeButton postion="bottom-right"/>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)
