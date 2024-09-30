import React, { useEffect, useState } from 'react'
import './Popular.css'
import data_product from './../../assets/data';
import Items from '../Items/Items'


const Popular = () => {

  const [product, setProduct] = useState([]);

  useEffect(()=>{
   fetch('http://localhost:4000/popularinwomen').then((res)=>res.json())
   .then((data)=>
   
    setProduct(data))
    
  },[])

  

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {product.map((item,i)=>(
           <Items key={i} id={item.id} name={item.name} image={item.image} 
            new_price={item.new_price} old_price={item.old_price}
           />
        ))}
      </div>
    </div>
  )
}

export default Popular
