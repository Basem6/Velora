import { createContext} from "react";
import { useReducer, useEffect } from "react";
import ProductReducer from '../features/products/ProductReducer';
import { All_proudct } from '../features/products/ProductReducer'

export const CartContext = createContext(null);
export function Contextprovider({children}){
    const [state, dispatch] = useReducer(
        ProductReducer,
        All_proudct
    );
    
    // Load cart and love data from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('velora_cart');
        const savedLove = localStorage.getItem('velora_love');
        
        if (savedCart) {
            try {
                const cartData = JSON.parse(savedCart);
                cartData.forEach((item, index) => {
                    if (item.addtocard) {
                        dispatch({
                            type: 'addedcart',
                            payload: { id: index + 1 },
                        });
                    }
                    if (item.countincart > 1) {
                        for (let i = 1; i < item.countincart; i++) {
                            dispatch({
                                type: 'plusItem',
                                payload: index,
                            });
                        }
                    }
                });
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
        
        if (savedLove) {
            try {
                const loveData = JSON.parse(savedLove);
                loveData.forEach((item, index) => {
                    if (item.addtoLove) {
                        dispatch({
                            type: 'addedLove',
                            payload: { id: index + 1 },
                        });
                    }
                });
            } catch (error) {
                console.error('Error loading wishlist from localStorage:', error);
            }
        }
    }, []);
    
    // Save cart and love data to localStorage whenever state changes
    useEffect(() => {
        const cartData = state.map(item => ({
            addtocard: item.addtocard,
            countincart: item.countincart,
        }));
        
        const loveData = state.map(item => ({
            addtoLove: item.addtoLove,
        }));
        
        localStorage.setItem('velora_cart', JSON.stringify(cartData));
        localStorage.setItem('velora_love', JSON.stringify(loveData));
    }, [state]);
    
    return(
        <CartContext.Provider value={{state, dispatch}} >
            {children} 
        </CartContext.Provider>
    )
}