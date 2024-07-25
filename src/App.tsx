import Header from "./components/ui/header";
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Router from './router'

export default function App() {
  return (
   
    <BrowserRouter>
       <Header />
        <div className="flex-1">
            <Router/>
        </div>
    </BrowserRouter> 
    
  )
}