import React, { useState } from 'react'
import AppRoutes from './routes/AppRoutes';
import LandingPage from './pages/LandingPage';
import {Toaster} from 'sonner'

const App = () => {

  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <>
        <Toaster
          position="top-right"  
          richColors           
          expand={true}        
        />
        <AppRoutes />

      </>
      {/* <LandingPage/> */}
    </div>
  )
}

export default App