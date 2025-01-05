import { useState } from "react";
import { ContextProps, draftUser } from "../types";
import { useAuth } from "../hooks/useAuth";
import useProductos from "../hooks/useProductos";
import { Fade } from "react-awesome-reveal";

export default function Register() {
    const  {addUser} = useAuth('register') 
    const {alert, setAlert} = useProductos() as ContextProps 
    const msjAlert = String(alert?.message)

    const [user,setUser] = useState<draftUser>({
        name: "",
        email: "",
        password: "",
        adress: "",
        phone: 0
    }) 

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        
        if (user.name == '' || user.email == "" || user.phone == 0) {
            setAlert({message: 'alguno de los campos no es valido o falta llenar', error: true})
            
            return
        }

        setAlert({message: '', error: true})

        addUser(user)
        
    }

    const handleOnChange =(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>)=>{ 
            
                setUser({
                ...user,
                [e.target.id]:e.target.value,
            })

    }

  return (
    <Fade>
    <div className=" mt-10 md:mt-5">
        {alert && (
            <p className={` text-center font-bold text-lg uppercase p-2 ${alert.error ? 'text-red-500' : ' text-blue-500'} ${alert.message== undefined ? ' hidden' : ' visible'} `}>{msjAlert}</p>
        )}
        <div>
            <form
                className=" px-2 md:px-10"
                >
                <h1 className=" text-xl uppercase font-bold text-center mb-2">registrarse</h1>
                <div className="mb-2">
                    <label
                        className=" font-bold text-gray-500"
                        htmlFor="name"
                    >Nombre:</label>
                    <input 
                        id="name"
                        type="text"
                        className="mt-1 block w-full p-2 bg-gray-50 "
                        placeholder="Ingresa tu Nombre"
                        name="name"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-2">
                    <label
                        className="font-bold text-gray-500"
                        htmlFor="email"
                    >Email:</label>
                    <input 
                        id="email"
                        type="text"
                        className="mt-1 block w-full p-2 bg-gray-50 "
                        placeholder="Ingresa tu correo"
                        name="email"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-2">
                    <label
                        className=" font-bold text-gray-500"
                        htmlFor="password"
                    >Contraseña:</label>
                    <input 
                        id="password"
                        type="password"
                        className="mt-1 block w-full p-2 bg-gray-50"
                        placeholder="Ingresa tu contraseña"
                        name="password"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="mb-2">
                    <label
                        className=" font-bold text-gray-500"
                        htmlFor="phone"
                    >Telefono:</label>
                    <input 
                        id="phone"
                        type="text"
                        className="mt-1 block w-full p-2 bg-gray-50 "
                        placeholder="Ingresa tu numero de celular"
                        name="phone"
                        onChange={handleOnChange}
                    />
                </div>

                <div className="mb-2 flex flex-col">
                    <label
                        className=" font-bold text-gray-500"
                        htmlFor="adress"
                    >Direccion</label>
                    <textarea 
                        name="adress" 
                        id="adress"
                        className=" p-2 mt-1"
                        onChange={handleOnChange}
                        >
                    </textarea>
                </div>
                
                <button className="mt-1 w-full bg-black p-2 text-white font-bold text-lg cursor-pointer rounded" 
                type="button"
                onClick={handleSubmit}
                >REGISTRARSE</button>
                
            </form>
        </div>
    </div>
    </Fade>
  )
}
