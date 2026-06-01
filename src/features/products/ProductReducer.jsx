import { imageMap } from '../../utils/imageMap';
import productsData from '../../data/products.json';

// Convert image keys to actual image paths
export  const All_proudct = productsData.map(product => ({
    ...product,
    img: imageMap[product.img]
}));
const ProductReducer = (state, action) => {
    switch (action.type) {
        case "addedcart":
            return state.map((item , index)=>{
                if(index == action.payload.id-1){
                    return {...item,addtocard:true}
                }else{
                    return item
                }
        })
        case "romvefromcart":
            return state.map((item , index)=>{
                if(index == action.payload){
                    return {...item,addtocard:false}
                }else{
                    return item
                }
        })
        case "addedLove":
            return state.map((item , index)=>{
                if(index == action.payload.id-1){
                    return {...item,addtoLove:true}
                }else{
                    return item
                }
        })
        case "removefromlove":
            return state.map((item , index)=>{
                if(index == action.payload){
                    return {...item,addtoLove:false}
                }else{
                    return item
                }
        })
        case "plusItem":
            return state.map((item,index)=>{
                if(index == action.payload){
                    return {...item , countincart:item.countincart+1}
                }else{
                    return item
                }
        })
        case "minusItem":
            return state.map((item,index)=>{
                if(index == action.payload){
                    return {...item , countincart:item.countincart-1}
                }else{
                    return item
                }
        })
    default:
    return  state;
    }
};
export default ProductReducer;