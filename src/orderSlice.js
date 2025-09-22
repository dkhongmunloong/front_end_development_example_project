import { createSlice } from '@reduxjs/toolkit';

const customerFiles = [ 
    {email: 'customer1@leeps.com', fileName: 'c001.json'},
    {email: 'customer2@leeps.com', fileName: 'c002.json'}
];

// this slice component handles the business logic and order processing for payment page
const orderSlice = createSlice({
    name: 'Order Slice',
    initialState: {
        orderList: [],
        userDetails: {
            datafile: "",
            name: "",
            email: "",
            phone: "",
            address1: "",
            address2: "",
            postal: "",
            creditcard: ""
        },
        custOrderData:{
            orderList: [],
            userDetails: {},
            completedTime: "",
            paymentInProgress: false,
            detailsCompleted: false,
            paymentCompleted: false
        },
        custOrderBook: []
    },
    reducers: {
        updateOrderList: function (state, action) 
        {
            const customerEmail = action.payload.userEmail;
            let customerFileName = "";

            for (let i = 0; i < customerFiles.length; i++) 
            {
                if(customerEmail === customerFiles[i].email)
                {
                    customerFileName = customerFiles[i].fileName;
                }
            } 

            state.userDetails = { ...state.userDetails, email: customerEmail, datafile: customerFileName };
            state.orderList = [...action.payload.cartList];

            // initialize customer order data
            state.custOrderData.orderList = [];
            state.custOrderData.userDetails = {};
            state.custOrderData.completedTime = "";
            state.custOrderData.paymentInProgress = true;
            state.custOrderData.detailsCompleted = false;
            state.custOrderData.paymentCompleted = false;

            console.log("orderSlice: updateOrderList: orderList", JSON.parse(JSON.stringify(state.orderList)));
            console.log("orderSlice: updateOrderList: userDetails:", JSON.parse(JSON.stringify( state.userDetails)));
            console.log("orderSlice: updateOrderList: custOrderData:", JSON.parse(JSON.stringify( state.custOrderData)));
        },
        userPaymentQuit: function (state, action) 
        {
            // reset all customer order data
            state.orderList = [];
            state.userDetails = {
                datafile: "",
                name: "",
                email: "",
                phone: "",
                address1: "",
                address2: "",
                postal: "",
                creditcard: ""
            }
            state.custOrderData.orderList = [];
            state.custOrderData.userDetails = {};
            state.custOrderData.completedTime = "";
            state.custOrderData.paymentInProgress = false;
            state.custOrderData.detailsCompleted = false;
            state.custOrderData.paymentCompleted = false;
        },
        userDetailsConfirmed: function (state, action) 
        {
            state.custOrderData.orderList = state.orderList;
            state.custOrderData.userDetails = action.payload.userDetails;
            state.custOrderData.paymentInProgress = true;
            state.custOrderData.detailsCompleted = true;
            state.custOrderData.paymentCompleted = false;

            console.log("userDetailsConfirmed: orderList:", JSON.parse(JSON.stringify(state.orderList)));
            console.log("userDetailsConfirmed: custOrderData:", JSON.parse(JSON.stringify(state.custOrderData)));
            console.log("userDetailsConfirmed: payload userDetails:", action.payload.userDetails);
        },
        userPaymentConfirmed: function (state, action) 
        {
            // state.custOrderData.orderList was updated in userDetailsConfirmed
            // state.custOrderData.userDetails was updated in userDetailsConfirmed
            const dateNow = new Date();
            const dateNow_trim = dateNow.toISOString().slice(0, 19);

            state.custOrderData.completedTime = dateNow_trim;
            state.custOrderData.paymentInProgress = false;
            state.custOrderData.detailsCompleted = true;
            state.custOrderData.paymentCompleted = true;

            // add custOrderData to order book
            state.custOrderBook.push(state.custOrderData);

            // reset all customer order data
            state.orderList = [];
            state.userDetails = {
                datafile: "",
                name: "",
                email: "",
                phone: "",
                address1: "",
                address2: "",
                postal: "",
                creditcard: ""
            }

            console.log("userPaymentConfirmed: custOrderBook:", JSON.parse(JSON.stringify(state.custOrderBook)));
        }        
    },
});

// Dispatch these to update the state in your component
export const { updateOrderList, userPaymentQuit, userDetailsConfirmed, userPaymentConfirmed } = orderSlice.actions;

// This part gets registered into the store.
export default orderSlice.reducer;