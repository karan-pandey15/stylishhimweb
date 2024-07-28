 
// CartPage.js
"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { remove } from "@/Redux/Cartslice";
import { setCart } from "@/Redux/Cartslice"; // Import setCart action
import "./CartStyle.css";
import Footer from "@/app/components/footer/page";
import Link from "next/link";
import Navbar from "@/app/components/navbar/page";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; 
const CartPage = () => {
  const [auth, setAuth] = useState();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  useEffect(() => {
    axios
      .get("http://192.168.1.5:5010/api/user-data")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
        } else {
          setAuth(false);
          router.push("/pages/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        router.push("/pages/signin");
      });
  }, [router]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      dispatch(setCart(JSON.parse(savedCart))); // Dispatch setCart action to set cart data
    }
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(remove(id));
    alert("Are You Sure want to remove this Product from Cart.");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://192.168.1.5:5010/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          items: cart,
        }),
      });
      const data = await response.json();
      console.log(data);

      const { id: order_id } = data.order; // Assuming the response contains the order id

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const options = {
        key: "rzp_live_5PPrr1z0Y5RqDP", // Replace with your Razorpay key
        amount: totalPrice * 100,
        currency: "INR",
        name: "Keeva",
        description: "visit Again",
        order_id: order_id,
        handler: async (response) => {
          try {
            const paymentResult = await axios.post(
              "http://192.168.1.5:5010/api/payment-verification",
              {
                order_id,
                ...response,
              }
            );
            toast(paymentResult.data.message, {
              position: "bottom-center",
              autoClose: 1000, // 1 second
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              style: {
                backgroundColor: "#007200",
                color: "white",
                fontWeight: "bold",
              },
            });

            // Clear cart on successful payment
            dispatch(setCart([]));
            router.push("/pages/orderpage");
          } catch (error) {
            console.error("Payment verification error:", error);
            toast("Payment verification failed, please try again.", {
              position: "bottom-center",
              autoClose: 1000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              style: {
                backgroundColor: "#ff0000",
                color: "white",
                fontWeight: "bold",
              },
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact,
        },
        notes: {
          address: "Your Company Address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      toast("Something went wrong, please try again later.", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "#ff0000",
          color: "white",
          fontWeight: "bold",
        },
      });
    }
  };

  
  const paylaterCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://192.168.1.5:5010/api/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          items: cart,
        }),
      });
      const data = await response.json();
      console.log(data);
      toast("Order Placed SuccessFully!", {
        position: "bottom-center",
        autoClose: 1000, // 1 second
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        style: {
          backgroundColor: "#007200",
          color: "white",
          fontWeight: "bold",
        },
      });

      // Dispatch action to clear cart after successful checkout
      dispatch(setCart([]));

      router.push("/pages/orderpage");

      // Handle success response
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <h2>Your cart is empty.</h2>
          <Link href="/">
            <button className="bg-blue-500 text-white py-1 mx-4 px-3 rounded-md mt-2 hover:bg-red-600 duration-300">
              GoTo Shop
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }



  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }}></div>
      <div className="w-full flex justify-center items-center">
        <div className="flex flex-col w-[90%] sm:w-[80%] py-8 cart-page-main_div">
          {cart.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row justify-between items-center py-4 border-b border-gray-200"
            >
               <Link href={`/components/product/${product._id}`}> 
              <div className="image-container">
                <Image
                  src={product.images[0]} // Assuming the first image is used
                  alt={product.name}
                  width={200}
                  height={200}
                  className="product-image"
                />
              </div>
              </Link>
            
              <div className="flex-1 px-4 text-container">
                <h2 className="text-xl font-medium">{product.name}</h2>
                <p className="text-gray-600">Description: {product.description}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-gray-600">Unit Price: ₹{product.price}</p>
                <p className="text-gray-600">
                  Total Price: ₹{product.price * product.quantity}
                </p>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded-md mt-2 hover:bg-red-600 duration-300"
                  onClick={() => handleRemove(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 mt-4 border-t border-gray-200 total-container">
            <h2 className="text-2xl font-medium">Total Price: ₹{totalPrice}</h2>

            <div>
      <h2 style={{fontWeight:'bold',margin:'10px'}} >Choose payment method and checkout</h2>
      <div 
         style={{display:'flex',justifyContent:'space-around'}}
      >
        <label>
          <input
            type="radio"
            name="payment"
            value="payOnDelivery"
            checked={paymentMethod === 'payOnDelivery'}
            onChange={() => setPaymentMethod('payOnDelivery')}
          />
          Pay on Delivery
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            name="payment"
            value="payNow"
            checked={paymentMethod === 'payNow'}
            onChange={() => setPaymentMethod('payNow')}
          
          />
          Pay Now
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        {paymentMethod === 'payOnDelivery' ? (
          <button
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 duration-300"
            onClick={paylaterCheckout}
            style={{background:'#38b000',fontWeight:'bold'}}
          >
            Checkout
          </button>
        ) : paymentMethod === 'payNow' ? (
          <button
            className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 duration-300"
            onClick={checkout}
            style={{background:'#38b000',fontWeight:'bold'}}
          >
            Pay Now
          </button>
        ) : null}
      </div>
    </div> 
          </div>
        </div>
      </div>
      <div style={{ height: "100px" }}></div>
      <Footer />
    </>
  );
};

export default CartPage;
