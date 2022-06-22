import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import {useRouter} from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) =>{

    //State
    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    

    const router = useRouter()

    //Axios
    const obtenerCategorias = async () =>{
        const {data} = await axios('/api/categorias')
        setCategorias(data)
    }
    //useEffect
    useEffect(() =>{
        obtenerCategorias()
    },[])
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias]);
    
    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    //functions
    const handleClicCategoria = id =>{
        const categoria = categorias.filter(c => c.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto =>{
        setProducto(producto)
    }

    const handleChangeModal = () =>{
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) =>{
        if(pedido.some(productState => productState.id === producto.id)){
            const pedidoActualizado = pedido.map(productState => productState.id === producto.id ? producto : productState)
            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        }
        else{
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }
        setModal(false)
    }

    const handleEditarCantidad = id =>{
        const productoActualizar = pedido.filter(producto=> producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id =>{
        const pedidoActualizado = pedido.filter(producto=> producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault()
        try {
            await axios.post('/api/ordenes',{
            pedido,
            nombre,
            total,
            fecha: Date.now().toString()
           }) 
           //reseto la app
          setCategoriaActual(categorias[0])
          setPedido([])
          setNombre('')
          setTotal(0)
        
          toast.success('Pedido Realizado Correctamente')
           setTimeout(() => {
            router.push('/')
           }, 2000);

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <QuioscoContext.Provider 
        value={{
            categorias,
            categoriaActual,
            modal,
            producto,
            pedido,
            nombre,
            total,
            handleClicCategoria,
            handleSetProducto,
            handleChangeModal,
            handleAgregarPedido,
            handleEditarCantidad,
            handleEliminarProducto,
            setNombre,
            colocarOrden
        }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext