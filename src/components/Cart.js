import React from "react";

const Cart = ({ cart, subtotal, threshold }) => {
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  return (
    <div className="cart-summary">
      <h2>Cart Summary</h2>
      <p><strong>Subtotal:</strong> ₹{subtotal}</p>
      <div className="progress-container">
        <p>{remaining > 0 ? `Add ₹${remaining} more to get a FREE Wireless Mouse!` : "🎁 Free gift added!"}</p>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <span>Add some products to see them here!</span>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ₹{item.price} × {item.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
