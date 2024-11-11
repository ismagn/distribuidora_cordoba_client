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
    <div className="bg-white text-center relative ">
        <img src=" img/banner-distribuidora.jpg" className={`fixed top-0 z-10 md:relative w-screen px-10 ${scroll > 0 && ' block -translate-y-full '  } mx-auto bg-white ease-in-out  duration-300  `} alt="" />
        
        <nav className={` hidden ${scroll > 0 && '  fixed top-0'} text-white bg-black w-full md:flex justify-around  m-auto p-3 items-center  z-30  duration-700 ease-in-out `}>
          <Link to={'/'}>HOME</Link>

          <Link to={'/products'}>PRODUCTOS</Link>
          
          {user ? (
              <Link to="/perfil" className="uppercase ">MI PERFIL</Link>
          ) : (
              <Link to="/auth" className="uppercase">Iniciar Sesion</Link>
          )}

          {!user && (<Link to="/auth/register" className="uppercase"> REGISTRARSE</Link>) }

          {user && (
            <button  className=" uppercase" onClick={logout}>cerrar sesion</button>
          )}

          {user?.admin ? (
              <Link className={`${(url == '/orders' || url == '/orders/completeOrders') && 'hidden'} bg-white text-black font-bold  p-2 rounded-md`} to={'/orders'}>ORDENES</Link>
          ) : (
              <Cart/>
          )}

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
