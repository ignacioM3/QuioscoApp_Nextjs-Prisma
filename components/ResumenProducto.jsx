import Image from "next/image"
import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"


const ResumenProducto = ({ producto }) => {
    const {handleEditarCantidad, handleEliminarProducto} = useQuiosco()
    return (
        <div className="shadow p-5 mb-3 flex gap-10 items-center">
            <div className="md:w-1/6">
                <Image
                    width={300}
                    height={400}
                    alt={`Imagen Producto ${producto.nombre}`}
                    src={`/assets/img/${producto.imagen}.jpg`}
                />
            </div>
            <div className="md:w-4/6">
                <p className="text-3xl font-bold">{producto.nombre}</p>
                <p className="text-xl font-bold mt-2">Canidad: {producto.cantidad}</p>
                <p className="text-xl font-bold mt-2 text-amber-500">
                    Precio: {formatearDinero(producto.precio)}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                    Subtotal: {formatearDinero(producto.precio * producto.cantidad)}
                </p>
            </div>
            <div>
                <button type="button"
                    className="bg-sky-700 flex gap-2 px-5 py-2 text-white rounded font-bold uppercase shadow-md w-full "
                    onClick={()=> handleEditarCantidad(producto.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                    </svg>
                    Editar
                </button>
                <button 
                    type="button"
                    className="bg-red-700 flex gap-2 px-5 py-2 text-white rounded font-bold uppercase shadow-md w-full mt-2"
                    onClick={()=> handleEliminarProducto(producto.id)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default ResumenProducto