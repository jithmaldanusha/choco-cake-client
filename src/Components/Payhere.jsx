import React, { useContext } from 'react'
import md5 from 'crypto-js/md5';
import { MyContext } from './MyContext';

function Payhere() {
    const { text, setText } = useContext(MyContext);
    console.log(text);
    

    const script=document.createElement('script');
    script.src="https://www.payhere.lk/lib/payhere.js";

  
  
    let merchantSecret  = 'MzU4NDM5MjkzNTM1NDc0Mjk4MTczMTc0Njk5MTMwMjM2OTE3NzM0NQ=='; //Replace with your own merchant secret
    let merchantId      = '1227631'; //Replace with your own merchant id
    let orderId         = '12345';
    let amount          = text
    let hashedSecret    = md5(merchantSecret).toString().toUpperCase();
    let amountFormated  = parseFloat( amount ).toLocaleString( 'en-us', { minimumFractionDigits : 2 } ).replaceAll(',', '');
    let currency        = 'LKR';
    let hash            = md5(merchantId + orderId + amountFormated + currency + hashedSecret).toString().toUpperCase();
  
  
      //PaHere Payload
  
      const payment = {
          "sandbox": true, //Enable sandbox mode
          "merchant_id": merchantId,
          "return_url": `localhost`,
          "cancel_url": `localhsot`,
          "notify_url": `localhost`, 
          "first_name": 'ftest',
          "last_name": 'ltest',
          "email": 'test@test.com',
          "phone": "0711234567",
          "address": "Address",
          "city": 'Colombo',
          "country": 'Sri Lanka',
          "order_id": orderId,
          "items": "Fashion Items",
          "currency": 'LKR',
          "amount": amount,
          "hash": hash
      };
  
      // Triggered when completed
      window.payhere.onCompleted = function onCompleted(orderId) {
          console.log("COMPLETED : ", orderId)
      };
  
      // Triggered when dismissed
      window.payhere.onDismissed = function onDismissed() {
  
          console.log("DISMISSED")
  
      };
  
      // Triggerd when error occured 
      window.payhere.onError = function onError(error) {
  
          console.log("ERROR CCC : ", error)
  
      };
  
  
      const payHereHandler = (event) => {
          console.log("PAYHERE HANDLER... CCC ")
  
          window.payhere.startPayment(payment)
  
      }
  
      return <button type="button"onClick={payHereHandler} className='ml-4 bg-blue-400 px-3 py-1.5 rounded-md'>Pay with Payhere</button>;
}

export default Payhere