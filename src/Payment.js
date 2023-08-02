import React, { useState, useEffect } from "react";
import "./Payment.css";
import axios from "axios";
import Creditcard from "./assets/images/Creditcard.png"
import Cvv from "./assets/images/cvv.png"
import expiredDate from "./assets/images/expiredDate.png"


const PaymentPage = () => {
  const [banking, setBanking] = useState([]);
  const [error, setError] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("bankAccount");

  const [bankAccount, setBankAccount] = useState({
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
    banks: "",
  });

  const [upi, setUpi] = useState("");
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handleBankAccountChange = (event) => {
    const { name, value } = event.target;
    setBankAccount({ ...bankAccount, [name]: value });
  };

  const handleUpiChange = (event) => {
    setUpi(event.target.value);
  };

  const handleCreditCardChange = (event) => {
    const { name, value } = event.target;
    setCreditCard({ ...creditCard, [name]: value });
  };
  const handleChangebanks = (event) => {
    setBanking(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission based on selected paymentMethod and the provided data
    // For demonstration purposes, you can log the data or send it to a backend server.
    console.log({
      bankAccount,
      upi,
      creditCard,
    });
  };

  //  useEffect (() =>{

  //   const headers = {
  //     Authorization: 'Basic cnpwX3Rlc3RfU1p2a3hIOGlGT01mSmI6'
  //   }
  //   fetch("https://api.razorpay.com/v1/methods", {method: "GET", headers})
  //   .then((res) => res.json())
  //   .then((data) =>setData(data))
  //   .catch((error) => console.log(error));
  //  },[]);

  useEffect(() => {
    const fetchBankList = async () => {
      try {
        // Headers to be sent with the API request
        const headers = {
          Authorization: "Basic cnpwX3Rlc3RfU1p2a3hIOGlGT01mSmI6",
          // Add other headers if needed
        };

        // Make API request to the fake bank list API
        // Replace the URL with the actual API endpoint URL
        const response = await axios.get("http://api.razorpay.com/v1/methods", {
          headers: headers,
        });

        setBanks(response.data.banks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBankList();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Payment Page</h1>
        {/* payment method */}
        <div className="field-group">
          <label>
            <input
              type="radio"
              value="bankAccount"
              checked={selectedPaymentMethod === "bankAccount"}
              onChange={handlePaymentMethodChange}
            />
            Bank Account
          </label>
        </div>

        {/* Upi mwethods */}
        {/* <div className="field-group bank-fields"> */}
        <div className="field-group">
          <label>
            <input
              type="radio"
              value="upi"
              checked={selectedPaymentMethod === "upi"}
              onChange={handlePaymentMethodChange}
            />
            UPI
          </label>
        </div>
        {/* upi payments */}
        {/* <div className="field-group upi-fields"> */}
        <div className="field-group">
          <label>
            <input
              type="radio"
              value="creditCard"
              checked={selectedPaymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
        </div>

        {selectedPaymentMethod === "bankAccount" && (
          <div
            className={`field-group bank-fields ${
              selectedPaymentMethod === "bankAccount" ? "show" : "hide"
            }`}
          >
            <div>
              <p>Select Your Bank</p>
              <select name="doctype" id="doctype">
                <option value="">Select your Bank</option>
                <option value="AIRP">Airtel Payments Bank</option>
                <option value="BARB_R">Bank of Baroda</option>
                <option value="MAHB">Bank of Maharashtra</option>
                <option value="CNRB">Canara Bank</option>
                <option value="CSBK">Catholic Syrian Bank</option>
                <option value="CBIN">Central Bank of India</option>
                <option value="DCBL">DCB Bank</option>
                <option value="DEUT">Deutsche Bank</option>
                <option value="DLXB">Dhanlaxmi Bank</option>
                <option value="ESFB">Equitas Small Finance Bank</option>
                <option value="FSFB">Fincare Small Finance Bank</option>
                <option value="IBKL">IDBI</option>
                <option value="IDFB">IDFC FIRST Bank</option>
                <option value="IDIB">Indian Bank</option>
                <option value="IOBA">Indian Overseas Bank</option>
                <option value="INDB">Indusind Bank</option>
                <option value="JAKA">Jammu and Kashmir Bank</option>
                <option value="JSFB">Jana Small Finance Bank</option>
                <option value="KARB">Karnataka Bank</option>
                <option value="KVBL">Karur Vysya Bank</option>
                <option value="KKBK">Kotak Mahindra Bank</option>
                <option value="LVB">Lakshmi Vilas Bank</option>
                <option value="NSPB">NSDL Payments Bank</option>
                <option value="PSIB">Punjab & Sind Bank</option>
                <option value="PUNB_R">Punjab National Bank</option>
                <option value="RATN">RBL Bank</option>
                <option value="SVCB">SVC Co-Operative Bank Ltd</option>
                <option value="SRCB">Saraswat Co-operative Bank</option>
                <option value="SIBL">South Indian Bank</option>
                <option value="SBI">State Bank of India</option>
                <option value="TMBL">Tamilnad Mercantile Bank</option>
                <option value="UCBA">UCO Bank</option>
                <option value="UJVN">Ujjivan Small Finance Bank</option>
                <option value="UBI">Union Bank of India</option>
                <option value="VJB">Vijay Bank</option>
                <option value="YB">Yes Bank</option>
              </select>
            </div>
            <div>
              <p>Enter Your AccountNumber</p>
              <input
                type="text"
                name="accountNumber"
                placeholder="Account Number"
                value={bankAccount.accountNumber}
                onChange={handleBankAccountChange}
              />
            </div>
            <div>
              <p>Enter Your AccountHolder Name</p>
              <input
                type="text"
                name="accountHolderName"
                placeholder="Account Holder Name"
                value={bankAccount.accountHolderName}
                onChange={handleBankAccountChange}
              />
            </div>
            <div>
              <p>Enter Your IFSC CODE</p>
              <input
                type="text"
                name="ifscCode"
                placeholder="IFSC Code"
                value={bankAccount.ifscCode}
                onChange={handleBankAccountChange}
              />
            </div>
          </div>
        )}

        {selectedPaymentMethod === "upi" && (
          <div
            className={`field-group upi-fields ${
              selectedPaymentMethod === "upi" ? "show" : "hide"
            }`}
          >
            <div>
              {" "}
              <p>Enter Your UPI ID</p>
            </div>
            <input
              type="text"
              placeholder="UPI ID"
              value={upi}
              onChange={handleUpiChange}
            />
          </div>
        )}

        {selectedPaymentMethod === "creditCard" && (
          <div
            className={`field-group credit-card-fields ${
              selectedPaymentMethod === "creditCard" ? "show" : "hide"
            }`}
          >
            <div>
              <p>Enter Your Card Number</p>
            </div>
            <img src={Creditcard} height="25" alt="Preview" />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={creditCard.cardNumber}
              onChange={handleCreditCardChange}
            />
            <div>
              <p>Enter Your Card Expiry Date</p>
            </div>
            <div>
 
            <img src={expiredDate} alt="Preview" />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={creditCard.expiryDate}
              onChange={handleCreditCardChange}
            />
            </div>
            <div>
              <p>Enter Your Card CVV</p>
            </div>
            <img src={Cvv} height="25" alt="Preview" />

            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={creditCard.cvv}
              onChange={handleCreditCardChange}
            />
          </div>
        )}

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
