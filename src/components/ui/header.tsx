import { FileText, MenuIcon,Home,Download  } from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";
import { Users } from 'lucide-react';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { Link } from "react-router-dom";
import { Separator } from "./separator";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import logo from "../../assets/brasao_ufpi.png"


export default function Header() {
  return (
    <Card className="flex  items-center p-[1.875rem] ">
        <div className="w-1/2">
        
            <Sheet>
                <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                        <MenuIcon/>
                </Button>
                </SheetTrigger>

                <SheetContent side="left">
                    <SheetHeader className="text-left text-lg font-semibol mb-2">
                        Menu
                    </SheetHeader>

                    <div className="flex flex-col">
                        <div className="flex flex-col items-center py-4 gap-2">
                            <Avatar className="w-24 h-24">
                                <AvatarImage  
                                    src={logo} 
                                    alt="Brasão Ufpi"
                                    />
                                <AvatarFallback>UFPI</AvatarFallback>
                            </Avatar>
                            <p className="font-medium">SISTEMA PPGCC</p>
                        </div>
                        
                        <Separator/>
                    </div>
                    
                   
                   <div className="mt-2 flex flex-col gap-2">
                   <SheetClose asChild> 
                        <Link to={'/home'}>
                        <Button variant="outline" className=" w-full justify-start gap-2 ">
                            <Home  size={16}/>
                            Home
                        </Button>
                        </Link>
                    </SheetClose>
                    
                    <SheetClose asChild> 
                        <Link to={'/docente'}>
                        <Button variant="outline" className=" w-full justify-start gap-2 ">
                            <Users  size={16}/>
                            Docentes
                        </Button>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild> 
                        <Link to={'/producoes'}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                < FileText  size={16}/>
                                Produções
                            </Button>
                        </Link>
                    </SheetClose>
                    <SheetClose asChild> 
                        <Link to={'/download'}>
                            <Button variant="outline" className="w-full justify-start gap-2">
                                < Download   size={16}/>
                                Dowload
                            </Button>
                        </Link>
                    </SheetClose>
                    </div>
                </SheetContent>
               
            </Sheet>
       
        </div>
        <Link to={'/home'}>       
            <h1 className="text-lg font-semibold text-center ">
                <span className="text-primary">PPGCC</span>
            </h1>
        </Link>

        
    </Card>

    
  )
}
