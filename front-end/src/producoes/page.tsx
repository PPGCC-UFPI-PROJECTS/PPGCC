import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { DataTableProducoes } from './Components/data_tableProducoes';
import { columnsProducoes } from './Components/columnsProducoes'; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Pessoa } from '@/types/pessoa';


export default function Producoes() {

  const api = useApi()


  const [producoes,setProducoes] = useState<any>([])//Armazena os dados para download
  const [loading, setLoading] = useState(true);
  const [pessoa, setPessoa] = useState<Pessoa[]>([]);
  const [idpessoa, setIdPessoa] = useState<string>(' ');
  const [arquivo, setArquivo] = useState<any>([]);

  const handleSelectChangePessoa =  (id:string) => {
    setIdPessoa(id);
  }


  useEffect(()=>{
    const fetchData =async ()=>{
      try {
        const producoesData = await  api.loadProducoes();
        const pessoaData = await  api.loadAutores();
        setProducoes(producoesData);
        setPessoa(pessoaData);
        console.log(producoesData)
        
        
      } catch (error) {
        console.error('Erro ao carregar produções:', error);
        
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();

  },[])
  const handleDownloadCSV = async ()=>{
    if(idpessoa){
      try {
        const arquivoData = await  api.loadProducoesFileById(idpessoa); 
        setArquivo(arquivoData);  
        //Transformar o arquivo em csv 
      } catch (error) {
        console.error('Erro ao carregar produções:', error); 
      }
    }
    
   

  }


  return (
    <div className='mx-auto flex flex-col gap-5 p-5 lg:container lg:py-5'>
      <Badge 
      className="w-fit border-primary border-2 px-3 py-[0.375rem] uppercase gap-1 "variant="outline">
       <FileText size={20}/> 
       Produções
      </Badge>
      <div className=' flex flex-col items-start mt-1 gap-3'>

        <Select  onValueChange={handleSelectChangePessoa}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Selecione o nome da pessoa" />
          </SelectTrigger>
          <SelectContent>
            {
              pessoa.map((pessoa)=>(
                <SelectItem key={pessoa.idpessoa}  value={pessoa.idpessoa}  >{pessoa.nomecompleto}</SelectItem>
              )

              )
            }
          </SelectContent>
        </Select>

        <Button className=' w-fit ' onClick={handleDownloadCSV}>
          Download CSV 
        </Button>

      </div>

    <div className="">
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <DataTableProducoes columns={columnsProducoes} data={producoes} />
          )}
      </div>
    </div>
  )
}
