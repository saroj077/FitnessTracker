import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import countries from './countries.json';
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stateCity, setStateCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const finalPrice = totalPrice - discount;

  const handleQuantityChange = (product, change) => {
    const newQuantity = Math.max((product.quantity || 1) + change, 1);
    setCart(cart.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item));
  };

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  return (
    <div className="cart-page">
      <h2>Shopping Bag</h2>
      <p>{cart.length} items in your bag.</p>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <p className="cart-item-category">{item.category}</p>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-color-size">Color: {item.color} • Size: {item.size}</p>
              </div>
              <div className="cart-item-price">${item.price.toFixed(2)}</div>
              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(item, 1)}>+</button>
              </div>
              <div className="cart-item-total-price">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="shipping-calculator">
            <h3>Calculated Shipping</h3>
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>{country.name}</option>
              ))}
            </select>
            <input 
              type="text" 
              value={stateCity} 
              onChange={(e) => setStateCity(e.target.value)} 
              placeholder="State / City" 
            />
              <input 
              type="text" 
              value={zipCode} 
              onChange={(e) => setZipCode(e.target.value)} 
              placeholder="ZIP Code" 
            />
            <button>Update</button>
          </div>

          <div className="coupon-code">
            <h3>Coupon Code</h3>
            <input 
              type="text" 
              value={coupon} 
              onChange={(e) => setCoupon(e.target.value)} 
              placeholder="Coupon Code" 
            />
            <button onClick={applyCoupon}>Apply</button>
          </div>
          <div className="cart-total">
            <p>Cart Subtotal: ${totalPrice.toFixed(2)}</p>
            <p>Discount: -${discount.toFixed(2)}</p>
            <h3>Cart Total: ${finalPrice.toFixed(2)}</h3>
            <button>Proceed to Checkout</button>
          </div>
        </div>
      </div>
      <button className="continue-shopping-button" onClick={() => navigate('/dashboard/commerce')}>Continue Shopping</button>
    </div>
  );
};

export default Cart;

