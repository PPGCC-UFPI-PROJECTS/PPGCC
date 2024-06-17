import { baseApiUrl } from '@/global'
import axios from 'axios'
import { config } from 'process';

//Criando uma instância do axios com interceptadores
const api = axios.create(
    {baseURL: baseApiUrl,
        withCredentials:true
    },
)

const handleSuccess = (response:any)=>{
    if (response.status===200){
        if(!response.data||!response.data.success){
            return Promise.reject(new Error('Resposta inválida'));
        }
        return response.data
    } else {
        return Promise.reject(new Error(`Erro HTTP ${response.status}`))
    }

}

const handleError = (error:any)=>{

    if(error.response){
        //Erro com resposta da Api
        const errorMenssage = error.response.data.menssage || 'Erro desconhecido';
        return Promise.reject(new Error(errorMenssage))
    }else{
        //Erro de rede ou outro tipo de erro
        return Promise.reject(error)
    }
   
}
//Interceptar respostas e tratar erros
//Todas as respostas da requisição passarão por essas duas funções
axios.interceptors.response.use(handleSuccess,handleError)

// axios.interceptors.request.use(
//     (config)=>{
//         const token = getAuthToken();
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     }
// )
// Função para setar o token no cookie
// const setAuthToken = (token) => {
//     document.cookie = `token=${token}; Secure; HttpOnly; SameSite=Strict`;
//   }


const setAuthToken = (token:string)=>{
    if(token){
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`//Adiciona o cabeçalho Authorization a todas as requisições feitas pela instância Axios
    }else{
        delete api.defaults.headers.common['Authorization']
    }
}

export const useApi= () =>({

    loadAutores: async () =>{
    const response = await api.get('/')
    return await handleSuccess(response.data);
    },

    loadProducoes: async () =>{
    // const response = await api.get('/')
    // return await handleSuccess(response.data);
    const response = {
      
            data: {
              producoes: [20, 22, 23, 25, 27, 30]
            }
          };
    
      return response.data;


    }
    

})

export const authApi ={
    setAuthToken,
}