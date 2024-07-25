import ChartTipo from "./components/chartTipo"
import ChartYear from "./components/chartYear"




export default function Home() {
  
      
  return (

    <div className="pb-8 py-8 px-5 ">
        <h1 className='text-lg font-semibold text-start pb-8'>Visão Geral do Programa de Pós Graduação</h1>
        <div className="flex flex-wrap gap-5">
            <div className="flex items-center"> 
                <ChartYear/>
            </div>      
            <div className="flex  items-center"> 
                <ChartTipo/>
            </div>        
        </div>         
    </div>

    

        
  
  )
}
