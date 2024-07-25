import {Routes,Route} from 'react-router-dom'
import Home from './home/page'
import Docente from './docente/page'
import Producoes from './producoes/page'
import Download from './dowload/page'
import Login from './login/page' 


export default function Router() {
  return (

    <Routes>
      <Route path='/' 
                  element={<Login/>  } />
      <Route path='/home' 
                  element={<Home/>  } />
      <Route path='/docente' 
                  element={<Docente/>  } />
      <Route path='/producoes' 
                  element={<Producoes/>  } />
      <Route path='/download' 
                  element={<Download/>  } />
    </Routes>
    
  )
}
