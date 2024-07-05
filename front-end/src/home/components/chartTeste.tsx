import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
// import axios from "axios";


export default function chartTeste() {
  const api = useApi()
  // const url = "http://localhost:3000/producoes"

  //Primeiramente criar um gráfico em branco

  const options: ApexOptions = {
    chart: {
      type: 'bar', 
      height: 350,
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
        dataLabels: {
          total: {//Mostrar o total no topo
            enabled: true,
            offsetX: -20,   // Ajuste horizontal
            style: {
              color: '#FFFFFF',
              fontSize: "12px",
              fontWeight: 900,
            }
          },
        },
      }
    },
    xaxis: {
      categories: [
        "2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022"
      ],
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

  const [nProducoes,setNProducoes] = useState<any>()//Armazenar o número de produções
  const [series, setSeries] = useState<any>([]);


  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const producoesData = await  api.loadProducoesByYear();
        
        console.log("Olá ", producoesData)

        setNProducoes(producoesData.ano)
              
      } catch (error) {
        console.error('Erro ao carregar produções:', error);    
      }
    }
    fetchData();

  },[])

  useEffect(()=>{
    //Atualiza a série de dados quando nProducoes muda

    // Atualiza a série de dados
    setSeries([{
      name: 'Nº Producoes',
      data: nProducoes,  
    }]);
    console.log("Series " + series)

  },[nProducoes])




  return (
    <Chart options={options} series={series} type="bar" height={384} width={450}/>
  )
}
