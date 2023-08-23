import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Payment.css";

Modal.setAppElement("#root");

function Payment() {
  ////Modal open///////////////
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  const openModal = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Bank Details Adding//
  // const [bankPayment, setBankPayment] = useState("bankDetails")
  const [bankDetails, setBankDetails] = useState({
    ifscCode: "",
    accountHolderName: "",
    accountNumber: "",
    banks: "",
  });

  const handleBankAccountChange = (event) => {
    const { name, value } = event.target;
    setBankDetails({ ...bankDetails, [name]: value });
  };

  // Validation this fields in bank//
  const [currentStep, setCurrentStep] = useState(1);
  const validateFields = () => {
    if (currentStep === 1) {
      if (
        !bankDetails.ifscCode ||
        !bankDetails.accountHolderName ||
        !bankDetails.accountNumber ||
        !bankDetails.banks
      ) {
        alert("Please fill out all the required fields.");
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.message) {
        alert("Please fill out the required field.");
        return false;
      }
    }
    return true;
  };

  //main Funstion for send to bank data in backend///
  const handleAddBankChange = (event) => {
    event.preventDefault();
    console.log(bankDetails, "manoj good knowledger");
    if (validateFields()) {
      fetch("http://localhost:8000/paymentMethods", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(bankDetails),
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          location.reload();
          console.log("Add to card succesfully:", data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  ///get data in database//
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8000/paymentMethods")
      .then((response) => response.json())
      .then((data) => setPaymentMethods(data))
      .catch((error) => setError(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Payment Page</h1>
        <button onClick={() => openModal("creditCard")}>
          Pay with Credit Card
        </button>
        <button onClick={() => openModal("upi")}>Pay with UPI</button>
        <button onClick={() => openModal("bank")}>
          Pay with Bank Transfer
        </button>
      </header>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Method"
      >
        {selectedMethod === "creditCard" && (
          <div className="payment-form">
            <h2>Credit Card Payment</h2>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                onChange={handleChangeBank}
                value={bankDetails}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiry">Expiry Date</label>
              <input type="text" id="expiry" placeholder="MM/YY" />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input type="text" id="cvv" />
            </div>
          </div>
        )}
        {selectedMethod === "upi" && (
          <div className="payment-form">
            <h2>UPI Payment</h2>
            <div className="form-group">
              <label htmlFor="upiId">UPI ID</label>
              <input type="text" id="upiId" placeholder="yourname@bank" />
            </div>
          </div>
        )}
        {selectedMethod === "bank" && (
          <div className="payment-form">
            <h2>Bank Transfer Details</h2>
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleBankAccountChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="ifsc">IFSC Code</label>
              <input
                type="text"
                id="ifsc"
                name="ifscCode"
                value={bankDetails.ifscCode}
                onChange={handleBankAccountChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountHolder">Account Holder Name</label>
              <input
                type="text"
                id="accountHolder"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleBankAccountChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bankName">Bank Name</label>
              <input
                type="text"
                id="bankName"
                name="banks"
                value={bankDetails.banks}
                onChange={handleBankAccountChange}
              />
            </div>
          </div>
        )}
        <button onClick={handleAddBankChange}>Add Details</button>

        <button onClick={closeModal}>Cancel</button>

        <ul>
        {paymentMethods.map(payment => (
          <li key={payment._id}>Account Number: {payment.accountNumber}</li>
        ))}
        {error && <li>Error fetching data</li>}
      </ul>
{/* 
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" class="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div> */}
      </Modal>
    </div>
  );
}

export default Payment;
