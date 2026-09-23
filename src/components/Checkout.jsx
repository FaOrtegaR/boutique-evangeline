import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCarritoStore } from '../store/carritoStore'

// Función para validar el RUT chileno
const validarRut = (rut) => {
  // Limpiar el RUT (quitar puntos y guiones)
  const rutLimpio = rut.replace(/[.-]/g, '')
  
  // Debe tener al menos 8 caracteres (7 dígitos + 1 dígito verificador)
  if (rutLimpio.length < 8) return false
  
  // Separar el cuerpo y el dígito verificador
  const cuerpo = rutLimpio.slice(0, -1)
  const dv = rutLimpio.slice(-1).toUpperCase()
  
  // Calcular el dígito verificador
  let suma = 0
  let multiplo = 2
  
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i]) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }
  
  const dvCalculado = 11 - (suma % 11)
  const dvEsperado = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'K' : dvCalculado.toString()
  
  return dv === dvEsperado
}

const checkoutSchema = z.object({
  nombre: z.string().min(2, 'El nombre es obligatorio'),
  apellido: z.string().min(2, 'El apellido es obligatorio'),
  correo: z.string().email('Correo inválido').refine(
    (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email),
    'El correo debe tener un dominio válido (ej: .cl, .com)'
  ),
  celular: z.string()
    .length(9, 'El celular debe tener exactamente 9 dígitos (ej: 912345678)')
    .regex(/^[0-9]+$/, 'El celular solo debe contener números'),
  rut: z.string().optional(),
  formaEntrega: z.enum(['starken', 'retiro']),
  direccion: z.string().optional(),
  metodoPago: z.enum(['transferencia', 'efectivo']),
      }).superRefine((data, ctx) => {
  if (data.formaEntrega === 'starken') {
    // Validar Dirección
    if (!data.direccion || data.direccion.length < 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'La dirección es obligatoria para envío por Starken',
        path: ['direccion'],
      })
    }
    
    // Validar RUT
    if (!data.rut) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El RUT es obligatorio para envío por Starken',
        path: ['rut'],
      })
    } else if (!/^[0-9]+-[0-9kK]$/.test(data.rut)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El RUT debe tener el formato 12345678-9 (sin puntos)',
        path: ['rut'],
      })
    } else if (!validarRut(data.rut)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'El RUT ingresado no es válido',
        path: ['rut'],
      })
    }
  }
})

function Checkout() {
  const {
    items,
    totalPrecio,
    isCheckoutOpen,
    cerrarCheckout,
    abrirModal,
  } = useCarritoStore()

  const [formaEntrega, setFormaEntrega] = useState('starken')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      formaEntrega: 'starken',
      metodoPago: 'transferencia',
    },
  })
  
  useEffect(() => {
  // Si el carrito está vacío y el Checkout está abierto, ciérralo
    if (items.length === 0 && isCheckoutOpen) {
      cerrarCheckout()
    }
  }, [items, isCheckoutOpen, cerrarCheckout])

  const onSubmit = (data) => {
    // 1. Construir el mensaje SIN emojis
    const mensaje = `
*PEDIDO WEB* - La boutique d'Evangeline

*Datos del cliente:*
Nombre: ${data.nombre} ${data.apellido}
Correo: ${data.correo}
Celular: ${data.celular}

*Forma de entrega:*
${data.formaEntrega === 'starken' 
  ? `Envío por Starken (1-3 días)\nDirección: ${data.direccion}\nRUT: ${data.rut}` 
  : 'Retiro en Quintero'}

*Método de pago:*
${data.metodoPago === 'transferencia' ? 'Transferencia' : 'Efectivo'}

*Detalle del pedido:*
${items.map((item) => 
  `• ${item.cantidad}x ${item.nombre} - $${(item.precio * item.cantidad).toLocaleString('es-CL')}`
).join('\n')}

*TOTAL: $${totalPrecio().toLocaleString('es-CL')}*

¡Gracias por tu compra!
    `.trim()

    // 2. Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje)

    // 3. Número de WhatsApp (⚠️ REEMPLAZAR POR EL REAL)
    const numeroWhatsApp = '56950194319'

    // 4. Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank')

    // Limpiar el formulario
    reset()

    // 5. Limpiar el carrito y cerrar el checkout
    useCarritoStore.getState().limpiarCarrito()
    cerrarCheckout()
  }

  if (!isCheckoutOpen || items.length === 0) return null

  return (
    <section id="checkout" className="py-12 px-4 bg-pink-100">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 md:p-8">

        {/* Header del Checkout */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-pink-700">Finalizar pedido</h3>
          <button
            onClick={cerrarCheckout}
            className="text-gray-500 hover:text-pink-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Datos del cliente */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3">Datos del cliente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-600">Nombre *</label>
                <input
                  {...register('nombre')}
                  placeholder="Ej: Juan"
                  className="w-full border border-pink-300 rounded-lg p-2 text-sm"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-xs">{errors.nombre.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-600">Apellido *</label>
                <input
                  {...register('apellido')}
                  placeholder="Ej: Pérez"
                  className="w-full border border-pink-300 rounded-lg p-2 text-sm"
                />
                {errors.apellido && (
                  <p className="text-red-500 text-xs">{errors.apellido.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-600">Correo *</label>
                <input
                  {...register('correo')}
                  placeholder="Ej: correo@ejemplo.cl"
                  className="w-full border border-pink-300 rounded-lg p-2 text-sm"
                />
                {errors.correo && (
                  <p className="text-red-500 text-xs">{errors.correo.message}</p>
                )}
              </div>
              <div>
                <label className="text-xs text-gray-600">Celular *</label>
                <input
                  {...register('celular')}
                  placeholder="Ej: 9 1234 5678"
                  className="w-full border border-pink-300 rounded-lg p-2 text-sm"
                />
                {errors.celular && (
                  <p className="text-red-500 text-xs">{errors.celular.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Forma de entrega */}
          <div className="max-w-md mx-auto border border-pink-300 rounded-xl p-4">
            <h3 className="font-bold text-gray-700 mb-3">Forma de entrega</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value="starken"
                  {...register('formaEntrega')}
                  onChange={() => setFormaEntrega('starken')}
                />
                Envío por Starken (1-3 días)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  value="retiro"
                  {...register('formaEntrega')}
                  onChange={() => setFormaEntrega('retiro')}
                />
                Retiro en Quintero
              </label>
            </div>

            {/* Solo muestra Dirección y RUT si elige Envío por Starken */}
            {formaEntrega === 'starken' && (
              <>
                <div className="mt-3">
                  <label className="text-xs text-gray-600">Dirección *</label>
                  <input
                    {...register('direccion')}
                    placeholder="Ej: Av. Siempre Viva 123, Viña del Mar"
                    className="w-full border border-pink-300 rounded-lg p-2 text-sm"
                  />
                  {errors.direccion && (
                    <p className="text-red-500 text-xs">{errors.direccion.message}</p>
                  )}
                </div>

                <div className="mt-3">
                  <label className="text-xs text-gray-600">RUT *</label>
                  <input
                    {...register('rut')}
                    placeholder="Ej: 12345678-9"
                    className="w-full border border-pink-300 rounded-lg p-2 text-sm"
                  />
                  {errors.rut && (
                    <p className="text-red-500 text-xs">{errors.rut.message}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Tu pedido + Método de pago */}
          <div className="border border-pink-300 rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

              {/* Columna izquierda: Tu pedido */}
              <div className="h-full">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-700">Tu pedido</h3>
                  <button
                    type="button"
                    onClick={() => {
                      cerrarCheckout()
                      abrirModal()
                    }}
                    className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-800 transition border border-pink-300 rounded-full px-3 py-1 hover:bg-pink-50"
                    aria-label="Volver al carrito"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al carrito
                  </button>
                </div>
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2">
                    <img
                      src={`/img/${item.imagenes[0]}`}
                      alt={item.nombre}
                      className="w-10 h-10 object-contain rounded bg-pink-50"
                    />
                    <span className="flex-1 text-sm">{item.nombre}</span>
                    <span className="text-sm">{item.cantidad}</span>
                    <span className="text-sm font-semibold">
                      ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Columna derecha: Método de pago + Resumen */}
              <div className="border border-pink-300 rounded-xl p-4 flex flex-col h-full">
                <h3 className="font-bold text-gray-700 mb-3">Método de pago</h3>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      value="transferencia"
                      {...register('metodoPago')}
                    />
                    Transferencia
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      value="efectivo"
                      {...register('metodoPago')}
                    />
                    Efectivo
                  </label>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Una vez confirmado el pedido te enviaremos los datos de transferencia
                </p>

                 <div className="mt-auto">
                  <div className="flex justify-between text-sm py-1">
                    <span>Subtotal</span>
                    <span>${totalPrecio().toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1">
                    <span>Envío</span>
                    <span className="text-gray-500">Por confirmar</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-pink-200 mt-2 pt-2">
                    <span>Total</span>
                    <span className="text-pink-600">
                      ${totalPrecio().toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Botón Hacer el pedido (sticky en móvil) */}
            <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-pink-200 md:static md:border-0 md:pt-0 md:mt-4">
              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition"
              >
                Hacer el pedido
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Al hacer clic, se abrirá WhatsApp para confirmar tu pedido
              </p>
            </div>
          </div>

        </form>
      </div>
    </section>
  )
}

export default Checkout