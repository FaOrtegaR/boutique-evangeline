function Novedades() {
  return (
    <section className="relative w-full h-64 md:h-96 overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="/img/novedades.jpg"
        alt="Novedades del mes - Gorros de animales"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Capa oscura semitransparente para que el texto se lea */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      {/* Texto encima */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
          ✨ Novedades del mes ✨
        </h3>
      </div>
    </section>
  )
}

export default Novedades