import React from 'react'
import './Product.css'

const Product = () => {
  return (
    <div className="product-containers">
        <h1>Our Feature Products</h1>

        <div className="products">
            <ul className='product-menu'>
                <li>All</li>
                <li>Fitness Equipments</li>
                <li>Apparel and Accessories</li>
                <li>Nutrition Supplements</li>
            </ul>

            <div className="product-list">
                
            </div>
        </div>
    </div>
  )
}

export default Product
