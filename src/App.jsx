import './App.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from './Components/Layout/Nav'
import { Routes, Route } from "react-router-dom";
import Footer from './Components/Layout/Footer';
import Productspage from './Components/Productspage/Productspage';
import CartPage from './Components/Cartpage/Cartpage';
import ProductDetails from './Components/Detailsproudct';
import { Contextprovider } from './Context/Productscontext';
import Checkout from './Components/Checkout';
import AboutPage from './Components/Aboutpage';
import { ToastContext } from './Context/Toastcontext';
import LoginPage from './Components/Login';
import WishlistPage from './Components/LoveProducts';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollSmoother from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useRef } from 'react';
import Hero from './Components/Homepage/Hero';
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  const smootherRef = useRef(null);
  useGSAP(()=>{
      smootherRef.current =ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });
  })
  return (
    <>
    <ToastContext>
      < Contextprovider>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Routes>
                <Route path="/" element={
                  <>
                    <Hero smootherRef={smootherRef}></Hero>
                    <Footer/>
                  </>
                } />
                <Route path="Shop" element={
                  <>
                    <Productspage></Productspage>
                    <Footer/>
                  </>
                } />
                <Route path="Cart" element={
                  <>
                    <CartPage></CartPage>
                    <Footer/>
                  </>
                } />
                <Route path="/product/:id"  element={
                  <>
                    <ProductDetails></ProductDetails>
                    <Footer/>
                  </>
                } />
                <Route path='/checkout' element={
                  <>
                    <Checkout></Checkout>
                    <Footer/>
                  </>
                }></Route>
                <Route path='/about' element={
                  <>
                    <AboutPage></AboutPage>
                  </>
                }></Route>
                <Route path='login' element={
                  <>
                    <LoginPage></LoginPage>
                  </>
                }></Route>
                <Route path='Wishlist' element={
                  <>
                    <WishlistPage></WishlistPage>
                    <Footer/>
                  </>
                }></Route>
            </Routes>
          </div>
        </div>
        <Navbar/>
      </ Contextprovider>
    </ToastContext>
    </>
  )
}
export default App
