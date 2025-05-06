import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const GuestPrivacyPolicy = () => {
    // Check for logged-in user
    const cookieget = Cookies.get('memberToken');
    let username = '';

    if (cookieget) {
        const decoded = jwtDecode(cookieget);
        username = decoded.given_name || decoded.username || '';
    }

    return (
        <div className="min-h-screen flex flex-col justify-between" style={{ background: '#FF7E00' }}>
            <Navbar data={username} />

            <main className="flex justify-center px-4 mt-10 mb-10">
                <div
                    className="bg-[#F4DFC8] p-8 rounded-lg shadow-lg max-w-3xl w-full border border-black"
                >
                    <h2 className="text-2xl font-bold text-gray-700">Privacy Policy</h2>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">1. Return Policy</h3>
                        <p className="mt-2 text-gray-700 text-base">
                            A return will be made only if there is a defect in the product, and no refund will be made at any time.
                            When returning, the customer must bear the delivery fees, and it must be sent to the address we provide.
                        </p>
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">3. Delivery Policy</h3>
                        <p className="mt-2 text-gray-700 text-base">
                            Orders are usually confirmed within 24 hours and delivered within 1-2 business days, depending on location and availability.
                            Delivery may be delayed due to weather or traffic conditions. Our delivery partner will contact you prior to delivery and
                            the item will only be handed over at the specified delivery address.
                        </p>
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">4. Payment Policy</h3>
                        <p className="mt-2 text-gray-700 text-base">
                            <strong>Digital Payment:</strong> We accept Visa, MasterCard, American Express, Payoneer, PayPal, and other supported methods. <br />
                            <strong>Bank Deposit:</strong> Provide proof of payment. We verify it before confirming the order. <br />
                            <strong>Cash on Delivery:</strong> Delivery fee must be paid and proof of payment uploaded. Orders are confirmed after validation.
                        </p>
                        <p className="mt-4 text-gray-700 text-base">
                            <strong>Security:</strong> Transactions use encrypted, secure gateways. <br />
                            <strong>Charges:</strong> Typically applied at purchase or shipping.
                        </p>
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">5. Privacy Policy</h3>
                        <p className="mt-2 text-gray-700 text-base">
                            <strong>Data Collection:</strong> Includes personal info (name, address, email) and transaction details. <br />
                            <strong>Usage:</strong> For order processing, account management, and communications. Marketing messages sent only with consent. <br />
                            <strong>Protection:</strong> We use industry-standard security to prevent data breaches.
                        </p>
                    </section>

                    <section className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">6. Customer Service</h3>
                        <ul className="mt-2 list-disc list-inside text-gray-700 text-base space-y-1">
                            <li><strong>Contact:</strong> Available via email, phone, or live chat. Contact details are on our site.</li>
                            <li><strong>Support:</strong> For orders, product queries, returns, and warranties.</li>
                            <li><strong>Hours:</strong> Refer to our website for customer service hours based on our operating time zone.</li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default GuestPrivacyPolicy;
