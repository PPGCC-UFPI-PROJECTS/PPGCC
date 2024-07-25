import { Badge } from '@/components/ui/badge'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react';
import { useApi } from '@/hooks/useApi';
import { DataTableProducoes } from './Components/data_tableProducoes';
import { columnsProducoes } from './Components/columnsProducoes'; 
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
import { SelectPessoas } from '@/filtros/selectPessoa';
import { SelectProducoes } from '@/filtros/selectProducoes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function Producoes() {

  const api = useApi()


  const [producoes,setProducoes] = useState<any[]>([])//Armazena os dados para download
  const [loading, setLoading] = useState(true);
  const [filteredProducoes, setFilteredProducoes] = useState<any[]>([]);
  const [selectedPessoas, setSelectedPessoas] = useState<number[]>([]);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);


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
      finally {
        setLoading(false);
      }
    }
    fetchAllData();

  },[]);

  const handleFiltroPessoasChange = (selected: number[]) => {
    setSelectedPessoas(selected);
  };

  const handleFiltroProducoesChange = (selected: string[]) => {
    setSelectedTipos(selected);
  };
  
  useEffect(() => {
    // Aplicar filtros sempre que as seleções mudarem
    const applyFilters = () => {
      const filtered = producoes.filter(producao => 
        (selectedTipos.length === 0 || selectedTipos.includes(producao.tipo)) &&
        (selectedPessoas.length === 0 || selectedPessoas.includes(producao.idpessoa))&&
        (startYear === null || producao.ano >= startYear) &&
        (endYear === null || producao.ano <= endYear)
        
      );
      setFilteredProducoes(filtered);
    };

    applyFilters();
  }, [selectedTipos, selectedPessoas, startYear, endYear, producoes]);
  console.log(filteredProducoes)


  return (
    <div className='mx-auto flex flex-col gap-5 p-5 lg:container lg:py-5 '>
      <Badge 
      className="w-fit border-primary border-2 px-3 py-[0.375rem] uppercase gap-1 "variant="outline">
       <FileText size={20}/> 
       Produções
      </Badge>
      <div className=' flex flex-col items-start mt-1 gap-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className=" w-48 h-10 mt-4 border-2 bg-input text-white rounded-md shadow-md">Aplique um filtro</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 ">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">Filtros</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Escolha os filtros
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              <div className="flex items-center gap-2">
                <SelectPessoas onChange={handleFiltroPessoasChange}/>
              </div>
              <div className="flex items-center gap-2">
                <SelectProducoes onChange={handleFiltroProducoesChange}/>
              </div>
              <div className="flex items-center gap-4">
              <div className='flex items-center space-x-2 gap-2'>
                <Label className='flex flex-col gap-2'>
                    Ano Início:
                        <Input className='mt-1 p-2 border rounded-md bg-input text-white' type="number" value={startYear ?? ''} onChange={(e) => setStartYear(Number(e.target.value))} />
                </Label>
                <Label className='flex flex-col gap-2'>
                        Ano Fim:
                        <Input className='mt-1 p-2 border rounded-md bg-input text-white' type="number" value={endYear ?? ''} onChange={(e) => setEndYear(Number(e.target.value))} />
                </Label>
                </div>
                  </div>
                </div>
                <DialogFooter className='flex justify-end gap-4'>
                <DialogClose asChild>
                    <Button className='  rounded-md shadow-md px-4 py-2' type="button" variant="secondary">
                      Fechar
                    </Button>
                </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>


      </div>
    <div className="rounded-lg shadow-lg w-full">
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <DataTableProducoes columns={columnsProducoes} data={filteredProducoes} />
          )}
      </div>
    </div>
  )
}
