import React, { useContext } from 'react'
import './Product.css'
import { ShopContext } from '../../context/ShopContext'
import { useParams } from 'react-router';
import Breadcrumb from '../../Components/Breadcrumbs/Breadcrumb';
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from './../../Components/RelatedProducts/RelatedProducts';

const Product = () => {

  const {all_product} = useContext(ShopContext);
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId))

  return (
    <div>
      <Breadcrumb product= {product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  )
}

export default Product
