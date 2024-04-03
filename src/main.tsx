import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {initMatomo, matomo} from "./matomo.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
initMatomo()
if (matomo) {
    matomo.customURL = window.location.protocol + '//' +
        window.location.hostname + "/"
    matomo.trackPageview()
}
