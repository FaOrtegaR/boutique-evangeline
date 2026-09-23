import { getProductos } from '../api/api'
import ProductCard from './ProductCard'

function Catalogo() {
  const productos = getProductos()

  return (
    <section id="catalogo" className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold text-pink-700 text-center mb-8">
          Nuestros Productos
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Catalogo