 

'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';
import { useDispatch } from 'react-redux';
import { add } from '@/Redux/Cartslice'; 

import { toast } from 'react-toastify';
// Update this URL to your actual backend API endpoint
const ProductsApi = "https://api.keeva.in/api/products";

export default function Beddisplay() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const dispatch = useDispatch(); // Redux dispatch


  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${ProductsApi}?category=BED`);
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

  const handleAddToWishlist = (product) => {
    dispatch(add({ ...product, quantity: 1 }));
    toast('Added to Wishlist', {
      position: "bottom-center",
      autoClose: 1000, // 1 second
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      style: {
        backgroundColor: '#964B00',
        color: 'white',
        fontWeight: 'bold',
      },
    });
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
              <button className="prodcut_button" onClick={() => handleAddToWishlist(product)}>Add To Wishlist</button>     
            </div>
          </div>
        ))}
      </div> 
      <Footer />
    </div>
  );
}
