/**
 * Smooth Scroll Utility
 * Handles both ScrollSmoother (desktop) and native scroll (mobile)
 */

export const smoothScroll = (smootherRef, id) => {
    // Desktop: use GSAP ScrollSmoother
    if (smootherRef && smootherRef.current) {
        smootherRef.current.scrollTo(id, true, "top 80px");
    } else {
        // Mobile: use native HTML5 scrolling
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }
};

/**
 * Detect if device is mobile
 */
export const isMobile = () => {
    return window.innerWidth < 768;
};

/**
 * Handle responsive scroll behavior
 */
export const handleResponsiveScroll = (smootherRef) => {
    if (isMobile()) {
        // Kill ScrollSmoother on mobile
        if (smootherRef?.current) {
            smootherRef.current.kill();
            smootherRef.current = null;
        }
    }
};
