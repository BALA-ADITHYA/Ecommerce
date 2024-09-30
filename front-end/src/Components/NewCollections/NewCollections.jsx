import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import new_collections from './../../assets/new_collections';
import Items from './../Items/Items';

const NewCollections = () => {

  const [new_collections,setNew_collections] = useState([]);

  useEffect(()=>{
    fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/newcollections').then((res)=>res.json())
    .then((data)=>{setNew_collections(data)});
  },[])

  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item,i)=>(
            <Items key={i} id={item.id} name={item.name} image={item.image} 
            new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  )
}

export default NewCollections
