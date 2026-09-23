import Header from './components/Header'
import Hero from './components/Hero'
import Novedades from './components/Novedades'
import Catalogo from './components/Catalogo'
import Historia from './components/Historia'
import Checkout from './components/Checkout'
import Footer from './components/Footer'
import ModalCarrito from './components/ModalCarrito'
import ModalProducto from './components/ModalProducto'
import StickyCart from './components/StickyCart'

function App() {
  return (
    <div className="min-h-screen bg-pink-50 pb-20 md:pb-0">
      <Header />
      <Hero />
      <Novedades />
      <Catalogo />
      <Historia />
      <Checkout />
      <Footer />
      <ModalCarrito />
      <ModalProducto />
      <StickyCart />
    </div>
  )
}

export default App