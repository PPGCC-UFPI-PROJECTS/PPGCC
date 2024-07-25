import { baseApiUrl } from '@/global'
import axios from 'axios'
// import { config } from 'process';

//Criando uma instância do axios com interceptadores
const api = axios.create(
    {baseURL: baseApiUrl,
    // withCredentials:true //Controla se o navegador deve enviar cookies e cabeçalhos de autenticação junto a requisição. 
    },
)


// Interceptor para respostas
api.interceptors.response.use(
    response => {
      if (response.status >= 200 && response.status < 300) {
        return response; 
      } else {
        console.error('Erro na resposta:', response);
        return Promise.reject(response); // Rejeita a Promise com a resposta de erro
      }

    },
    error => {
      console.error('Erro na resposta:', error);
      return Promise.reject(error);
    }
  );


export const useApi= () =>({

    loadAutores: async () =>{
      const response = await api.get('/api/pessoas/')
      return response.data;
    },

    loadProducoes: async (currentPage:number, pageSize :number) =>{
      const response = await api.get(`/api/producoes?page=${currentPage}&size=${pageSize}`)
      return response.data;
    },
    loadProducoesByIdAutor: async (idPessoa:number) =>{//
      const response = await api.get(`/api/producoes/${idPessoa}`)
      return response.data;
    },
    loadProducoesByYear: async () =>{//
      const response = await api.get(`/api/producoes/quantidade`)
      return response.data;
    },
    loadProducoesFileById: async (idPessoa:number)=>{
      const response = await api.get(`/api/producoes/${idPessoa}/arquivo`)
      return response.data;

    },
    loadProducoesByManyIds:async (idsPessoas:number[])=>{
      const queryParams = idsPessoas.map(id => `pessoas=${id}`).join('&');
      const response = await api.get(`/api/producoes/arquivo?${queryParams}`);
      return response.data;

    }
    
   

})
