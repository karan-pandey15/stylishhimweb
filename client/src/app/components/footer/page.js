import Link from "next/link";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { BsShop } from "react-icons/bs";
import { FaAward } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";

import "./footerstyle.css";

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#fff" }}>
            <div className="footer_main_container" >
                <footer className="footer_container">
                    <div className="footer_heading_container">
                        <div className="">
                            <h1 className="footer_main_heading">StylishHim</h1>
                            <p className="footer_main_para">Sed viverra tellus in hac habitasse platea dictumst vestibulum. Mauris augue neque gravida in. In cursus turpis massa tincidunt.</p>
                        </div>
                    </div>
                    <div className="link_container">
                        <h5
                            style={{
                                color: "#111",
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            About
                        </h5>
                        <ul className="ul_link">
                            <li className="">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Career
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Stockists
                                </Link>
                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=" "
                                >
                                    Shop Locator
                                </Link>
                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="link_container">
                        <h5
                            style={{
                                color: "#111",
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            Help
                        </h5>
                        <ul className="ul_link">
                            <li className="">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Shipping & Returns
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Track Order
                                </Link>
                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=" "
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Product Returns
                                </Link>

                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Checkout
                                </Link>

                            </li>

                        </ul>
                    </div>


                    <div className="link_container">
                        <h5
                            style={{
                                color: "#111",
                                fontSize: "24px",
                                fontWeight: "600",
                            }}
                        >
                            Information
                        </h5>
                        <ul className="ul_link">
                            <li className="">

                                <Link
                                    href="#"
                                    className=""
                                >
                                    Store Information
                                </Link>
                            </li>


                            <li className="">

                                <Link
                                    href="#"
                                    className=""
                                >
                                    About Store
                                </Link>
                            </li>
                            <li className="">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Latest Products
                                </Link>
                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=" "
                                >
                                    New Discounts
                                </Link>
                            </li>
                            <li className=" ">
                                <Link
                                    href="#"
                                    className=""
                                >
                                    Sale Products
                                </Link>

                            </li>

                            <li className=" ">
                                <Link
                                    href="/pages/adminsignin"
                                    className=""
                                >
                                    Admin Login
                                </Link>

                            </li>

                        </ul>
                    </div>

                    <div className="footer_input_container">
                        <div className="">
                            <h1 className="footer_input_heading">Newsletter</h1>
                            <p className="footer_input_para">Signup for our newsletter to stay up to date on sales and events.</p>
                            <input placeholder="Email Address" className="footer_input" />
                        </div>
                    </div>

 
                </footer>
            </div>
            <div className="small_footer_main_container" >
                <div className="small_footer_child_container" >

                    <Link href='/' >

                    <div className="small_container" >
                         <IoHomeOutline />
                         <p className="small_footer_para" >HOME</p>
                    </div>
                    </Link>

                    <Link href='/pages/about' >
                    <div className="small_container" >
                         <BiCategory />
                         <p  className="small_footer_para" >Blog</p>
                    </div>
                    </Link>


                    <Link href='/pages/adminsignin' >
                        
                    <div className="middle_container" >
                         <FaAward />
                         <p  className="small_footer_para" >List Product</p>
                    </div>
                    </Link>


                    <Link href='/pages/allprd' >
                    <div className="small_container" >
                         <BsShop />
                         <p  className="small_footer_para" >Shop</p>
                    </div>
                    </Link>

                    
                    <Link href='/pages/contactus' >
                    <div className="small_container" >
                         <FaWhatsapp />
                         <p  className="small_footer_para" >Chat</p>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;