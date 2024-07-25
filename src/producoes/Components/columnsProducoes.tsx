import { Button } from "@/components/ui/button"
import { Producoes } from "@/types/producoes"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown ,ArrowUpZA  } from "lucide-react"

export const columnsProducoes: ColumnDef<Producoes>[] = [
  {
    accessorKey: "titulo",
    header:  () => {
      return (
        <div className="text-center">Título</div>
      )
    },
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="">Ano</div>
          <ArrowUpDown className="ml-1 h-3 w-3 " />
        </Button>
      )
    },
    cell:({row})=>{
        const ano = parseInt(row.getValue("ano"))
        return <div className="px-5">{ano}</div>
    }
  },
  {
    accessorKey: "tipo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          <div className="">Tipo</div>
          <ArrowUpZA className="ml-1 h-4 w-4 " />
        </Button>
      )
    },
    cell: ({ row }) => {
      const tipo = row.getValue("tipo") as string;
      return <div className="px-5">{tipo}</div>; // Removendo o padding horizontal
    }
  },
  {
    accessorKey: "membros",
    header:  () => {
      return (
          <div className="">Membro</div>
      )
    },
    cell:({row})=>{
      const membrosJson = row.getValue('membros') as string;
      let membrosArray: string[] = [];
      // Corrigir a string JSON para um formato de array
      if(membrosJson){
      const validJsonString = membrosJson
        .replace('{', '[')      // Substituir { por [
        .replace('}', ']')      // Substituir } por ]
      try {
        membrosArray = JSON.parse(validJsonString);//Converte a string corrigida em um array de strings
      } catch (error) {
        console.error("Invalid JSON string:", membrosJson);
      }
    }else{
      console.log("MembrosJson é nulo")
    }
      return (
        <div className="">
          {membrosArray.map((membro, index) => (
            <div key={index} className="py-1 ">{membro}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "meiodivugacao",
    header:  () => {
      return (
        <div className="text-center">Meio de Divulgação</div>
      )
    },
    cell:({row})=>{
      const meiodivugacao = row.getValue("meiodivugacao") as string
      return <div className="text-justify">{meiodivugacao.replace('_', ' ')}</div>
  }

  },
  {
    accessorKey: "issn",
    header:  () => {
      return (
        <div className="text-center">ISSN</div>
      )
    },
    cell:({row})=>{
      const issn = row.getValue("issn") as string
      return <div className="text-justify">{issn.replace('_', ' ')}</div>
  }
}


]