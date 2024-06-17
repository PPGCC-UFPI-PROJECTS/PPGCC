import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

//As colunas são onde vc define o núcleo da aprarência da sua tabela. Eles definem os dados que serão exibidos, como serão formatados,
//ordenados e filtrados

export type Docente = {
    id: string
    name: string
    qualificacao: string
    resumo:string
    numeroCurriculo:string
    producoes:number
  }
 
export const columns: ColumnDef<Docente>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "qualificacao",
    header: "Qualificação ",
  },
  {
    accessorKey: "resumo",
    header: "Resumo",
  //   cell:({row})=>{
      
  //     return <div className="font-medium ">{row}</div>

  // }
  },

  {
    accessorKey: "producoes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-left">Nº de produções</div>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell:({row})=>{
        const producoes = parseInt(row.getValue("producoes"))
        return <div className="text-center px-5">{producoes}</div>

    }
  },
]