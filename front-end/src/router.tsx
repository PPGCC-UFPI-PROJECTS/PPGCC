import {Routes,Route} from 'react-router-dom'
import Home from './home/page'
import Docente from './docente/page'
import Producoes from './producoes/page'

export default function Router() {
  return (

    <Routes>
      <Route path='/' 
                  element={<Home/>  } />

      <Route path='/docente' 
                  element={<Docente/>  } />
      <Route path='/producoes' 
                  element={<Producoes/>  } />
    </Routes>
    
  )
}
