import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">
            Description
        </div>
        <div className="descriptionbox-nav-box fade">
            Reviews (122)
        </div>
      </div>
      <div className="descriptionbox-description">
        <p>
            An e-commerce website is an online platform that facilitates the buying and selling of products of services over the internet. with customers, and conduct transactions without thr need for a physical presence.  
        </p>
          <p> E-commerce website have gained immense popularity due to their conveience,accessibility and the globel reach they offer
          </p> 
      </div>
    </div>
  )
}

export default DescriptionBox
