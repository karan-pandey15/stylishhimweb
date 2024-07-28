"use client";

import { useState } from "react";
import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import "./productform.css";

import Link from "next/link";

const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length > 5) {
      alert("You can upload a maximum of 5 images at a time.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("http://192.168.1.5:5010/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Product created:", data);
        alert("Product added successfully");
        setName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setImages([]);
      } else {
        console.error("Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <form className="form_maincontainer" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Cream">Cream</option>
            <option value="Moisturizers">Moisturizers</option> 
            <option value="FaceWashes">Face Washes</option>
            <option value="Shampoos">Shampoos</option> 
            <option value="Conditioners">Conditioners</option>
            <option value="Scrubs">Scrubs</option> 
            <option value="Soap">Soap</option> 
            
          </select>
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files))}
            required
          />
        </div>
        <button className="form_button" type="submit">
          Create Product
        </button>

       <Link href="/pages/viewdeleteproducts" >
          <button style={{background:'#E64040',marginTop:'10px' ,marginBottom:'40px' ,fontWeight:'bold'}}  className="form_button" >
          View&Delete Product
        </button>
       </Link>
      </form>
      <Footer />
    </div>
  );
};

export default ProductForm;
