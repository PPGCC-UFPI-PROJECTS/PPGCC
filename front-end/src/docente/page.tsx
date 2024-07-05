import { Badge } from "@/components/ui/badge"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import {  Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";


type Docente = {
  id: string
  name: string
  qualificacao: string
  resumo:string
  numeroCurriculo:string
  producoes:number

}
 
export const docentes: Docente[] = [
  
      {
        id: "728ed52f",
        name: "Fernando",
        qualificacao: "Pós-Doutorado",
        resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
        numeroCurriculo: "34",
        producoes: 7
      },
      // {
      //   id: "d392a5b3",
      //   name: "Mariana",
      //   qualificacao: "Mestrado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "21",
      //   producoes: 12
      // },
      // {
      //   id: "c4789d5a",
      //   name: "Ricardo",
      //   qualificacao: "Graduação",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "47",
      //   producoes: 14
      // },
      // {
      //   id: "8471d392",
      //   name: "Beatriz",
      //   qualificacao: "Doutorado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "59",
      //   producoes: 8
      // },
      // {
      //   id: "a1958c4b",
      //   name: "Carlos",
      //   qualificacao: "Especialização",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "28",
      //   producoes: 13
      // },
      // {
      //   id: "9d748b5e",
      //   name: "Juliana",
      //   qualificacao: "Pós-Doutorado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "33",
      //   producoes: 11
      // },
      // {
      //   id: "6a92f8d3",
      //   name: "Gabriel",
      //   qualificacao: "Mestrado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "17",
      //   producoes: 16
      // },
      // {
      //   id: "f1a68247",
      //   name: "Ana",
      //   qualificacao: "Doutorado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "42",
      //   producoes: 9
      // },
      // {
      //   id: "3749db15",
      //   name: "Eduardo",
      //   qualificacao: "Graduação",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "19",
      //   producoes: 10
      // },
      // {
      //   id: "529a1d38",
      //   name: "Patrícia",
      //   qualificacao: "Especialização",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "56",
      //   producoes: 10
      // },
      // {
      //   id: "9182d65c",
      //   name: "Vinícius",
      //   qualificacao: "Mestrado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "31",
      //   producoes: 12
      // },
      // {
      //   id: "489e1d42",
      //   name: "Antônio",
      //   qualificacao: "Doutorado",
      //   resumo: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi ad facilis laboriosam quibusdam. Asperiores quisquam vel deleniti? Adipisci, vero. Voluptas optio vitae quos sed expedita harum nemo non doloremque libero!",
      //   numeroCurriculo: "67",
      //   producoes: 20
      // }
    ]
    

export default function Docente() {
  const api = useApi()


  const [dataAutor,setDataAutor]= useState<any>([])
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
