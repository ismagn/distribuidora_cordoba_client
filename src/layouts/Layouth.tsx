
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layouth() {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <div>
            <Header/>
        </div>
        <div className='mt-24 md:mt-10 lg:px-52'>
            <Outlet/>
        </div>
        <div>
          <Footer/>
        </div>
    </div>
  )
}
