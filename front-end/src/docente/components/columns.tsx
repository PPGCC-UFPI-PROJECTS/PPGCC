import { Pessoa } from "@/types/pessoa"
import { ColumnDef } from "@tanstack/react-table"

 
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
    header: () => <div className="text-center">Resumo</div>,
    cell:({row})=>{
      const resumo = row.getValue("resumo") as string
      return <div className="text-justify">{resumo}</div>
  }

  },

  
]