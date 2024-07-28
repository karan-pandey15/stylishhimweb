
'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';  
import { MdDelete } from "react-icons/md"; 
import { toast } from 'react-toastify';
import axios from 'axios';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';

// Update this URL to your actual backend API endpoint
const ProductsApi = "http://192.168.1.5:5010/api/products";

export default function ViewadelAllProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchItem, setSearchItem] = useState('');  
   
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ProductsApi}`);
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the search keywords
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchItem, products]);

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://192.168.1.5:5010/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));

        toast('Product deleted successfully', {
          position: "bottom-center",
          autoClose: 1000, // 1 second
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          style: {
            backgroundColor: '#E64040',
            color: 'white',
            fontWeight: 'bold',
          },
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div> 
       <Navbar />
       <div className="input_container">
        <input
          className="input_style"
          type="search"
          placeholder="Search Products..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div>
      <div className="product_list">
        {filteredProducts.map((product) => (
          <div className="product_card" key={product._id}>
           <Link href={`/components/product/${product._id}`}>
            <div className="img_container"> 
                {product.images && product.images.length > 0 && (
                  <Image
                    className="product_img"
                    src={product.images[0]}
                    alt={product.name}
                    width={500}
                    height={500}
                  />
                )}
            </div>
              </Link>
            <div className="content_container">
              <h2 className="product_heading">{product.name}</h2>
              <p className="description">₹{product.price}</p>
              
 <button style={{background:'#E64040'}} className="prodcut_button"   onClick={() => deleteProduct(product._id)}>
    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',background:"#E64040" ,fontWeight:'bold'}} >
    <MdDelete />  Delete 
    </div>
 </button>
            </div>
          </div>
        ))}
      </div> 
      <Footer />
    </div>
  );
}