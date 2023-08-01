import React, { useState } from "react";
import "./Payment.css";

const PaymentPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("bankAccount");
  const [bankAccount, setBankAccount] = useState({
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
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

  return (
    <div className="container">
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              value={bankAccount.ifscCode}
              onChange={handleBankAccountChange}
            />
            <input
              type="text"
              name="accountHolderName"
              placeholder="Account Holder Name"
              value={bankAccount.accountHolderName}
              onChange={handleBankAccountChange}
            />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              value={bankAccount.accountNumber}
              onChange={handleBankAccountChange}
            />
          </div>
        )}

        {selectedPaymentMethod === "upi" && (
          <div
            className={`field-group upi-fields ${
              selectedPaymentMethod === "upi" ? "show" : "hide"
            }`}
          >
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
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={creditCard.cardNumber}
              onChange={handleCreditCardChange}
            />
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={creditCard.expiryDate}
              onChange={handleCreditCardChange}
            />
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
