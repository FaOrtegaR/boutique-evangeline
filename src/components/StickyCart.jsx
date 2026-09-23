import { useState, useEffect } from 'react'
import { useCarritoStore } from '../store/carritoStore'

function StickyCart() {
  const { items, totalItems, totalPrecio, abrirCheckout, isCheckoutOpen, cerrarCheckout } = useCarritoStore()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Si el usuario está a menos de 800px del final de la página, ocultar la barra
      const distanciaAlFinal = documentHeight - (scrollY + windowHeight)
      const cercaDelFinal = distanciaAlFinal < 800

      setIsVisible(!cercaDelFinal)

      // 👇 NUEVO: Si el usuario está lejos del final (en el catálogo) y el Checkout está abierto, ciérralo
      if (!cercaDelFinal && isCheckoutOpen) {
        cerrarCheckout()
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [isCheckoutOpen, cerrarCheckout])

  if (items.length === 0 || isCheckoutOpen || !isVisible) return null

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="bg-pink-400 rounded-full shadow-lg px-2 py-1 flex items-center gap-3 pointer-events-auto">
        <span className="text-white font-semibold text-sm pl-3">
          {totalItems()} {totalItems() === 1 ? 'producto' : 'productos'} · ${totalPrecio().toLocaleString('es-CL')}
        </span>
        <button
          onClick={abrirCheckout}
          className="bg-white text-gray-800 font-semibold text-sm py-2 px-4 rounded-full hover:bg-pink-50 transition flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Ir al pedido
        </button>
      </div>
    </div>
  )
}

export default StickyCart