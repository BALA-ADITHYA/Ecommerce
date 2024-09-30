import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = ()=>{

    let cart = {}

    for(let index = 0; index < 300+1; index++){
        cart[index] = 0;
    }

    return cart

}

const ShopContextProvider = (props) =>{

    const [all_product,setAll_product] = useState([]);

      const [cartItems,setCartItems] = useState(getDefaultCart())
     

      useEffect(()=>{
        fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/allproducts').then((res)=>res.json()).then((data)=>setAll_product(data));

        if (localStorage.getItem("auth-token")){
          fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/getcart',{
            method:'Post',
            headers:{
              Accept:'application/json',
              'auth-token':`${localStorage.getItem("auth-token")}`,
              'Content-Type': 'application/json',
            },
            body:'',
          }).then((res)=>res.json()).then((data)=>setCartItems(data))
        }
        
      },[])
      console.log(all_product)
      
      const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
          fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/addtocart',{
            method:'Post',
            headers:{
              Accept:'application/json',
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type' : 'application/json'
            },
            body:JSON.stringify({"itemId":itemId})
          }).then((res)=>res.json()).then((data)=>console.log(data))
        }
      }


      const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
          fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/removefromcart',{
            method:'Post',
            headers:{
              Accept:'application/json',
              'auth-token':`${localStorage.getItem('auth-token')}`,
              'Content-Type' : 'application/json'
            },
            body:JSON.stringify({"itemId":itemId})
          }).then((res)=>res.json()).then((data)=>console.log(data))
        }
        }
      

      const getTotalCartAmount = ()=>{
        
        let totalAmount = 0;
        for(let item in cartItems){
        if(cartItems[item]>0){
            let itemInfo =all_product.find((product)=>product.id===Number(item));
      
            totalAmount+= itemInfo.new_price * cartItems[item];
        }
        }
        return totalAmount;
      }

      const getTotalCartItems = ()=>{
        let totalItem =0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+= cartItems[item]
            }
        }
        return totalItem;
      }
      
     
      
      const contextValue ={
        all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems
    }

    
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
