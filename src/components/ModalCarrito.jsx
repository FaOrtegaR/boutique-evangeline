import { useCarritoStore } from '../store/carritoStore'

function ModalCarrito() {
  const {
    items,
    isModalOpen,
    cerrarModal,
    eliminarProducto,
    aumentarCantidad,
    disminuirCantidad,
    totalPrecio,
    limpiarCarrito,
    abrirCheckout
  } = useCarritoStore()

  if (!isModalOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex justify-end"
      onClick={cerrarModal}
    >
      <div
        className="bg-white w-full h-full md:w-1/2 md:max-w-md flex flex-col shadow-2xl md:rounded-l-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-pink-200">
          <h2 className="text-xl font-bold text-pink-700">Tu carrito</h2>
          <button
            onClick={cerrarModal}
            className="text-gray-500 hover:text-pink-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
          <div className="text-center text-gray-500 py-8 flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-pink-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-3 border-b border-pink-100 last:border-b-0"
              >
                <img
                  src={`/img/${item.imagenes[0]}`}
                  alt={item.nombre}
                  className="w-16 h-16 object-contain rounded-lg bg-pink-50"
                />

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-sm">
                    {item.nombre}
                  </h4>
                  <p className="text-pink-600 font-bold text-sm">
                    ${item.precio.toLocaleString('es-CL')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => disminuirCantidad(item.id)}
                    className="bg-pink-400 text-white w-7 h-7 rounded-md font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-gray-800 text-sm w-6 text-center">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => aumentarCantidad(item.id)}
                    className="bg-pink-400 text-white w-7 h-7 rounded-md font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => eliminarProducto(item.id)}
                  className="text-gray-400 hover:text-red-500 transition p-1"
                  aria-label="Eliminar producto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-pink-200">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 font-semibold">Total:</span>
              <span className="text-pink-600 font-bold text-xl">
                ${totalPrecio().toLocaleString('es-CL')}
              </span>
            </div>
            <button
              onClick={abrirCheckout}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Revisar compra · ${totalPrecio().toLocaleString('es-CL')}
            </button>
            <button
              onClick={limpiarCarrito}
              className="w-full text-gray-400 text-xs mt-2 hover:text-red-500 transition"
            >
              Vaciar carrito
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default ModalCarrito