import { useApi } from "@/hooks/useApi";
import { Producoes } from "@/types/producoes";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


  interface FiltroProducoesProps {
    onChange: (selectedTipos: string[]) => void;
  }
  
  export const SelectProducoes: React.FC<FiltroProducoesProps> = ({ onChange }) => {
//export default function SelectProducoes() {
    const api = useApi()

    const [producoes,setProducoes] = useState<Producoes[]>([])//Armazena os dados para download
    const [tipoProducoes, setTipoProducoes] = useState<string[]>([]);
    const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  
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
          //Extrair o tipos das produções
          //Set estrutura que armazena valores únicos
          const tiposUnicos = [...new Set(allProducoes.map((producoes:any)=>producoes.tipo))]
          setTipoProducoes(tiposUnicos)
        } catch (error) {
          console.error('Erro ao carregar produções:', error);        
        }
      }
      fetchAllData();
  
    },[]);

    //Função para alternar a seleção
    const handleCheckboxChangeTipo = (tipo: string) => {
        setSelectedTipos((prevSelectedTipos) => {
            const newSelected = prevSelectedTipos.includes(tipo)
              ? prevSelectedTipos.filter((t) => t !== tipo)
              : [...prevSelectedTipos, tipo];
            onChange(newSelected);
            return newSelected;
        });
      };
  
  return (
    <div className="p-4">
      <Select >
        <SelectTrigger className="w-[320px]">
          <SelectValue placeholder="Selecione o tipo de procução" />
        </SelectTrigger>
        <SelectContent>
          <div className="flex flex-col mt-4">
            {tipoProducoes.map((tipo) => (
              <div key={tipo} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={`tipo-${tipo}`}
                  checked={selectedTipos.includes(tipo)}
                  onChange={() => handleCheckboxChangeTipo(tipo)}
                  className="mr-2"
                />
                <label htmlFor={`tipo-${tipo}`} className="text-sm font-medium">
                  {tipo}
                </label>
              </div>
            ))}
          </div>
      
        </SelectContent>
      </Select>



    </div>
  )
}
