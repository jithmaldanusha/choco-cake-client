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
    if (decoded.given_name) {
       username = decoded.given_name
    }else{

      username = decoded.username || '';
    }
  
}

  return (
    <div>
        <Navbar data={username}/>
        
        <div className="min-h-screen  flex">
            {/* Sidebar */}
            <UserDashboardNav />

            {/* Main Content */}
            <div className="p-8" style={{ width: '1000px' }}>
                <div className="bg-white p-6 mt-10 mb-5 rounded-lg shadow-lg" style={{ border: '1px solid black', borderRadius: '8px' }}>
                    <h2 className="text-2xl font-bold" style={{ color: '#757575' }}>Privacy Policy</h2>
                    
                    {/* fact 01 topic */}
                    <h1 className='mt-3' style={{ color: '#757575', fontSize: '24px' }}>1. Return Policy</h1>

                    {/* fact 01 description */}
                    <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
                        A return will be made only if there is a defect in the product and no refund will be made at any time.
                        When returning, the customer must bear the delivery fees and it must be done to the address provided by us.
                    </p>

                    {/* fact 02 topic */}
                    <h1 className='mt-8' style={{ color: '#757575', fontSize: '24px' }}>2. Warranty</h1>
                    
                    {/* Fact 02 description */}
                    <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
                        All of our products are warranted against manufacturing defects only. 
                        No warranty claim will be made for physical damage and water damage at any time.
                        If there is a product defect, please contact us first and we will remotely check the product according to the basic steps we provide. 
                        If it is difficult to inspect the product remotely, you must return it and then inspect the product to notify you of the defect. 
                        In those tests, a warranty claim is made only under the conditions mentioned above. 
                        Exclusive One to One Replacement Warranty service is offered only for our selected products.
                    </p>

                    {/* fact 03 */}
                    <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>3. Shipping Policy</h3>

                    {/* Fact description */}
                    <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
                        The order will be confirmed within twenty-four hours of placing the order. We make sure to deliver your order within 2-3 working days.
                        Delivery time may vary depending on weather conditions. You can track the delivery status of your order through our website.
                        Koombiyo delivery service, which provides our delivery service, will contact you by phone before bringing the product and will deliver the product only to the address you provided.
                    </p>

                    {/* fact 04 */}
                    <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>4. Payment Policy</h3>

                    {/* Fact description */}
                    <p className="mt-2" style={{ color: '#757575', fontSize: '16px' }}>
                        Digital Payment: Commonly accepted payment methods include major credit and Debit cards (Visa, MasterCard, American Express), Payoneer, and Paypal, and sometimes other digital payment options.
                        Bank Deposit: When paying for goods by money transfer through banks, you must provide us with the proof of payment related to the payment. We confirm the order only after checking its validity.
                        Cash on Delivery: If you order goods under the cash on delivery service, you must pay the delivery fee for the order and upload the bank receipt. Checks the validity of the payment and confirms the order
                    </p>

                    <p className='mt-7' style={{ color: '#757575', fontSize: '16px' }}>
                        Security: Transactions are processed using secure payment gateways with encryption to protect financial information.
                        Charges: Charges are typically made at the time of purchase or when the order is shipped.
                    </p>

                    {/* fact 05 */}
                    <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>5. Privacy Policy</h3>

                    {/* fact description */}
                    <p className="mt-3" style={{ color: '#757575', fontSize: '16px' }}>
                        Data Collection: Information collected includes personal details (name, address, email) and transaction information.
                        Usage: Data is used to process orders, manage accounts, and communicate with customers. Marketing communications
                        may be sent with prior consent.
                        Protection: Data is protected using industry-standard security measures to prevent unauthorized access and breaches.
                    </p>

                    {/* fact 06 */}
                    <h3 className='mt-8' style={{ color: '#757575', fontSize: '20px' }}>6. Customer Service</h3>

                    {/* Fact description */}
                    <ul className="mt-4" style={{ color: '#757575', fontSize: '16px', lineHeight: '1.6' }}>
                        <li>- Contact: Typically available via email, phone, or live chat. Contact information is provided on the website.</li>
                        <li>- Support: Assistance is offered for order issues, product inquiries, returns, and warranty claims.</li>
                        <li>- Hours: Customer service hours are usually listed on the website and may be during business hours of the store’s operating time zone</li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  );
};

export default PrivacyPolicy;
