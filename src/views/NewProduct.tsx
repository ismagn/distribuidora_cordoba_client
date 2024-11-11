import { useEffect, useState } from "react"
import { Link, useNavigate, useParams} from "react-router-dom"
import { ContextProps, draftProduct } from "../types"
import { useServices } from "../hooks/useServices"
import useProductos from "../hooks/useProductos"
import { useAuth } from "../hooks/useAuth"
import { Fade } from "react-awesome-reveal";


export default function NewProduct() {
    const navigate = useNavigate()
   
    const {producto, categorias,cart, setCart} = useProductos() as ContextProps
    const {addProduct,  editProduct, deleteProduct} = useServices()
    const { user} = useAuth('')
    const {id} = useParams()


    const [product,setProduct] = useState<draftProduct>({
        name: "",
        price: 0,
        cuantity: 0,
        categoryId: 0,
        description: '',
        availability:true,
        image: null
    }) 
    const [prev,setPrev] = useState<string | null>(null)

    useEffect(()=>{
        if (id) {
            setProduct({
                name : producto?.name,
                price: producto?.price,
                cuantity: producto?.cuantity,
                categoryId: producto?.categoryId,
                description: producto?.description,
                availability: producto?.availability,
                image: producto?.image
            })
        }
        if (id && !producto) {
            navigate('/')
        }
    },[])
    

    const handleSubmit = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault()
        
        if (product.name == '' || product.price == 0 || product.categoryId == 0) {
            console.log('alguno de los campos no es valido o no ha sido seleccinado');
            return
        }

        if (id) {
            await editProduct(product, (id))
        }else{

            await addProduct(product)
        }
        
    }

    const handleOnChange =(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>)=>{ 
            if (e.target.type=='price') {
            setProduct({
                ...product,
                [e.target.id]: parseFloat(e.target.value).toFixed(2),
            })
            }else if(e.target.id == 'cuantity'){
                setProduct({
                    ...product,
                    [e.target.id]: +(e.target.value),
                })
            }else if (e.target.id=='availability') {
                if (e.target.value == 'true') {
                    setProduct({
                        ...product,
                        [e.target.id]:true,
                    })
                } else {
                    setProduct({
                        ...product,
                        [e.target.id]:false,
                    })
                }
        

            }else{
                setProduct({
                ...product,
                [e.target.id]:e.target.value,
            })
        }
        
        
    }

    const handleOnChangeFilies  = (e: React.ChangeEvent<HTMLInputElement>)=> {
        const file = e.target.files?.[0] || null;
        setProduct( ({
            ...product,
            image: file,
        }));
        
         //para almacenar la imagen que se cargo en el input y poder mostrarla
        if (file) {
            setPrev(URL.createObjectURL(file));
        } else {
            setPrev(null);
        }
    }

    const addCart =()=>{
        
        if (!user?.name) {
            alert('Debes registrarte como usuario para agregar un producto')
            return
        }

        const objCart = {
            id: producto.id,
            name: producto.name,
            price: producto.price,
            total: producto.price,
            quantity: 1,
            image : producto.image
        }

        const cartIds = cart.map(i => i.id )
        const existProduct = cartIds.includes(objCart.id)

        if (existProduct) {
            alert('producto ya agregado al carrito');
        } else{
            setCart([...cart,objCart])
        }
    
        
        
    }


  return (
    <Fade>
    <div className="p-3 md:p-10">
        <div className="text-center">
            <Link to={'/products'} className="p-2 text-sm  bg-black text-white font-bold rounded-md uppercase">Volver a productos</Link>
        </div>
        <div>
            <form
                className="mt-10"
                >

                    <div className="mb-4">
                    <label
                        className={`${id ? 'visible' : ' hidden'} text-xl font-bold text-gray-500`}
                        htmlFor="Codigo"
                    >Codigo Producto:</label>
                    <input 
                    defaultValue={id?.split('-')[0]}
                        readOnly={true}
                        id="Codigo"
                        type="text"
                        className={` ${id ? 'visible' : ' hidden'} mt-2 block w-full p-3 bg-gray-50 uppercase`}
                        placeholder=""
                        name="Codigo"

                    />
                </div>
            
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="name"
                    >Nombre Producto:</label>
                    
                    <div className=" md:flex justify-between gap-4">
                        <input 
                        defaultValue={product.name}
                            readOnly={user?.admin ? false : true}
                            id="name"
                            type="text"
                            className="mt-2 md:p-10  block w-full md:w-2/3 p-3 bg-gray-50 uppercase text-sm lg:text-xl md:h-52 font-bold"
                            placeholder="Nombre del Producto"
                            name="name"
                            onChange={handleOnChange}          
                        />
                        <div className=" mx-auto mt-5 md:mt-0 w-2/3 md:w-1/3">
                            {!prev && product.image && <img className="" src={`${import.meta.env.VITE_API_URL}/${product.image}`} alt="" />}
                        </div>
                        <div >
                            {prev && <img className="w-full h-full" src={`${prev}`} alt="" />}
                        </div>
                    </div>
                </div>
                
                {user?.admin && (
                <div className="mb-4">
                    <input type="file" name="image" className=" bg-black text-white p-2 rounded-md" id="image" onChange={handleOnChangeFilies}/>
                </div>
                )}
                
                <div className="my-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="price"
                    >Precio:</label>
                    <input 
                        readOnly={user?.admin ? false : true}
                        value={product.price}
                        id="price"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Precio Producto. ej. 200, 300"
                        name="price"
                        onChange={handleOnChange}
                    />
                </div>
                
                {user?.admin && (
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="categoryId"
                    >Categoria Producto:</label>
                    <select className="w-full mt-2 p-2 uppercase" name="categoryId" id="categoryId" defaultValue={`${id && producto?.categoryId?.toString() }`} onChange={handleOnChange}>
                        <option value={""}>seleccionar</option>
                        {categorias?.map(i=> (
                            <>
                            <option value={i.id}>{i.name}</option>
                            </>
                            
                            ))}
                    </select>
                </div>
                )}
                
                <div className="mb-4 flex flex-col">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="description"
                    >Decripcion</label>
                    <textarea 
                        readOnly={user?.admin ? false : true}
                        value={product.description}
                        name="description" 
                        id="description"
                        className=" p-2 mt-2 min-h-44"
                        onChange={handleOnChange}
                        >
                    </textarea>
                </div>
                
                {user?.admin && (
                <div className="mb-4">
                    <label
                        className="text-xl font-bold text-gray-500"
                        htmlFor="cuantity"
                    >Cantidad:</label>
                    <input 
                        value={product?.cuantity}
                        id="cuantity"
                        type="number"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        placeholder="Cantidad disponible"
                        name="cuantity"
                        onChange={handleOnChange}
                    />
                </div>
                )}
                

                {user?.admin ? (
                <>
                <div className="mb-4">
                    <label className="text-xl font-bold text-gray-500" htmlFor="availability">Disponibilidad: </label>
                    <select className="w-full mt-2 p-2" name="availability" id="availability" defaultValue={producto?.availability.toString()} onChange={handleOnChange}>
                        <option value="true">DISPONIBLE</option>
                        <option value="false">NO DISPONIBLE</option>
                    </select>
                </div>
                <button className="mt-5 w-full bg-black p-2 text-white font-bold text-lg cursor-pointer rounded" 
                type="button"
                onClick={handleSubmit}
                >{id ? "ACTUALIZAR PRODUCTO" : "AÑADIR PRODUCTO"}</button>
                {id && (
                    <button className="mt-5 w-full bg-red-800 p-2 text-black font-bold text-lg cursor-pointer rounded" 
                    type="button"
                    onClick={()=>deleteProduct(id)}
                    >ELIMINAR PRODUCTO</button>
                )}
                </>
                ) : (
                    <button className="my-5 w-full bg-black p-2 text-white font-bold text-lg cursor-pointer rounded" 
                    type="button"
                    onClick={addCart}
                    >AÑADIR AL CARRITO</button>
                )}
                
            </form>
        </div>
        
    </div>
    </Fade>
  )
}
