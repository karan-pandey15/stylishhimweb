 
"use client";
import React, { useState ,useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardArrowDown, MdAddShoppingCart } from "react-icons/md";
import { FaUser, FaHeart } from "react-icons/fa";
import { ImCross } from "react-icons/im"; 
import Link from "next/link"; 
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";
import "./navbar.css"
import { useRouter } from "next/navigation";

import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShopSubMenuOpen, setIsShopSubMenuOpen] = useState(false);
  const [isPagesSubMenuOpen, setIsPagesSubMenuOpen] = useState(false);

  const router = useRouter();
  const item = useSelector((state)=>state.cart)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleShopMouseEnter = () => {
    setIsShopSubMenuOpen(true);
  };

  const handleShopMouseLeave = () => {
    setIsShopSubMenuOpen(false);
  };

  const handlePagesMouseEnter = () => {
    setIsPagesSubMenuOpen(true);
  };

  const handlePagesMouseLeave = () => {
    setIsPagesSubMenuOpen(false);
  };



  const [user, setUser] = useState(null);

 

  axios.defaults.withCredentials = true;


  const handleLogout = () => {
    axios
      .post("http://192.168.1.5:5010/api/logout-user")
      .then((response) => {
        if (response.data.Status === "Success") {
          localStorage.clear();
          router.push("/pages/signin");
        }
      })
      .catch((error) =>
        console.error("Error occurred while logging out user: " + error)
      );
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://192.168.1.5:5010/api/user-data");
        setUser(response.data.Data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); 
  }, []);
  
  return (
    <>
      <header className="flex justify-center w-full navbar_sticky topnav_fixed">
        <nav className="flex justify-between items-center w-[95%] py-4">
          <div>
            <Link style={{color:'#964B00'}} href="/" className="font-bold text-2xl ">
              StylishHim
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex items-center">
              <li>
                <Link
                   href="/"
                  className="mx-2 lg:mx-5 uppercase text-[14px] lg:text-base tracking-[.15em] font-medium"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                   href="/pages/about"
                  className="mx-2 lg:mx-5 uppercase text-[14px] lg:text-base tracking-[.15em] font-medium"
                >
                  About
                </Link>
              </li>
              <li
                onMouseEnter={handlePagesMouseEnter}
                onMouseLeave={handlePagesMouseLeave}
              >
                <Link
                  href="#"
                  className="flex items-center mx-2 lg:mx-5 uppercase text-[14px] lg:text-base tracking-[.15em] font-medium"
                >
                  Shop
                  <MdKeyboardArrowDown className="text-lg mt-[2px]" />
                </Link>
                {isPagesSubMenuOpen && (
                  <div
                    className="absolute bg-white p-4 pages_submenu"
                    style={{
                      boxShadow:
                        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                      backgroundColor: "#FCF7EE",
                    }}
                  >
                    <ul className="pages_submenu_items">
                  
                        
                    <li className="py-2">
                          <Link href="/pages/creamsdisplay">Creams</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/moisturizersdisplay">Moisturizers</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/facewashesdisplay">Face Washes</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/shampoosdisplay">Shampoos</Link>
                        </li>

                        
                        <li className="py-2">
                          <Link href="/pages/conditionersdisplay">Conditioners</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/bodywashesdisplay">Body Washes</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/scrubdisplay">Scrubs and Exfoliants</Link>
                        </li>
                        
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  href="/pages/allprd"
                  className="mx-2 lg:mx-5 uppercase text-[14px] lg:text-base tracking-[.15em] font-medium"
                >
                  All Products
                </Link>
              </li>
         
             
            </ul>
          </div>
          <ul style={{color:"#964B00"}} className="flex items-center">
           {/* here added  */}

           <div className="px-3">
              {user ? (
                <div  style={{color:"#964b00"}}  className="flex justify-center items-center text-white text-sm">
                  Hello, <span>{user.username}</span>
                  <button style={{color:"#964b00"}} 
                    type="button"
                    className="text-white text-2xl font-bold px-1"
                    title="Logout"
                    onClick={handleLogout}
                  >
                    <IoIosLogOut />
                  </button>
                </div>
              ) : (
                <span style={{color:"#964b00"}}  className="text-white text-sm">
                  Hello, <Link href="/pages/signin">sign in</Link>
                </span>
              )}
            </div>

            <span className="text-white text-lg">
                <Link style={{color:"#964b00"}}  href="/pages/carts" title="Cart">
                  <FaCartArrowDown />
                  {item.length}
                </Link>
              </span>
            <li className="md:hidden mx-1">
              <Link href="#" onClick={toggleMenu}>
                <GiHamburgerMenu className="font-bold text-xl" />
              </Link>
            </li>
          </ul>
        </nav>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden fixed inset-0 bg-black bg-opacity-50 z-50`}
          onClick={toggleMenu}
        ></div>
        <div
          className={`${
            isMenuOpen ? "right-0" : "-right-full"
          } md:hidden fixed h-full overflow-auto bg-white z-50 transition-transform duration-300 ease-in-out`}
          style={{
            width: "80vw",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
        >
          <Link
            href="#"
            onClick={toggleMenu}
            className="absolute top-2 right-4"
          >
            <ImCross className="font-bold text-xl" />
          </Link>
          <ul className="flex flex-col items-start pt-8">

          <li className="py-2">
              <Link   href="/" className="mx-5">
                Home
              </Link>
            </li>
            <li className="py-2">
              <Link   href="/pages/about" className="mx-5">
                About
              </Link>
            </li>
            <li
              onMouseEnter={handlePagesMouseEnter}
              onMouseLeave={handlePagesMouseLeave}
              className="py-2"
            >
              <Link href="#" className="flex items-center mx-5">
                <span>Shop</span>
                <MdKeyboardArrowDown className="text-lg mt-1" />
              </Link>
              {isPagesSubMenuOpen && (
                <div
                  className="absolute bg-white p-4 w-full"
                  style={{
                    backgroundColor: "#FCF7EE",
                  }}
                >
                  <ul>
                  <li className="py-2">
                          <Link href="/pages/creamsdisplay">Creams</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/moisturizersdisplay">Moisturizers</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/facewashesdisplay">Face Washes</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/shampoosdisplay">Shampoos</Link>
                        </li>

                        
                        <li className="py-2">
                          <Link href="/pages/conditionersdisplay">Conditioners</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/bodywashesdisplay">Body Washes</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/scrubdisplay">Scrubs and Exfoliants</Link>
                        </li>

                        <li className="py-2">
                          <Link href="/pages/allprd">All Products</Link>
                        </li>
                    
                    
                  </ul>
                </div>
              )}
            </li>
            <li className="py-2">
              <Link href="/pages/allprd" className="mx-5">
              All Products
              </Link>
            </li>
            <li className="py-2">
              <Link href="/pages/termscond" className="mx-5">
                Terms&Conditions
              </Link>
            </li> 


            <li className="py-2">
              <Link href="/pages/termscond" className="mx-5">
                Privacy Policy
              </Link>
            </li> 
          
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;






