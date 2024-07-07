import React, { useState, useEffect } from 'react';
import './Commerce.css';
import { products } from '../../Data/product';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Commerce = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleQuantityChange = (product, change) => {
    const newQuantity = Math.max((product.quantity || 1) + change, 1);
    setCart(cart.map(item => item.id === product.id ? { ...item, quantity: newQuantity } : item));
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];

  const visibleProducts = products.filter(product => selectedCategory === 'All' || product.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = visibleProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="commerce-container">
      <div className="cart-icon" onClick={() => navigate('/dashboard/commerce/cart')}>
        <FaShoppingCart />
        <span className="cart-count">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
      </div>
      <h1>Gym Equipment</h1>
      <div className="category-filter">
        <ul>
          {categories.map(category => (
            <li 
              key={category} 
              onClick={() => handleCategoryChange(category)}
              className={category === selectedCategory ? 'selected' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="products">
        {currentItems.map(product => (
          <div key={product.id} className="product-container">
            <div className="product">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price}</p>
              </div>
              <div className="quantity-selector">
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="quantity-input"
              />
            </div>
            </div>
            <button onClick={() => addToCart(product, product.quantity || 1)} className="add-to-cart-button">
                Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="pagination">
        <ul>
          {Array.from({ length: Math.ceil(visibleProducts.length / itemsPerPage) }).map((_, index) => (
            <li key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
              {index + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commerce;
