import './App.css'
import Router from './router/Router'
import { ToastContainer } from 'react-toastify';
function App() {

  return (
    <div className='bg-slate-50'>
      <Router />
      <ToastContainer />
    </div>
  )
}

export default App
