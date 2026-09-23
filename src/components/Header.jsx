import { useCarritoStore } from '../store/carritoStore'

function Header() {
  const totalItems = useCarritoStore((state) => state.totalItems())
  const abrirModal = useCarritoStore((state) => state.abrirModal)

  return (
    <header className="bg-pink-500 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <img src="/img/logo.jpg" alt="La boutique d'Evangeline" className="h-12 md:h-16 w-auto" />
        </div>

        <nav className="hidden md:flex gap-6">
          <a href="#inicio" className="text-white hover:text-pink-200 transition">Inicio</a>
          <a href="#catalogo" className="text-white hover:text-pink-200 transition">Catálogo</a>
          <a href="#nosotros" className="text-white hover:text-pink-200 transition">Nosotros</a>
          <a href="#envios" className="text-white hover:text-pink-200 transition">Envíos</a>
        </nav>

        <div className="relative">
          <button onClick={abrirModal} className="text-white hover:text-pink-200 transition" aria-label="Abrir carrito">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-pink-500 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>

      </div>
    </header>
  )
}

export default Header