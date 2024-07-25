import { Badge } from '@/components/ui/badge'
import { DownloadIcon } from 'lucide-react';
import {SelectPessoas} from '@/filtros/selectPessoa'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useApi } from '@/hooks/useApi'
import { useEffect, useState } from 'react'
import { Producoes } from '@/types/producoes'
import { Base64 } from 'js-base64';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Filtro() {
  const api = useApi();
  const [producoes, setProducoes] = useState<any[]>([]);
  const [filteredProducoes, setFilteredProducoes] = useState<Producoes[]>([]);
  const [selectedPessoas, setSelectedPessoas] = useState<number[]>([]);

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
        setProducoes(allProducoes);
      } catch (error) {
        console.error('Erro ao carregar produções:', error);        
      }
     
    }
    fetchAllData();

  },[]);

  const handleFiltroPessoasChange = (selected: number[]) => {
    setSelectedPessoas(selected);
  };

 
  
  useEffect(() => {
    // Aplicar filtros sempre que as seleções mudarem
    const applyFilters = () => {
      const filtered = producoes.filter(producao => 
        (selectedPessoas.length === 0 || selectedPessoas.includes(producao.idpessoa))
      );
      setFilteredProducoes(filtered);
    };

    applyFilters();
  }, [selectedPessoas,producoes]);
  console.log(filteredProducoes)

  const handleDownloadCSV = async ()=>{
    
    if(selectedPessoas.length===1){     
      try {
        const arquivoData = await  api.loadProducoesFileById(selectedPessoas[0]); 
        console.log("String base 64",arquivoData)
        //Transformar o arquivo em csv 
        convertBase64toCSV(arquivoData)

      } catch (error) {
       
        console.error('Erro ao carregar produções:', error); 
      }
    }else if(selectedPessoas.length>1){
      try {
        
        const arquivoData = await  api.loadProducoesByManyIds(selectedPessoas); 
        console.log("String base 64",arquivoData)
        //Transformar o arquivo em csv 
        convertBase64toCSV(arquivoData)
      } catch (error) {
        console.error('Erro ao carregar produções:', error); 
      }
    }
    else{
      toast.error('Opps... Selecione uma pessoa.',{
        position: "top-right",
        theme: "dark",
 })
      
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

    toast.success('Operação realizada com sucesso')
    }catch(error) {
    
      console.error('Erro ao decodificar a string base64:', error);
    }
  }


  

  return (
    <div className='mx-auto flex flex-col gap-5 p-5 lg:container lg:py-5'>
      <Badge className="w-fit border-primary border-2 px-3 py-[0.375rem] uppercase gap-1 "variant="outline">
        <DownloadIcon  size={16}/>
        Download
      </Badge>

      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" w-48 h-10 mt-4 border-2">Escolha os autores</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Download</DialogTitle>
          <DialogDescription>
            Escolha os autores
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="flex items-center gap-2">
            <SelectPessoas onChange={handleFiltroPessoasChange}/>
          </div>
        </div>
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
        </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Button className=' w-fit ' onClick={handleDownloadCSV}>
          Download CSV 
    </Button>
    <ToastContainer/>

    </div>
  )
}
