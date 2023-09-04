import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./Payment.css";
import "bootstrap/dist/css/bootstrap.css";

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
    setBankDetails((prevDetails) =>({
      ...prevDetails,
      [name]: value,
    }));
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

  const cardStyle = {
    width: '18rem',
    /* other CSS properties here */
  };

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
<>
{console.log(paymentMethods)}
       <div className="bttns">
        {/* <button onClick={handleAddBankChange}>Add Details</button> */}
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New message</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>

        <button   onClick={closeModal}>Cancel</button>
        </div>
        </>
        {paymentMethods.length > 0 ? (
        paymentMethods.map((payment, index) => (
          <div className="card" key={index} style={cardStyle}>
            <div className="card-header">
              <b>BANK Details:</b> {payment.banks}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">AccountHolderName: {payment.accountHolderName}</li>
              <li className="list-group-item">AccountNumber: {payment.accountNumber}</li>
              <li className="list-group-item">IFSC Code: {payment.ifscCode}</li>
            </ul>
          </div>
        ))
      ) : (
        <div className="card" >
        <p className="paragraph">No payment methods available.</p>
        </div>
      )}
      {error && <p>Error loading payment methods: {error.message}</p>}
      

{/* <div class="container mt-4">
    <div class="row">
        <div class="col-auto mb-3">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
        <div class="col-auto mb-3">
            <div class="card" >
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </div>
    </div>
</div> */}

      </Modal>
    </div>
  );
}

export default Payment;
