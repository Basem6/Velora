import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from './Nav'
import { Routes, Route } from "react-router-dom";
import { HomePage } from './Homepage/HomePage';
import Footer from './Footer';
import Productspage from './Productspage/Productspage';
import CartPage from './Cartpage/Cartpage';
import ProductDetails from './Detailsproudct';
import { Contextprovider } from './Context/Productscontext';
import Checkout from './Components/Checkout';
import AboutPage from './Components/Aboutpage';
import { ToastContext } from './Context/Toastcontext';
import LoginPage from './Components/Login';
import WishlistPage from './Components/LoveProducts';
function App() {
  return (
    <>
    <ToastContext>
      < Contextprovider>
            <Routes>
              <Route path="/" element={
                <>
                  <Navbar/>
                  <HomePage></HomePage>
                  <Footer/>
                </>
              } />
              <Route path="Shop" element={
                <>
                  <Navbar/>
                  <Productspage></Productspage>
                  <Footer/>
                </>
              } />
              <Route path="Cart" element={
                <>
                  <Navbar/>
                  <CartPage></CartPage>
                  <Footer/>
                </>
              } />
              <Route path="/product/:id"  element={
                <>
                  <Navbar/>
                  <ProductDetails></ProductDetails>
                  <Footer/>
                </>
              } />
              <Route path='/checkout' element={
                <>
                  <Navbar/>
                  <Checkout></Checkout>
                  <Footer/>
                </>
              }></Route>
              <Route path='about' element={
                <>
                  <Navbar/>
                  <AboutPage></AboutPage>
                  <Footer/>
                </>
              }></Route>
              <Route path='login' element={
                <>
                  <LoginPage></LoginPage>
                </>
              }></Route>
              <Route path='Wishlist' element={
                <>
                  <Navbar/>
                  <WishlistPage></WishlistPage>
                  <Footer/>
                </>
              }></Route>
            </Routes>
      </ Contextprovider>
    </ToastContext>
    </>
  )
}
export default App
