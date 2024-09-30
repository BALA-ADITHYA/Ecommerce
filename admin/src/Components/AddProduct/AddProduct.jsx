import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'

const AddProduct = () => {

  const [image,setImage] = useState(false);
  const [productDetails,setProductDetails] = useState({
    name: '',
    image:"",
    category:"women",
    new_price:"",
    old_price:""

  })

  const imageHandler = (e)=>{
      setImage(e.target.files[0])
  }

  const changeHandler = (e)=>{

    setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const Add_Product = async()=>{
    console.log(productDetails)
    let responseData;
    let product = productDetails;

    let formdata = new FormData();

    formdata.append('product',image)

    await fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/upload',{
      method:'Post',
      headers:{
        Accept:'application/json',
      },
      body:formdata
    }).then((resp)=>resp.json()).then((data)=>{responseData=data})

    if(responseData.success){
      product.image = responseData.image_url
      await fetch('https://ecommerce-bala-indh-rekh-backend2.onrender.com/addproduct',{
        method:'Post',
        headers:{
          Accept:'application/json',
          'Content-type':'application/json'
        },
        body:JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert('Failed')
      })
    }
  }

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input onChange={changeHandler} value={productDetails.name} type="text" name="name" placeholder='Type Here' id="" />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input onChange={changeHandler} value={productDetails.old_price} type="text"  placeholder='Type Here' name="old_price" id="Type Here" />
        </div>
   
       <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input onChange={changeHandler} value={productDetails.new_price} type="text"  placeholder='Type Here' name="new_price" id="Type Here" />
        </div>
        </div>
      <div className="addproduct-itemfiled">
        <p>Product Category</p>
        <select onChange={changeHandler} value={productDetails.category} name="category" id="add-product-selector">
        <option value="women">Women</option>
        <option value="men">Men</option>
        <option value="kid">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfiled">
        <label htmlFor="file-input">
          <img  src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={()=>{Add_Product()} }className="addproduct-btn">ADD</button>
    </div>
  )
}

export default AddProduct
