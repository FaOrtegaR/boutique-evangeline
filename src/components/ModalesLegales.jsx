import { useState } from 'react'
import { useCarritoStore } from '../store/carritoStore'

function ModalesLegales() {
  const [modalAbierto, setModalAbierto] = useState(null) // 'terminos' | 'privacidad' | null

  const abrirModal = (tipo) => setModalAbierto(tipo)
  const cerrarModal = () => setModalAbierto(null)

  return (
    <>
      {/* Enlaces en el footer */}
      <div className="flex justify-center gap-4 text-xs text-gray-600">
        <button
          onClick={() => abrirModal('terminos')}
          className="hover:text-pink-600 transition"
        >
          Términos y condiciones
        </button>
        <span>·</span>
        <button
          onClick={() => abrirModal('privacidad')}
          className="hover:text-pink-600 transition"
        >
          Privacidad
        </button>
      </div>

      {/* Modal de Términos */}
      {modalAbierto === 'terminos' && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={cerrarModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-pink-700">Términos y condiciones</h2>
              <button
                onClick={cerrarModal}
                className="text-gray-500 hover:text-pink-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
              <p>
                Bienvenido a <strong>La boutique d'Evangeline</strong>. Al realizar un pedido
                a través de nuestra web, aceptas los siguientes términos y condiciones:
              </p>
              <p>
                <strong>1. Productos:</strong> Los productos ofrecidos son de carácter
                promocional y pueden variar según disponibilidad de stock.
              </p>
              <p>
                <strong>2. Precios:</strong> Los precios están expresados en pesos chilenos
                (CLP) e incluyen IVA cuando corresponda. Nos reservamos el derecho de
                modificar los precios sin previo aviso.
              </p>
              <p>
                <strong>3. Pedidos:</strong> Los pedidos se realizan a través de la web y se
                confirman por WhatsApp. El pedido se considera válido una vez que el cliente
                confirma y realiza el pago.
              </p>
              <p>
                <strong>4. Envíos:</strong> Los envíos se realizan por Starken (1-3 días
                hábiles) o retiro en Quintero/Loncura. Los costos de envío se confirman por
                WhatsApp.
              </p>
              <p>
                <strong>5. Pagos:</strong> Aceptamos transferencia bancaria y efectivo. Los
                datos de transferencia se entregan al confirmar el pedido.
              </p>
              <p>
                <strong>6. Devoluciones:</strong> Aceptamos cambios y devoluciones dentro de
                los 7 días posteriores a la recepción del producto, siempre que esté en
                perfectas condiciones.
              </p>
              <p className="text-xs text-gray-500 pt-4 border-t">
                Última actualización: {new Date().toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Privacidad */}
      {modalAbierto === 'privacidad' && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={cerrarModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-pink-700">Política de Privacidad</h2>
              <button
                onClick={cerrarModal}
                className="text-gray-500 hover:text-pink-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="text-sm text-gray-700 space-y-3 leading-relaxed">
              <p>
                En <strong>La boutique d'Evangeline</strong> respetamos tu privacidad y
                protegemos tus datos personales.
              </p>
              <p>
                <strong>1. Datos recopilados:</strong> Al realizar un pedido, recopilamos tu
                nombre, correo electrónico, celular, RUT y dirección (si corresponde a envío).
              </p>
              <p>
                <strong>2. Uso de los datos:</strong> Utilizamos tus datos únicamente para
                procesar tu pedido, coordinar el envío y contactarte en caso de ser necesario.
              </p>
              <p>
                <strong>3. Compartir información:</strong> No compartimos tus datos con
                terceros, excepto con la empresa de courier (Starken) para realizar el envío.
              </p>
              <p>
                <strong>4. Seguridad:</strong> Tus datos se transmiten a través de WhatsApp,
                que cuenta con cifrado de extremo a extremo.
              </p>
              <p>
                <strong>5. Derechos:</strong> Puedes solicitar la eliminación de tus datos en
                cualquier momento escribiéndonos por WhatsApp.
              </p>
              <p className="text-xs text-gray-500 pt-4 border-t">
                Última actualización: {new Date().toLocaleDateString('es-CL')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalesLegales