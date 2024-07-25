import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
// import axios from "axios";


export default function chartYear() {
  const api = useApi()

  const [series, setSeries] = useState<any[]>([]);
  const [years, setYears] = useState<any[]>([]);//Armazenar os anos

  const options: ApexOptions = {
    chart: {
      type: 'bar', 
    // height: 350,
      stacked:true,//empilhar os dados
      
      
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
      categories: years,
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
      enabled: false
  },
  // series: [],
  title: {
      text: 'Nº de produções por ano ',
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
  }
  
}

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const producoesData = await  api.loadProducoesByYear();
        const yearsData = producoesData.map( (data :any)=> data.ano.toString())
        const productionsData = producoesData.map( (data :any)=> data.count)

        setYears(yearsData)
        setSeries([{
          name: 'Nº de produções' ,
          data: productionsData,
          color:"#FF6347"
        }]);
      } catch (error) {
        console.error('Erro ao carregar produções:', error);    
      }
    }
    fetchData();
  },[])

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={450} width={850}/>
    </div>
  )
}
