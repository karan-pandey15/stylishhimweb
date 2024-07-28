'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentCheck = () => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Load the Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
    };
    script.onerror = () => {
      console.error('Failed to load the Razorpay script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleBuyNow = async (product) => {
    setProduct(product);
    try {
      const response = await axios.post('http://192.168.1.5:5010/api/razorpay', {
        amount: product.price,
        currency: 'INR',
        receipt: `order_rcptid_${product.id}`
      });

      const { id: order_id } = response.data;

      const options = {
        key: 'rzp_live_5PPrr1z0Y5RqDP',
        amount: product.price * 100,
        currency: 'INR',
        name: 'Your Company Name',
        description: product.name,
        order_id,
        handler: async (response) => {
          const paymentResult = await axios.post('http://192.168.1.5:5010/api/payment-verification', {
            order_id,
            ...response
          });
          alert(paymentResult.data.message);
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Razorpay Corporate Office'
        },
        theme: {
          color: '#3399cc'
        }
      };

      // Check if Razorpay is loaded
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error('Razorpay SDK is not available');
        alert('Razorpay SDK is not available, please try again later.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again later.');
    }
  };

  const products = [
    { id: 1, name: 'Chair', price: 1 },
    { id: 2, name: 'Sofa', price: 1 }
  ];

  return (
    <div>
      <h1>Products</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>Price: ₹{product.price}</p>
          <button onClick={() => handleBuyNow(product)}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default PaymentCheck;
