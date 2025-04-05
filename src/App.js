import React, { useState, useEffect } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [cart, setCart] = useState([]);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (subtotal >= THRESHOLD) {
      setCart((prevCart) => {
        if (!prevCart.find((item) => item.id === FREE_GIFT.id)) {
          return [...prevCart, { ...FREE_GIFT, quantity: 1 }];
        }
        return prevCart;
      });
    } else {
      setCart((prevCart) => prevCart.filter((item) => item.id !== FREE_GIFT.id));
    }
  }, [subtotal]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1>
      <ProductList products={PRODUCTS} addToCart={addToCart} />
      <Cart cart={cart} subtotal={subtotal} threshold={THRESHOLD} />
    </div>
  );
}

export default App;
