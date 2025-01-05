import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SlideHome from "../components/SlideHome"
import { Fade,Slide,Zoom } from "react-awesome-reveal";

function Home() {

  useAuth('guest')

  return (

    <Fade>
    <div className=" m-2 p-3 ">
      <Zoom triggerOnce>
      <header className="">
            <SlideHome/>
            
      </header>
      </Zoom>
      <section className="mx-2 mt-10 bg-white rounded-md p-5 md:p-8 shadow-lg">
          <Slide  direction="right" triggerOnce>
          
          </Slide>
            <Fade delay={200}>
            <div  className=" text-center my-4 md:my-10 ">
              <Link to={'products'} className=" p-2 md:p-4 bg-black text-white shadow-2xl md:text-4xl rounded-md font-bold">PRODUCTOS</Link>
            </div>
            <p className=" text-green-900 text-sm md:text-2xl font-bold text-center ">Solo venta de artículos para fumar</p>
            <p className=" text-gray-400 text-sm md:text-2xl font-bold text-center ">No vendemos hierba</p>
            </Fade>
      
      </section>
      <section className=" bg-black mt-5 md:mt-10 shadow-lg mx-2 rounded-md p-8 text-center uppercase">
        <p className=" text-xs md:text-2xl text-white font-bold">Pregunta por nuestros articulos, contamos con variedad de: </p>
      </section>
      <Slide>
      <section className="  grid grid-cols-2 p-2 rounded-md  md:gap-10 mb-5 items-center bg-white shadow-xl mx-2">
          <img className="mx-auto md:w-3/4" src="img/marcas/productos-circulos-1.jpg" alt="" />
          <img className="mx-auto md:w-3/4" src="img/marcas/productos-circulos-2.jpg" alt="" />
      </section>
      </Slide>
    </div>
    </Fade>
  )
}

export default Home
