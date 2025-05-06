import React from 'react';
import UserDashboardNav from '../Components/UserDashboardNav';
import Navbar from '../Components/Navbar';
import Footer from "../Components/Footer"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PrivacyPolicy = () => {
  // checking logged user
  const cookieget = Cookies.get("memberToken");
  let username = '';

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    username = decoded.given_name || decoded.username || '';
  }

  return (
    <div>
      <Navbar data={username} />

      <div className="min-h-screen flex">
        {/* Sidebar */}
        <UserDashboardNav />

        {/* Main Content */}
        <div className="p-8" style={{ width: '1000px' }}>
          <div className="bg-white p-6 mt-10 mb-5 rounded-lg shadow-lg" style={{ border: '1px solid black', borderRadius: '8px' }}>
            <h2 className="text-2xl font-bold" style={{ color: '#757575' }}>Privacy Policy</h2>

            {/* 1. Return Policy */}
            <h1 className='mt-3' style={{ color: '#757575', fontSize: '24px' }}>1. Return Policy</h1>
            <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
              Due to the perishable nature of cakes and desserts, we do not accept returns once a product has been delivered. 
              However, if there is an issue with the quality or if you received the wrong item, please contact us immediately. 
              We will do our best to resolve the issue, which may include a replacement or credit.
            </p>

            {/* 2. Shipping Policy */}
            <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>2. Delivery Policy</h3>
            <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
              Orders are usually confirmed within 24 hours and delivered within 1-2 business days, depending on location and availability. 
              Delivery may be delayed due to weather or traffic conditions. Our delivery partner will contact you prior to delivery and 
              the item will only be handed over at the specified delivery address.
            </p>

            {/* 3. Payment Policy */}
            <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>3. Payment Policy</h3>
            <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
              We accept a variety of payment methods including credit/debit cards (Visa, MasterCard), digital wallets, bank deposits, and cash on delivery. 
              For bank deposits, you must upload valid proof of payment. Orders will be confirmed only after verifying the payment.
            </p>
            <p className='mt-7' style={{ color: '#757575', fontSize: '16px' }}>
              Security: All transactions are securely processed through encrypted payment gateways to ensure your information is protected.
              Charges: You will be charged once your order is placed and confirmed.
            </p>

            {/* 4. Privacy Policy */}
            <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>4. Privacy Policy</h3>
            <p className="mt-3" style={{ color: '#757575', fontSize: '16px' }}>
              Data Collection: We collect only necessary personal information such as name, address, contact number, and payment details.
              Usage: Your information is used solely for order processing, account management, and sending order updates or promotional content with your consent.
              Protection: We implement security best practices to keep your data safe from unauthorized access or misuse.
            </p>

            {/* 5. Customer Service */}
            <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>5. Customer Service</h3>
            <ul className="mt-4" style={{ color: '#757575', fontSize: '16px', lineHeight: '1.6' }}>
              <li>- Contact: You can reach us through email, WhatsApp, or the contact form on our website.</li>
              <li>- Support: We assist with inquiries about cake orders, delivery status, customization requests, and feedback.</li>
              <li>- Hours: Our customer service is available Monday to Saturday from 9 AM to 6 PM.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
