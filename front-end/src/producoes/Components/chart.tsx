import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';

export default function ChartProducoes() {
    const options: ApexOptions = {
        chart: {
          type: 'line', 
          height: 350,
          stacked:false,//empilhar os dados usado em gráficos de barra
          
          
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
    
        
        dataLabels: {
          enabled: false,
          
        },
        stroke: {//Controlar a aparencia das linhas nos gráficos de linha
          curve: 'smooth'
        },
        title: {
          text: 'Discente-Mestrado',
          align: 'left',
          style: {
            color: '#FFFFFF' // Cor do título ajustada para contraste com o fundo escuro
          }
        },
        grid: {//Definir as propriedades do de linhas e colunas
          borderColor: '#FFFFFF', // Cor das linhas da grade
        // row: {
        //   colors: ['#f3f3f3', 'transparent'],
        //   opacity: 0.5
        // },
        // column: {
        //   // width: '50%' // Largura das colunas
        // }
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
        yaxis: {
          labels: {
            style: {
              colors: '#FFFFFF', // Cor das labels do eixo y ajustada para contraste
            }
          }
        },
        legend: {
          labels: {
            colors: '#FFFFFF' // Cor das labels da legenda ajustada para contraste
          }
        },
        tooltip: {
          theme: 'dark', // Tema do tooltip, pode ser 'dark' ou 'light'
          style: {
            fontSize: '12px',
            fontFamily: undefined,
          }
        }
     
    
    
      };
      
      const series = [
        {
          name: "Matriculado",
          data: [9, 20, 27, 33, 36, 37, 37, 33, 38, 33, 21],
        },
        {
          name: "Titulado",
          data: [0, 0, 8, 8, 18, 13, 20, 15, 16, 14, 18],
        },
        {
          name: "Desligado",
          data: [1, 0, 3, 0, 0, 2, 4, 3, 0, 4, 7],
        },
        {
          name: "Abandonou",
          data: [0, 0, 1, 1, 1, 1, 0, 2, 2, 1, 0],
        },
      ];
  return (
    <div className="pb-8 py-8 px-5 ">
        <div className="flex flex-wrap justify-center gap-5">
            <div className="flex justify-center">
                <Chart options={options} series={series} type="line" height={384} width={450} />
            </div>
        
        </div>
    </div>
  )
}
