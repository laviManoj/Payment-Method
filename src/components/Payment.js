import React, { useState, useEffect } from "react";
import { PiBank } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import "./Payment.css";
import axios from "axios";
;
import "bootstrap/dist/css/bootstrap.css";
import { event } from "jquery";

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
    cardHolderName: "",
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

    if (selectedPaymentMethod === "bankAccount") {
      // Add bankAccount details to frontend state
      setBanking((prevBanking) => [...prevBanking, bankAccount]);
    }

    // Handle payment submission based on selected paymentMethod and the provided data
    // For demonstration purposes, you can log the data or send it to a backend server.
  };

  const handleChangeBankAdding = (event) => {
    event.preventDefault();

    console.log(bankAccount, "good coder");

    fetch("http://localhost:5002/addbank", {
      method: "POST",
       headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({
         bankAccount
        }),
  
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log("Add to card succesfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="container">
      <form className="mainform" onSubmit={handleSubmit}>
        <h1>Payment Page</h1>
        <div>
          <div>
            <input
              type="radio"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal1"
              data-whatever="@mdo"
              value="bankAccount"
              checked={selectedPaymentMethod === "bankAccount"}
              onChange={handlePaymentMethodChange}
            />
            Bank Account
            <div
              class="modal fade"
              id="exampleModal1"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              {selectedPaymentMethod === "bankAccount" && (
                <div
                  className={`field-group bank-fields ${
                    selectedPaymentMethod === "bankAccount" ? "show" : "hide"
                  }`}
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                          Account Details
                        </h5>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              Select Bank
                            </label>
                            <div>
                              <select
                                name="banks"
                                class="form-control"
                                id="doctype"
                                value={bankAccount.banks}
                                onChange={handleBankAccountChange}
                              >
                                <option value="">Select your Bank</option>
                                <option value="AIRP">
                                  Airtel Payments Bank
                                </option>
                                <option value="BARB_R">Bank of Baroda</option>
                                <option value="MAHB">
                                  Bank of Maharashtra
                                </option>
                                <option value="CNRB">Canara Bank</option>
                                <option value="CSBK">
                                  Catholic Syrian Bank
                                </option>
                                <option value="CBIN">
                                  Central Bank of India
                                </option>
                                <option value="DCBL">DCB Bank</option>
                                <option value="DCC">DCC Bank</option>
                                <option value="DEUT">Deutsche Bank</option>
                                <option value="DLXB">Dhanlaxmi Bank</option>
                                <option value="ESFB">
                                  Equitas Small Finance Bank
                                </option>
                                <option value="FSFB">
                                  Fincare Small Finance Bank
                                </option>
                                <option value="IBKL">IDBI</option>
                                <option value="IDFB">IDFC FIRST Bank</option>
                                <option value="IDIB">Indian Bank</option>
                                <option value="IOBA">
                                  Indian Overseas Bank
                                </option>
                                <option value="INDB">Indusind Bank</option>
                                <option value="JAKA">
                                  Jammu and Kashmir Bank
                                </option>
                                <option value="JSFB">
                                  Jana Small Finance Bank
                                </option>
                                <option value="KARB">Karnataka Bank</option>
                                <option value="KVBL">Karur Vysya Bank</option>
                                <option value="KKBK">
                                  Kotak Mahindra Bank
                                </option>
                                <option value="LVB">Lakshmi Vilas Bank</option>
                                <option value="NSPB">NSDL Payments Bank</option>
                                <option value="PSIB">Punjab & Sind Bank</option>
                                <option value="PKGB">
                                  Pragathi Gramina Bank
                                </option>
                                <option value="PUNB_R">
                                  Punjab National Bank
                                </option>
                                <option value="RATN">RBL Bank</option>
                                <option value="SVCB">
                                  SVC Co-Operative Bank Ltd
                                </option>
                                <option value="SRCB">
                                  Saraswat Co-operative Bank
                                </option>
                                <option value="SIBL">South Indian Bank</option>
                                <option value="SBI">State Bank of India</option>
                                <option value="TMBL">
                                  Tamilnad Mercantile Bank
                                </option>
                                <option value="UCBA">UCO Bank</option>
                                <option value="UJVN">
                                  Ujjivan Small Finance Bank
                                </option>
                                <option value="UBI">Union Bank of India</option>
                                <option value="VJB">Vijay Bank</option>
                                <option value="YB">Yes Bank</option>
                              </select>
                            </div>
                          </div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              Account Number
                            </label>
                            <input
                              type="text"
                              name="accountNumber"
                              placeholder="Account Number"
                              class="form-control"
                              id="recipient-name"
                              value={bankAccount.accountNumber}
                              onChange={handleBankAccountChange}
                            />
                          </div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              Account Holder Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="recipient-name"
                              name="accountHolderName"
                              placeholder="Account Holder Name"
                              value={bankAccount.accountHolderName}
                              onChange={handleBankAccountChange}
                            />
                          </div>
                          <div class="form-group">
                            <label for="recipient-name" class="col-form-label">
                              IFSC Code
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="recipient-name"
                              name="ifscCode"
                              placeholder="IFSC Code"
                              value={bankAccount.ifscCode}
                              onChange={handleBankAccountChange}
                            />
                          </div>
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={handleChangeBankAdding}
                        >
                          Add Bank Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <input
              type="radio"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal2"
              data-whatever="@mdo"
            />{" "}
            UPI ID
            <div
              class="modal fade"
              id="exampleModal2"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      UPI Details
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          UPI ID
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Add UPI ID
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input
              type="radio"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal3"
              data-whatever="@mdo"
            />{" "}
            Credit Card
            <div
              class="modal fade"
              id="exampleModal3"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Card Details
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">
                          Creditcard Number
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="message-text" class="col-form-label">
                          Creditcard Holder Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="message-text" class="col-form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                      <div class="form-group">
                        <label for="message-text" class="col-form-label">
                          Expired Date
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="recipient-name"
                        />
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary">
                      Add Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      {/* {selectedPaymentMethod === "bankAccount" && (
        <div>
          <h3>Selected Bank Account Details:</h3>
          {banking.map((bank, index) => (
            <div key={index}>
              <p>Bank: {bank.banks}</p>
              <p>Account Holder: {bank.accountHolderName}</p>
              <p>Account Number: {bank.accountNumber}</p>
              <p>IFSC Code: {bank.ifscCode}</p>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default PaymentPage;
