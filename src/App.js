const PaymentPage = () => {
  // ... (rest of the component code remains the same)

  return (
    <div className="container">
      <h1>Payment Page</h1>
      <form onSubmit={handleSubmit}>
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

        {/* ... (Other payment options similarly with respective field-groups) */}

        <div className="field-group bank-fields">
          {/* Bank Account fields */}
          {/* ... */}
        </div>

        <div className="field-group upi-fields">
          {/* UPI fields */}
          {/* ... */}
        </div>

        <div className="field-group credit-card-fields">
          {/* Credit Card fields */}
          {/* ... */}
        </div>

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default PaymentPage;
