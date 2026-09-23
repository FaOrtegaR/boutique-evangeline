import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCarritoStore = create(
  persist(
    (set, get) => ({
      items: [],
      isModalOpen: false,
      isCheckoutOpen: false,
      productoSeleccionado: null,

      abrirModal: () => set({ isModalOpen: true }),
      cerrarModal: () => set({ isModalOpen: false }),
      abrirCheckout: () => {
        set({ isCheckoutOpen: true, isModalOpen: false }),

        setTimeout (() => {
          const checkoutSection = document.getElementById('checkout')
          if (checkoutSection) {
            const y0ffset = 80
            const y = checkoutSection.getBoundingClientRect().top + window.pageYOffset + y0ffset
            window.scrollTo({ top: y, behavior: 'smooth'})
          }       
        }, 100)
      },
      cerrarCheckout: () => set({ isCheckoutOpen: false }),
      abrirDetalleProducto: (producto) => set({ productoSeleccionado: producto }),
      cerrarDetalleProducto: () => set({ productoSeleccionado: null }),

      agregarProducto: (producto) => {
        const items = get().items
        const existe = items.find(item => item.id === producto.id)
        
        if (existe) {
          set({
            items: items.map(item =>
              item.id === producto.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            )
          })
        } else {
          set({ items: [...items, { ...producto, cantidad: 1 }] })
        }
      },
      
      eliminarProducto: (id) => {
        set({ items: get().items.filter(item => item.id !== id) })
      },
      
      aumentarCantidad: (id) => {
        set({
          items: get().items.map(item =>
            item.id === id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          )
        })
      },
      
      disminuirCantidad: (id) => {
        set({
          items: get().items
            .map(item =>
              item.id === id
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
            .filter(item => item.cantidad > 0)
        })
      },
            
      limpiarCarrito: () => set({ items: [] }),
      
      totalItems: () => get().items.reduce((acc, item) => acc + item.cantidad, 0),
      
      totalPrecio: () => get().items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    }),
    {
      name: 'carrito-evangeline'
    }
  )
)