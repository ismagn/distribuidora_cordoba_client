import { Outlet } from "react-router-dom";
import Header from "../components/Header";


export default function AuthLayouth() {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <div>
            <Header/>
        </div>
        <div className='mt-24 md:mt-0 px-0 lg:px-80'>
            <Outlet/>
        </div>
    </div>
  )
}
