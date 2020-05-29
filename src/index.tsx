import React from 'react'
import { render } from 'react-dom'
import App from './ui/App'
import './styles/index.sass'

declare global {
  interface Window {
    hbspt: any
  }
}

render(
  <App/>,
  document.getElementById('app'),
)
