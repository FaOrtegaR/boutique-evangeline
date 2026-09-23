import { useState, useEffect } from 'react'
import { useCarritoStore } from '../store/carritoStore'

function ModalProducto() {
  const { productoSeleccionado, cerrarDetalleProducto, agregarProducto } = useCarritoStore()
  const [imagenActual, setImagenActual] = useState(null)
  const [verMas, setVerMas] = useState(false)

  // Resetear la imagen y el "ver más" cuando cambia el producto
  useEffect(() => {
    if (productoSeleccionado) {
      setImagenActual(productoSeleccionado.imagenes[0])
      setVerMas(false)
    }
  }, [productoSeleccionado])

  if (!productoSeleccionado) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={cerrarDetalleProducto}
    >
      <div
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-pink-200">
          <h2 className="text-xl font-bold text-pink-700">Detalle del producto</h2>
          <button
            onClick={cerrarDetalleProducto}
            className="text-gray-500 hover:text-pink-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Contenido (con scroll interno) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Columna izquierda: Foto y miniaturas */}
            <div>
              <div className="w-full aspect-square bg-pink-50 rounded-xl flex items-center justify-center overflow-hidden">
                <img
                  src={`/img/${imagenActual}`}
                  alt={productoSeleccionado.nombre}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Miniaturas */}
              {productoSeleccionado.imagenes.length > 1 && (
                <div className="flex gap-2 mt-3">
                  {productoSeleccionado.imagenes.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActual(img)}
                      className={`w-14 h-14 border-2 rounded-lg flex items-center justify-center bg-pink-50 transition ${
                        imagenActual === img ? 'border-pink-500' : 'border-pink-200'
                      }`}
                    >
                      <img
                        src={`/img/${img}`}
                        alt={`Variante ${index + 1}`}
                        className="w-full h-full object-contain rounded-lg p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Columna derecha: Info */}
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {productoSeleccionado.nombre}
              </h3>
              <p className="text-pink-600 font-bold text-xl mb-4">
                ${productoSeleccionado.precio.toLocaleString('es-CL')}
              </p>
              
              {/* Descripción con "Ver más" */}
              <div className="mb-4">
                <p className={`text-gray-600 text-sm leading-relaxed whitespace-pre-line ${verMas ? '' : 'line-clamp-6'}`}>
                  {productoSeleccionado.descripcionLarga}
                </p>
                <button
                  onClick={() => setVerMas(!verMas)}
                  className="text-pink-600 text-xs mt-1 underline hover:text-pink-800"
                >
                  {verMas ? 'Ver menos' : 'Ver más'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botón sticky */}
        <div className="p-4 border-t border-pink-200 bg-white">
          <button
            onClick={() => {
              agregarProducto(productoSeleccionado)
              cerrarDetalleProducto()
            }}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition"
          >
            Agregar al carrito
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalProducto