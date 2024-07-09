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
import {Base64} from 'js-base64'



export default function Producoes() {

  const api = useApi()


  const [producoes,setProducoes] = useState<any>([])//Armazena os dados para download
  const [loading, setLoading] = useState(true);
  const [pessoa, setPessoa] = useState<Pessoa[]>([]);
  const [idpessoa, setIdPessoa] = useState<number>(0);

  const handleSelectChangePessoa =  (id:number) => {
    setIdPessoa(id);
  }


  useEffect(()=>{
    const fetchAllData =async ()=>{
      let allProducoes: any[] = [];
      let currentPage = 1;
      const pageSize =30;
      let hasMoreData = true;

      try {
        while (hasMoreData) {
          const producoesData = await  api.loadProducoes(currentPage,pageSize);
          allProducoes = [...allProducoes, ...producoesData];

          if (producoesData.length < pageSize) {
            hasMoreData = false;
          }
          currentPage++;
        } 
        
        const pessoaData = await  api.loadAutores();
        
        setProducoes(allProducoes);
        setPessoa(pessoaData);
        
      } catch (error) {
        console.error('Erro ao carregar produções:', error);
        
      }
      finally {
        setLoading(false);
      }
    }
    fetchAllData();

  },[])



  const handleDownloadCSV = async ()=>{
    
    if(idpessoa){    
      try {
        const arquivoData = await  api.loadProducoesFileById(idpessoa); 
        //Transformar o arquivo em csv 
        convertBase64toCSV(arquivoData)

      } catch (error) {
        console.error('Erro ao carregar produções:', error); 
      }
    }
  }

  const convertBase64toCSV = (base64:string)=> {
    try{
    let binary_string = Base64.decode(base64) //Decodifica a string base64
    console.log(binary_string)
    const blob = new Blob([binary_string], { type: 'text/csv;charset=utf-8' }) //Criar um blob (arquivo grande com dados sem uma estrutura)
    const url = URL.createObjectURL(blob) //Cria um URL para o Blob
    const link = document.createElement('a'); // Cria um link
    link.href = url
    link.download = "producoes.csv"//Define o nome do arquivo 
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link); // Remove o link do DOM
    URL.revokeObjectURL(url); // Revoga a URL


    }catch(error) {
      console.error('Erro ao decodificar a string base64:', error);
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

        <Select  onValueChange={(value:string)=>handleSelectChangePessoa(parseInt(value))}>
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
