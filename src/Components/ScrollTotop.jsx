import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const smoother = ScrollSmoother.get(); // جيب الـ instance الحالي
        if (smoother) {
            smoother.scrollTo(0, false); // false = instant بدون animation
        } else {
            window.scrollTo({ top: 0 }); // fallback لو ScrollSmoother مش شغال
        }
    }, [pathname]);

    return null;
}

export default ScrollToTop;