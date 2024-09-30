import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import Cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts,setAllproducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch("http://localhost:4000/allproducts")
    .then((res)=>res.json())
    .then((data)=>{setAllproducts(data)});
  }
  const removeProduct = async(id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method:'Post',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo()
  }

  useEffect(()=>{
    fetchInfo()
  },[])

  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old_price</p>
        <p>New_price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr />
      <div className="listproduct-allproducts">
      <hr />
      {allproducts.map((product,i)=>{
        return <div key={i} className='listproduct-format-main listproduct-format '>
            <img src={product.image} className='listproduct-product-icon' alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{removeProduct(product.id)}} src={Cross_icon} className='listproduct-remove-icon'  alt="" />
        </div>
        
      })}
      </div>
    </div>
  )
}

export default ListProduct
