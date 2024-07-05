import { Button } from "@/components/ui/button"
import { Pessoa } from "@/types/pessoa"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

//As colunas são onde vc define o núcleo da aprarência da sua tabela. Eles definem os dados que serão exibidos, como serão formatados,
//ordenados e filtrados

 
export const columns: ColumnDef<Pessoa>[] = [
  {
    accessorKey: "nomecompleto",
    header: "Nome",
  },
  {
    accessorKey: "qualificacao",
    header: "Qualificação ",
  },
  {
    accessorKey: "resumo",
    header: "Resumo",

  },

  {
    accessorKey: "producoes",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="text-left text-[0.8rem]">Nº de produções</div>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
    cell:({row})=>{
        const producoes = parseInt(row.getValue("producoes"))
        return <div className="text-center px-5">{producoes}</div>

    }
  },
]