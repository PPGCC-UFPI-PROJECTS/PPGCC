import { Button } from "@/components/ui/button"
import { Producoes } from "@/types/producoes"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"


 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

//As colunas são onde vc define o núcleo da aprarência da sua tabela. Eles definem os dados que serão exibidos, como serão formatados,
//ordenados e filtrados


 
export const columnsProducoes: ColumnDef<Producoes>[] = [
  {
    accessorKey: "titulo",
    header: "Titulo",
    cell:({row})=>{
      const titulo = row.getValue("titulo") as string
      return <div className="text-justify">{titulo}</div>
  }
  },
  {
    accessorKey: "ano",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div> Ano </div>
          <ArrowUpDown className="ml-1 h-3 w-3" />
        </Button>
      )
    },
    cell:({row})=>{
        const ano = parseInt(row.getValue("ano"))
        return <div className="text-center px-5">{ano}</div>

    }
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div> Tipo </div>
          {/* <ArrowUpDown className="ml-1 h-3 w-3" /> */}
        </Button>
      )
    },
  },
  {
    accessorKey: "membros",
    header: "Membros",

  },

]