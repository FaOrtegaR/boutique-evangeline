import { useCarritoStore } from '../store/carritoStore'

function ProductCard({ producto }) {
  const {
    agregarProducto,
    items,
    aumentarCantidad,
    disminuirCantidad,
    abrirDetalleProducto,
  } = useCarritoStore()

  const itemEnCarrito = items.find((item) => item.id === producto.id)
  const cantidad = itemEnCarrito ? itemEnCarrito.cantidad : 0

  return (
    <div className="bg-white rounded-2xl border-2 border-pink-200 p-4 flex flex-col h-full shadow-sm hover:shadow-md transition">
      
      {/* Imagen del producto */}
      <div
        className="w-full aspect-square bg-white rounded-xl flex items-center justify-center mb-3 cursor-pointer overflow-hidden"
        onClick={() => abrirDetalleProducto(producto)}
      >
        <img
          src={`/img/${producto.imagenes[0]}`}
          alt={producto.nombre}
          className="w-full h-full object-contain p-2"
        />
      </div>

      {/* Nombre (con altura mínima para alinear precios) */}
      <h4
        className="font-semibold text-gray-800 text-center mb-2 text-sm cursor-pointer hover:text-pink-600 transition line-clamp-2 min-h-[2.5rem]"
        onClick={() => abrirDetalleProducto(producto)}
      >
        {producto.nombre}
      </h4>

      {/* Precio */}
      <p className="text-pink-600 font-bold text-center mb-3">
        ${producto.precio.toLocaleString('es-CL')}
      </p>

      {/* Botón o controles de cantidad (siempre al fondo) */}
      <div className="mt-auto">
        {cantidad === 0 ? (
          <button
            onClick={() => agregarProducto(producto)}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-2 rounded-lg transition"
          >
            +
          </button>
        ) : (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => disminuirCantidad(producto.id)}
              className="bg-pink-400 text-white w-8 h-8 rounded-lg font-bold"
            >
              -
            </button>
            <span className="font-bold text-gray-800">{cantidad}</span>
            <button
              onClick={() => aumentarCantidad(producto.id)}
              className="bg-pink-400 text-white w-8 h-8 rounded-lg font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard