import { Producoes } from "@/types/producoes"
import { ColumnDef } from "@tanstack/react-table"


 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

//As colunas são onde vc define o núcleo da aprarência da sua tabela. Eles definem os dados que serão exibidos, como serão formatados,
//ordenados e filtrados


 
export const columnsProducoes: ColumnDef<Producoes>[] = [
  {
    accessorKey: "titulo",
    header: "Titulo",
  },
  {
    accessorKey: "ano",
    header: "Ano ",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "membros",
    header: "Membros",

  },

]