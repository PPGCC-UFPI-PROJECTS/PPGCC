import ChartDocente from "./components/chartDocente"
import ChartTeste from "./components/chartTeste"




export default function Home() {
  
      
  return (

    <div className="pb-8 py-8 px-5 ">
        <h1 className='text-lg font-semibold text-start pb-8'>Visão Geral do Programa de Pós Graduação</h1>
        <div className="flex flex-wrap justify-center gap-5">
            <div className="flex justify-center"> 
                <ChartDocente/>
            </div> 
            <div className="flex justify-center"> 
                <ChartTeste/>
            </div>            
        </div>         
    </div>

    

        
  
  )
}
