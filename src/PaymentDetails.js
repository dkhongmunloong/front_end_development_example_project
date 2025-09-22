import { useEffect, useState } from 'react';
import axios from 'axios';

import { useSelector, useDispatch  } from 'react-redux';
import { userPaymentQuit, userDetailsConfirmed } from './orderSlice.js';

import { Link } from 'react-router-dom';
import PaymentSummary from './PaymentSummary.js';

function disableDetailsForm()
{
    const elemIds = ["custName", "custEmail", "custPhone", "custAddress1", "custAddress2", 
                     "custPostal", "custCard", "custInstruct", "custEmailList", "userDetailsSubmit"];
    elemIds.forEach(function(elemId, index) {
        document.getElementById(elemId).disabled = true;
    });
}

// this component handles the payment page user details section
export default function PaymentDetails() {

    const [pageUserDetails, setPageUserDetails] = useState({
        id: "",
        name: "",
        email: "", 
        phone: "", 
        address1: "", 
        address2: "", 
        postal: "", 
        creditcard: "",
        instructions: ""
    });
    const [paymentFinal, setPaymentFinal] = useState(false);

    const dispatch = useDispatch();
    const storeOrderList = useSelector(function (store) {
        return store.orderProcess.orderList;
    });
    const storeUserDetails = useSelector(function (store) {
        return store.orderProcess.userDetails;
    });

    let fileNameToLoad = 'cDefault.json';
    if(storeUserDetails.datafile.length !== 0)
    {
        fileNameToLoad = storeUserDetails.datafile;
    }
    const custFileName = `./data/${fileNameToLoad}`;

    // simulate HTTP GET request using local json file via useEffect
    useEffect(() => {
        axios.get(custFileName)
            .then((response) => {
                setPageUserDetails(response.data);
                console.log("PaymentDetails: data loaded");
            })
            .catch((error) => {
                console.error('Error loading JSON:', error);
            });
    }, []);

    console.log("PaymentDetails: storeOrderList", storeOrderList);
    console.log("PaymentDetails: storeUserDetails", storeUserDetails);
    console.log("PaymentDetails: fileNameToLoad", fileNameToLoad);

    return (
        <div className="row align-items-md-stretch">
            <div className="col-lg-5 my-2">
                <div className="p-5 bg-body-tertiary rounded-4">
                    <h2>Confirm Payment Details</h2>
                    <p>
                        Please fill in or edit your address and credit card details before actual payment. 
                        <br/> Required values are marked by an asterisk (*).
                    </p>
                    <form 
                        onSubmit={(e) => {
                            console.log("PaymentDetails: form submitted successfully");

                            e.preventDefault();
                            disableDetailsForm();
                            setPaymentFinal(true);

                            const dispatchItem = {userDetails: pageUserDetails};
                            dispatch( userDetailsConfirmed(dispatchItem) );
                        }}
                    >

                        <div className="form-group my-3">
                        <label>Customer Name*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="customerName"
                            id="custName"
                            placeholder="first and last name"
                            required
                            value={pageUserDetails.name}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, name: e.target.value }) )
                            }}
                        />
                        </div>

                        <div className="form-group my-3">    
                        <label>Customer Email*</label>
                        <input
                            type="email"
                            className="form-control"
                            name="customerEmail"
                            id="custEmail"
                            placeholder="account@exampledomain.com"
                            required
                            value={pageUserDetails.email}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, email: e.target.value }) )
                            }}
                        />
                        </div>

                        <div className="form-group my-3">
                        <label>Phone number*</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="customerPhone"
                            id="custPhone"
                            placeholder="+65XXXXXXXX"
                            pattern="^(?:\+65|65)?[689]\d{7}$"
                            required
                            value={pageUserDetails.phone}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, phone: e.target.value }) )
                            }}
                        />
                        </div> 

                        <div className="form-group my-3">
                        <label>Address Line 1*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="addressLine1"
                            id="custAddress1"
                            placeholder="Your shipping address line 1"
                            required
                            value={pageUserDetails.address1}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, address1: e.target.value }) )
                            }}
                        />
                        </div>

                        <div className="form-group my-3">
                        <label>Address Line 2*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="addressLine2"
                            id="custAddress2"
                            placeholder="Your shipping address line 2"
                            required
                            value={pageUserDetails.address2}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, address2: e.target.value }) )
                            }}                            
                        />
                        </div> 

                        <div className="form-group my-3">
                        <label>Postal Code* (6 digit numbers only)</label>
                        <input
                            type="text"
                            className="form-control"
                            name="postalcodeinput"
                            id="custPostal"
                            placeholder="XXXXXX"
                            pattern="\d{6}"
                            required
                            value={pageUserDetails.postal}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, postal: e.target.value }) )
                            }}
                        />
                        </div>  

                        <div className="form-group my-3">
                        <label>Credit card number* (16 digit numbers only, no dash)</label>
                        <input
                            type="text"
                            className="form-control"
                            name="creditcardinput"
                            id="custCard"
                            placeholder="XXXXXXXXXXXXXXXX"
                            pattern="\d{16}"
                            required
                            value={pageUserDetails.creditcard}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, creditcard: e.target.value }) )
                            }}                            
                        />
                        </div> 

                        <div className="form-group my-3">
                        <label>Additional instructions for us</label>
                        <textarea
                            className="form-control"
                            name="instructionBoxText"
                            id="custInstruct"
                            rows="3"
                            placeholder="Enter your instructions if any"
                            value={pageUserDetails.instructions}
                            onChange={(e) => { 
                                setPageUserDetails( (prev) => ({ ...prev, instructions: e.target.value }) )
                            }}                                
                        ></textarea>
                        </div>

                        <div className="form-group mt-4 my-3">
                            <label>Optional</label>
                            <div>
                                <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="target_audience_1"
                                    id="custEmailList"
                                    value="yes"
                                />
                                <label>Add me to your email list for related promotions and fashion magazine</label>
                                </div>
                            </div>
                        </div>
                        <button
                            type="reset" 
                            className="btn btn-danger my-2" 
                            onClick={() => {
                                dispatch( userPaymentQuit() );
                            }}
                            >
                            <Link to={'/'} className="plainLink">
                                Cancel Payment
                            </Link>
                        </button>
                        <button type="submit" id="userDetailsSubmit" className="btn btn-success my-2 mx-4">Submit Details</button>
                    </form>
                </div>
            </div>
            {paymentFinal && (<PaymentSummary></PaymentSummary>)}
        </div>
    );
}