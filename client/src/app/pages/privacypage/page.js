// pages/privacy-policy.js
import React from 'react';
import Head from 'next/head';
import Navbar from '@/app/components/navbar/page';
import Footer from '@/app/components/footer/page';
import './privacystyle.css';

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - stylishHim</title> 
      </Head>
      <Navbar />
      <div className="privacyContainer">
        <h1 className="privacyHeading">Privacy Policy</h1>
        <p className="privacyText">Effective Date: 27/07/2024</p>

        <h2 className="privacySubheading">Introduction</h2>
        <p className="privacyText">
          Welcome to stylishHim. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website stylishHim.in or use our services.
        </p>

        <h2 className="privacySubheading">Information We Collect</h2>
        <h3 className="privacySubSubheading">Personal Information</h3>
        <p className="privacyText">
          We may collect personal information that you voluntarily provide to us when you:
        </p>
        <ul className="privacyList">
          <li>Register for an account</li>
          <li>Place an order</li>
          <li>Subscribe to our newsletter</li>
          <li>Participate in surveys or promotions</li>
          <li>Contact our customer service</li>
        </ul>
        <p className="privacyText">
          The personal information we collect may include:
        </p>
        <ul className="privacyList">
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Mailing address</li>
          <li>Payment information</li>
        </ul>

        <h3 className="privacySubSubheading">Non-Personal Information</h3>
        <p className="privacyText">
          We may also collect non-personal information about you, such as:
        </p>
        <ul className="privacyList">
          <li>Browser type</li>
          <li>IP address</li>
          <li>Pages visited on our website</li>
          <li>Time and date of visits</li>
          <li>Referring URL</li>
        </ul>

        {/* Other sections omitted for brevity */}

        <h2 className="privacySubheading">Contact Us</h2>
        <p className="privacyText">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="privacyText">Email: forpradeepmishra@gmail.com</p>
        <p className="privacyText">Address: Noida Sector-2, Uttar Pradesh 201301</p>
        <p className="privacyText">Phone: 9999 781282</p>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
