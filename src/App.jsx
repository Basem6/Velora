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
import SplitText from "gsap/ScrollSmoother";
import gsap from "gsap";
import { useRef, useState } from 'react';
import Hero from './Components/Homepage/Hero';
gsap.registerPlugin(SplitText,ScrollTrigger,ScrollSmoother);

function App() {
  const [tl , setTl] =useState(null);
  const smootherRef = useRef(null);
  const [showOverlay] = useState(() => {
    return !sessionStorage.getItem("hero-animation-done");
  });
  useGSAP(()=>{
      const mm = gsap.matchMedia();
      
      // Desktop: stronger smooth scrolling effect
      mm.add("(min-width: 768px)", () => {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          effects: true,
        });
      });
      
      // Mobile: lighter smooth scrolling (better for touch)
      mm.add("(max-width: 767px)", () => {
        smootherRef.current = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 0.8,
          effects: true,
          smoothTouch: true,
        });
      });
      
      return () => {
        mm.revert();
        if (smootherRef.current) {
          smootherRef.current.kill();
          smootherRef.current = null;
        }
      };
  })
  //use REf
    const loading= useRef(null);
    const container2= useRef(null);
    const left= useRef(null);
    const right= useRef(null);
    const main1= useRef(null);
    useGSAP(() => {
    if (
    !loading.current    ||
    !left.current       ||
    !right.current      ||
    !container2.current 
    ) return;
    const tl_h = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("hero-animation-done", "true");
        main1.current.remove(); 
      }
    });
    setTl(tl_h);
    tl_h.from(container2.current, { opacity: 0, scale: 0.93, duration: 0.5, ease: "power2.out" },);
    tl_h.from(loading.current, { width: "0%", duration: 1.5, ease: "power2.out" });
    tl_h.to(container2.current, { opacity: 0, scale: 0.93, duration: 0.3, ease: "power2.out" },);
    tl_h.to(left.current, { x: "-110%", duration: 1.5, ease: "power2.inOut" }, "-=0.3");
    tl_h.to(right.current, { x: "110%", duration: 1.5, ease: "power2.inOut" }, "<");
    // tl_h.to(main1.current, {zIndex:-150,}, "<");
}, { scope: main1, dependencies: [] });
  return (
    <>
    {showOverlay && 
    <div  className="overlay fixed z-150  left-0 top-0 flex items-center justify-center gap-40 min-w-full min-h-full bg-transparent" ref={main1}>
                      <div className=" absolute inset-0 bg-gray-50 max-w-1/2 min-w-1/2 max-h-full min-h-full -z-50" ref={left} ></div>
                      <div className=" absolute inset-0 bg-gray-50 left-1/2 top-0 max-w-1/2 min-w-1/2 max-h-full min-h-full -z-50" ref={right} ></div>
                      <div ref={container2} className="flex flex-col items-center justify-center gap-6">
                          <h1 className="text-4xl font-extrabold text-[#ff981a] text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                              Premium Quality, Unmatched Style
                          </h1>
                          <div className="w-80 h-1 bg-[#C8A882]/50 rounded-lg relative overflow-hidden">
                              <div className="h-full bg-[#C8A882] rounded-lg" ref={loading} style={{ width: "100%" }}></div>
                          </div>
                      </div>
    </div>
  }
    <ToastContext>
      < Contextprovider>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Routes>
                <Route path="/" element={
                  <>
                    <Hero smootherRef={smootherRef} tl={tl}></Hero>
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
