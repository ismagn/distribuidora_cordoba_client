

export default function Footer() {
  return (
    <div className="  md:mt-20 bg-white grid grid-cols-2 md:grid-cols-2 p-10 items-center">
        <div className=" text-center ">
            <h2 className=" font-bold text-sm md:text-3xl">CONTACTANOS</h2>

            <ul className=" my-8 flex flex-col text-xs md:text-xl gap-3 font-semibold">
                <li>- <a href="https://wa.me/2299281516" target="_blank">271 147 2055</a></li>
                <li>- IG: smoke_lab420 </li>
                <li>- San Roman, Córdoba</li>
            </ul>
        </div>
        <div className=" ">
            <img className=" mx-auto" src="/img/logo.png" alt="" />
        </div>
    </div>
  )
}
