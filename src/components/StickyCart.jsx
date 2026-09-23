import { useState, useEffect } from 'react'
import { useCarritoStore } from '../store/carritoStore'

function StickyCart() {
  const { items, totalItems, totalPrecio, abrirCheckout } = useCarritoStore()
  const [isVisible, setIsVisible] = useState(true)

  // Detectar si el Checkout o el Footer están visibles
  useEffect(() => {
    const checkoutSection = document.getElementById('checkout')
    const footerSection = document.querySelector('footer')

    const observer = new IntersectionObserver(
      (entries) => {
        // Si el Checkout o el Footer están visibles, oculta la barra
        const algunoVisible = entries.some((entry) => entry.isIntersecting)
        setIsVisible(!algunoVisible)
      },
      { threshold: 0.1 } // Se activa cuando al menos el 10% del elemento es visible
    )

    if (checkoutSection) observer.observe(checkoutSection)
    if (footerSection) observer.observe(footerSection)

    return () => observer.disconnect()
  }, [])

  // No mostrar si el carrito está vacío o si el Checkout/Footer están visibles
  if (items.length === 0 || !isVisible) return null

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