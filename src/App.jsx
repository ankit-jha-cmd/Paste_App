import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  Home  from './components/Home'
import Pastes  from './components/Pastes'
import ViewPaste from './components/ViewPastes'
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';

const routes= createBrowserRouter([
    {
      path : '/',
      element : 
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path : '/pastes',
      element : 
      <div>
        <Navbar />
        <Pastes />
      </div>
    },
    {
      path : '/pastes/:id',
      element : 
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    }
  ])

function App() {

  return(
    <>
    <Toaster />
    <RouterProvider router={routes} />
    </>
  )
}

export default App
