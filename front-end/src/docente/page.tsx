import { Badge } from "@/components/ui/badge"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import {  Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { Pessoa } from "@/types/pessoa";


   

export default function Docente() {
  const api = useApi()


  const [dataAutor,setDataAutor]= useState<Pessoa[]>([])
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const fetchData =async ()=>{
      try {
        const data = await api.loadAutores()
        console.log("Autores ",data)
        setDataAutor(data)
      } catch (error) {
        console.error("Error ao carregar os docentes", error)   
      }
     finally {
      setLoading(false);
    }
    }
    fetchData();
  },[])

  return (
    <div className="mx-auto flex flex-col p-5 lg:container lg:py-5">
    <Badge 
      className="w-fit border-primary border-2 px-3 py-[0.375rem] uppercase gap-1 "variant="outline">
       <Users size={20}/> Docentes
    </Badge>
      <div className="">
          {loading ? (
            <div>Carregando...</div>
          ) : (
            <DataTable columns={columns} data={dataAutor} />
          )}
      </div>
    </div>
  )
}
