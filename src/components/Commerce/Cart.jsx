import React, { useState, useEffect } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import countries from './countries.json';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stateCity, setStateCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const finalPrice = totalPrice - discount;

  const handleQuantityChange = (product, change) => {
    const newQuantity = Math.max((product.quantity || 1) + change, 1);
    setCart(cart.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item));
  };

  const handleDelete = (product) => {
    setCart(cart.filter(item => item.id !== product.id));
  };

  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        alert('Please sign in to place an order');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/orders/place', {
        userId: user._id,
        cart,
        shippingDetails: { country: selectedCountry, stateCity, zipCode }
      });

      alert('Your order has been placed!');
      localStorage.removeItem('cart');
      navigate('/dashboard/commerce');
    } catch (error) {
      console.error('Failed to place order or send confirmation email', error);
      alert('Failed to place order. Please try again later.');
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
              <div className="cart-item-price">
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => handleQuantityChange(item, -1)}>-</button>
                <input type="number" value={item.quantity} readOnly />
                <button onClick={() => handleQuantityChange(item, 1)}>+</button>
              </div>
              <div className="cart-item-total-price">${(item.price * item.quantity).toFixed(2)}</div>
                <FaTrash 
                  className="delete-icon" 
                  onClick={() => handleDelete(item)} 
                />
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
            <button>Calculate Shipping</button>
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
            {discount > 0 && <p className="discount-message">Coupon applied: ${discount.toFixed(2)} off</p>}
          </div>

          <div className="price-summary">
            <div className="summary-item">
              <span>Total Price:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Discount:</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span>Final Price:</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>

      <button className="continue-shopping-button" onClick={() => navigate('/dashboard/commerce')}>Continue Shopping</button>
    </div>
  );
};

export default Cart;
