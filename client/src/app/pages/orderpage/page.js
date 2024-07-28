// ordersReceived.js
"use client";
import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import Link from "next/link";

import { FaWhatsapp } from "react-icons/fa";

const OrdersReceived = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "200px" }}>
        <h1
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            fontSize: "25px",
            color: "green",
          }}
        >
      Thankyou For Choosing Us! 
        </h1>
        <p style={{
            margin: "20px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "green",
          }}>We have recieved your Order Successfully. Our team will contact you as soon as Possible</p>
        <style jsx>{`
          .button {
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            border: 1px solid #000;
            text-decoration: none;
            color: #000;
            transition: background-color 0.3s ease;
          }
          .button:hover {
            background-color: #000;
            color: #fff;
          }
        `}</style>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              borderRadius: "10px",
              border: "2px solid green",
              width: "200px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "50px",
            }}
          >
            <Link
              style={{ fontWeight: "bolder" }}
              href="https://wa.me/8887796224"
              className="button"
            >
              GetDetails
            </Link>
            <FaWhatsapp />
          </div> 
        </div> 
      </div>
      <Footer />
    </>
  );
};

export default OrdersReceived;
