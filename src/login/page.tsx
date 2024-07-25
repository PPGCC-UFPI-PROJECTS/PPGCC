import { Link } from 'react-router-dom';
import Logo from '../assets/brasao_ufpi.png'
import { Button } from '@/components/ui/button';


export default function Login() {
  
    return (
      <>
          <div className="flex flex-col justify-center items-center gap-6">
              <div className="flex justify-center items-center w-64 mt-8 ">
                  <img src={Logo} alt="brasao"/>
              </div>
              <div>
                  <h1 className="text-xl">Sistema PPGCC</h1>
              </div>
              <div className="flex justify-center">
                  <Button className=""><Link className="text-black" to="/home">Entrar</Link></Button>
              </div>
          </div>
      </>
  );
 
}
