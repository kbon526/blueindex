import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './styles/index.css'
import Router from './router.jsx'
createRoot(document.getElementById('root')).render(<HashRouter><Router /></HashRouter>)
