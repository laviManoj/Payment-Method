import React, { useState } from "react";
import "./Payment.css";

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("bankAccount");
  const [bankAccount, setBankAccount] = useState({
    ifscCode: "",
    accountHolderName: "",
    accountNumber: ""
  });

  const [upi, setUpi] = useState("");
  const [creditCard, setCreditCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
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
      paymentMethod,
      bankAccount,
      upi,
      creditCard
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
              checked={paymentMethod === "bankAccount"}
              onChange={handlePaymentMethodChange}
            />
            Bank Account
          </label>
        </div>

        {/* Upi mwethods */}
        <div className="field-group bank-fields">
          <label>
            <input
              type="radio"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={handlePaymentMethodChange}
            />
            UPI
          </label>
        </div>
        {/* upi payments */}
        <div className="field-group upi-fields">
          <label>
            <input
              type="radio"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={handlePaymentMethodChange}
            />
            Credit Card
          </label>
        </div>
        {paymentMethod === "bankAccount" && (
          <div className="field-group credit-card-fields">
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

        {paymentMethod === "upi" && (
          <div>
            <input
              type="text"
              placeholder="UPI ID"
              value={upi}
              onChange={handleUpiChange}
            />
          </div>
        )}

        {paymentMethod === "creditCard" && (
          <div>
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
