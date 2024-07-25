
import { useApi } from "@/hooks/useApi";
import { Pessoa } from "@/types/pessoa";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area";

interface FiltroPessoasProps {
  onChange: (selectedPessoas: number[]) => void;
}

export const SelectPessoas: React.FC<FiltroPessoasProps> = ({ onChange }) => {


//export default function SelectPessoas() {
  const api = useApi()

  const [pessoa, setPessoa] = useState<Pessoa[]>([]);
  const [selectedPessoas, setSelectedPessoas] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(()=>{
    const fetchPessoa =async ()=>{
      try{
        const pessoaData = await  api.loadAutores();
        setPessoa(pessoaData);
      } catch (error) {
        console.error('Erro ao carregar :', error);        
      }
    }
    fetchPessoa();

  },[]);

  const handleCheckboxChange = (id: number) => {
    setSelectedPessoas((prevSelectedPessoas) => {
      const newSelected = prevSelectedPessoas.includes(id)
        ? prevSelectedPessoas.filter((pessoaId) => pessoaId !== id)
        : [...prevSelectedPessoas, id];
      // Update "select all" state based on individual checkbox selections
      setSelectAll(newSelected.length === pessoa.length); // Check if all are selected
      onChange(newSelected);

      return newSelected;
    });
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const allIds = pessoa.map((p) => Number(p.idpessoa));
    setSelectedPessoas(isChecked ? pessoa.map((p) =>Number( p.idpessoa)) : []);
    setSelectAll(isChecked);
    onChange(isChecked ? allIds : []);

  };

  return (

    <div className="p-4">
      <Select >
        <SelectTrigger className="w-[320px]">
          <SelectValue  placeholder="Selecione o nome da pessoa" />
        </SelectTrigger>
        <SelectContent >
        <ScrollArea className="h-96 w-[320px] rounded-md border ">
          <div className="flex h-full flex-col mt-4 ">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="select-all"
                checked={selectAll}
                onChange={handleSelectAllChange}
                className="mr-2"
              />
              <label htmlFor="select-all" className="text-sm font-medium">
                Selecionar todos
              </label>
            </div>
         
            {pessoa.map((p) => (
              <div key={p.idpessoa} className="flex items-center mb-1  ">
                <input
                  type="checkbox"
                  id={`pessoa-${p.idpessoa}`}
                  checked={selectedPessoas.includes(Number(p.idpessoa))}
                  onChange={() => handleCheckboxChange(Number(p.idpessoa))}
                  className="mr-2"
                />
                <label htmlFor={`pessoa-${p.idpessoa}`} className="text-sm font-medium">
                  {p.nomecompleto}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      
        </SelectContent>
      </Select>
      

 

    </div>
  )
}
