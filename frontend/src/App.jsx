import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'bg-zinc-900 text-zinc-100 border border-zinc-800',
          duration: 3000,
        }}
      />
    </BrowserRouter>
  )
}

export default App

