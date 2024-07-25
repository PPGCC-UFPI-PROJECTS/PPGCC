import { useApi } from '@/hooks/useApi';
import  { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { SelectProducoes } from '@/filtros/selectProducoes';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChartTipo() {
    const api = useApi()

    
  const [producoes,setProducoes] = useState<any[]>([])//Armazena os dados para download
  const [filteredProducoes, setFilteredProducoes] = useState<any[]>([]);
  const [selectedTipos, setSelectedTipos] = useState<string[]>([]);
  const [startYear, setStartYear] = useState<number | null>(null);
  const [endYear, setEndYear] = useState<number | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);

  const options: ApexOptions = {
    chart: {
      type: 'bar', 
      stacked:false,//empilhar os dados
      toolbar: {
        show: true,
        tools: {
          download: true,//Permite baixar o gráfico em (PNG,SVG,CSV)
          selection: true,//Habilita a seleção de uma área do gráfico.
          zoom: true,//
          zoomin: true,
          zoomout: true,
          pan: true,//Habilita a funcionalidade de panorâmica, permitindo ao usuário mover o gráfico enquanto está com o zoom ativado
          reset: true//Voltar o gráfico ao estado inicial
        }
      },
    background: '#161717' // Cor de fundo escura
    },
    theme:{
      mode:'dark',
      palette: 'palette1', // Define uma paleta de cores específica
  
    },
   
    plotOptions:{//Opções
      bar:{
        horizontal:false,
        borderRadius: 2,
        dataLabels: {
          total: {//Mostrar o total no topo
            enabled: true,
            offsetX: -8,   // Ajuste horizontal
            style: {
              color: '#FFFFFF',
              fontSize: "10px",
              fontWeight: 900,
            }
          },
        },
      }
    },
    xaxis: {
      categories: availableTypes,
      labels: {
        show: true,
        style: {
          colors: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
  dataLabels: {
      enabled: true
  },
  // series: [],
  title: {
      text: 'Distribuição por Tipo de Produção ',
  },
  noData: {
    text: 'Loading...'
  },
  tooltip: {
    theme: 'dark', // Tema do tooltip, pode ser 'dark' ou 'light'
    style: {
      fontSize: '12px',
      fontFamily: undefined,
    }
  },

  
}

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
            //Extrair anos e tipos disponíveis e transforma em um array
            const anos = Array.from(new Set(allProducoes.map((item: any) => item.ano))).sort();
            const tipos = Array.from(new Set(allProducoes.map((item: any) => item.tipo.toUpperCase())));
            setAvailableYears(anos.map(Number));
            setAvailableTypes(tipos);

          } catch (error) {
            console.error('Erro ao carregar produções:', error);        
          }
        }
        fetchAllData();
    
      },[]);
    
      const handleFiltroProducoesChange = (selected: string[]) => {
        setSelectedTipos(selected);
      };


      useEffect(() => {
        // Aplicar filtros sempre que as seleções mudarem
        const applyFilters = () => {
          const filtered = producoes.filter(producao => 
            (selectedTipos.length === 0 || selectedTipos.includes(producao.tipo)) &&
            (startYear === null || producao.ano >= startYear) &&
            (endYear === null || producao.ano <= endYear)
            
          );
          setFilteredProducoes(filtered);
        };
    
        applyFilters();
      }, [selectedTipos, startYear, endYear, producoes]);

      //Dados para o gráfico
      const tipos = Array.from(new Set(filteredProducoes.map(item => item.tipo)));
      const counts = tipos.map(tipo => filteredProducoes.filter(item => item.tipo === tipo).length);

      const series = [{
        name: 'Quantidade',
        data: counts,
        color:"#32CD32"
        
    }];




  return (
        <div className='flex flex-col items-start gap-3'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className=" w-40 h-8 shadow-md bg-input border-2 border-solid" >Aplique um filtro</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto rounded-lg p-6">
            <DialogHeader>
              <DialogTitle  className="text-lg font-semibold">Filtros</DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                Escolha os filtros
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4">
              <div className="flex items-center gap-2">
              <div className='flex items-center space-x-2 gap-2'>
                <Label className="flex flex-col gap-2">
                    Ano Início:
                        <Input className='mt-1 p-2 border-2 bg-input rounded' type="number" value={startYear ?? ''} onChange={(e) => setStartYear(Number(e.target.value))} />
                </Label>
                <Label className="flex flex-col gap-2">
                        Ano Fim:
                        <Input className='mt-1 p-2 border-2 bg-input  rounded' type="number" value={endYear ?? ''} onChange={(e) => setEndYear(Number(e.target.value))} />
                </Label>
                </div>
                  </div>
                </div>
                <DialogFooter className='flex justify-end gap-4' >
                <DialogClose asChild>
                    <Button type="button" variant="secondary" className="rounded-md shadow-md px-4 py-2">
                      Fechar
                    </Button>
                </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        <Chart options={options} series={series} type="bar" height={400} width={400}/>
    </div>
  )
}
