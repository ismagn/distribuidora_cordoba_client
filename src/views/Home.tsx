import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import SlideHome from "../components/SlideHome"
import { Fade,Slide,Zoom } from "react-awesome-reveal";

function Home() {

  useAuth('guest')

  return (

    <Fade>
    <div className=" m-2 ">
      <Zoom>
      <header className="">
            <SlideHome/>
            
      </header>
      </Zoom>
      <section className="mx-2 mt-10 bg-white rounded-md p-2 md:p-8 shadow-lg">
          <Slide  direction="right">
          <p className=" text-gray-400 md:text-2xl font-bold text-center ">Comprometidos a brindarle la mejor solución, productos de la mejor calidad, precio adecuado, con mano de obra calificada</p>
          </Slide>
            <Fade delay={1000}>
            <div  className=" text-center my-4 md:my-10 ">
              <Link to={'products'} className=" p-2 md:p-4 bg-black text-white shadow-xl md:text-xl rounded-md font-bold">PRODUCTOS</Link>
            </div>
            </Fade>
      
      </section>
      <section className=" bg-gray-500 my-5 md:my-10 shadow-lg mx-2 rounded-md p-8 text-center uppercase">
        <p className=" md:text-2xl text-white font-bold">Somos distribuidor autorizado de las mejores marcas</p>
      </section>
      <Slide>
      <section className="  grid grid-cols-4 p-4 gap-1 md:gap-10 my-5 items-center bg-white shadow-xl mx-2">
          <img src="img/marcas/3m.jpg" alt="" />
          <img src="img/marcas/condulac.png" alt="" />
          <img src="img/marcas/condumex.jpg" alt="" />
          <img src="img/marcas/fierro.jpg" alt="" />
          <img src="img/marcas/poliflex.png" alt="" />
          <img src="img/marcas/tecnolite.png" alt="" />
          <img src="img/marcas/viakon.jpg" alt="" />
          <img src="img/marcas/volteck.png" alt="" />
      </section>
      </Slide>
    </div>
    </Fade>
  )
}

export default Home
