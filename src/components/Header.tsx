import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import Cart from "./Cart"
import MovilUserMenu from "./MovilUserMenu"
import { useEffect, useState } from "react"




export default function Header() {

  const location = useLocation()
  const url = location.pathname
  const [scroll,setScroll] = useState(0);
  
  const handleScroll=()=>{
    setScroll(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener('scroll', handleScroll);
  },[scroll])
  
  const {user, logout} = useAuth('guest')  

  return (
    <div className=" text-center relative ">
        <img src=" img/banner_distribuidora_cordoba_negro.jpg" className={`fixed top-0 z-10 md:relative w-screen md:h-28 px-10 lg:px-96 ${scroll > 0 && ' block -translate-y-full  '  } mx-auto bg-black ease-in-out  duration-300  `} alt="" />
        
        <nav className={` border-t-2 hidden ${scroll > 0 && '  fixed top-0'} text-white bg-black w-full lg:px-52 md:flex justify-between m-auto p-3 items-center  z-30  duration-700 ease-in-out `}>
          <div className=" font-bold  bg-slate-200 p-1 rounded-md text-black cursor-pointer ">
            <Link to={'/'}>HOME</Link>
          </div>

          <div className=" font-bold w-5/6 lg:w-3/5 flex justify-end gap-3 lg:gap-4 items-center text-sm ">
            <Link to={'/products'}>PRODUCTOS</Link>
            
            {user ? (
                <Link to="/perfil" className="uppercase cursor-pointer">MI PERFIL</Link>
            ) : (
                <Link to="/auth" className="uppercase cursor-pointer">Iniciar Sesion</Link>
            )}

            {!user && (<Link to="/auth/register" className="uppercase cursor-pointer"> REGISTRARSE</Link>) }

            {user && (
              <button  className=" uppercase cursor-pointer" onClick={logout}>cerrar sesion</button>
            )}

            {user?.admin ? (
                <Link className={`${(url == '/orders' || url == '/orders/completeOrders') && 'hidden'} bg-white text-black font-bold  p-2 rounded-md`} to={'/orders'}>ORDENES</Link>
            ) : (
                <Cart/>
            )}
          </div>

        </nav>
        <div className={` bg-black fixed top-9 w-screen flex  justify-between md:hidden items-center p-2 z-50 ${scroll > 0 && ' -translate-y-full ' } ease-in-out  duration-200`}>
          <div className=" mx-2">
            <MovilUserMenu/>
          </div>
          
          <div className=" ">
          {user?.admin ? (
                <Link className={`${(url == '/orders' || url == '/orders/completeOrders') && 'hidden'} bg-white font-bold p-2 rounded-md`} to={'/orders'}>ORDENES</Link>
            ) : (
                <Cart/>
            )}
          </div>
          
        </div>
        
    </div>
  )
}
