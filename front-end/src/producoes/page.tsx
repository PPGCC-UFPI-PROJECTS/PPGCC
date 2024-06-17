import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'
import ChartProducoes from './Components/chart'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import Papa from 'papaparse';


export default function Producoes() {

  const api = useApi()

  const [producoes,setProducoes] = useState<any>()//Armazena os dados para download

  const generateCSV = () =>{
    const csvData = Papa.unparse(producoes, ); // Converte dados para CSV
    console.log(csvData)

  }

  

  useEffect(()=>{
    const fetchData =async ()=>{
      try {
        const producoesData = await  api.loadProducoes();
        setProducoes(producoesData)
        console.log(producoesData)
       
  
        
      } catch (error) {
        console.error('Erro ao carregar produções:', error);
        
      }
    }
    fetchData();

  },[])

  return (
    <div className='mx-auto flex flex-col gap-5 p-5'>
      <Badge 
      className="w-fit border-primary border-2 px-3 py-[0.375rem] uppercase gap-1 "variant="outline">
       <FileText size={20}/> 
       Produções
      </Badge>
      <div className=' flex justify-end'> 
      <Button className=' w-fit ' onClick={generateCSV} >Download CSV</Button>
      </div>

    <ChartProducoes/>
    </div>
  )
}
