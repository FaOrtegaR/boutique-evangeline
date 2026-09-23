function Historia() {
  return (
    <section id="nosotros" className="py-12 px-4 bg-pink-100">
      <div className="max-w-5xl mx-auto">
        
        {/* Título centrado */}
        <h3 className="text-2xl md:text-3xl font-bold text-pink-700 text-center mb-8">
          💗 Nuestra Historia
        </h3>

        {/* Contenedor de dos columnas */}
        <div className="flex flex-col md:flex-row gap-8 items-center">
          
          {/* Columna izquierda: Foto */}
          <div className="w-full md:w-1/3">
            <img
              src="/img/historia.jpg"
              alt="Karelis y Evangeline"
              className="w-full h-64 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Columna derecha: Texto */}
          <div className="w-full md:w-2/3 bg-pink-200 rounded-2xl p-6 shadow-sm">
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              La boutique d'Evangeline nació en la maternidad, mientras veía TikTok y soñaba con darle lo mejor a mi hija. Me di cuenta de que los productos virales no llegaban a nuestra zona, así que decidí traerlos yo misma. Hoy, gracias a ti, puedo llevar el sustento a mi familia y acercarte las tendencias más cute al mejor precio posible.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Historia