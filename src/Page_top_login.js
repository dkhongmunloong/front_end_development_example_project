import { useState } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import { generateCart, clearCart, modifyCartQty } from './cartSlice.js';
import { updateOrderList } from './orderSlice.js';

import { Link } from 'react-router-dom';

import Login_email from './Login_email.js';
import Login_pw from './Login_pw.js';
import Login_btn from './Login_btn.js';
// this component handles the login section for the site
// it contains various sub components such as login button and cart modal
export default function Page_top_login(props) {
    const [loginStatus, setLoginStatus] = useState({mode: "admin login"});

    const clsIconDefault = 'bi bi-person-exclamation navbarLoginIcon';
    const clsIconAdmin = 'bi bi-person-gear navbarLoginIcon';
    const clsIcon = props.mainParams.userMode === 'administrator' ? clsIconAdmin : clsIconDefault;

    //console.log(`Page_top_login: MainParams:`, props.mainParams.userMode);
    console.log('Page_top_login: loginStatus:', loginStatus);

    const dispatch = useDispatch();
    const storeCartList = useSelector(function (store) {
        return store.cart.cartList;
    });
    const storeItemIdList = useSelector(function (store) {
        return store.cart.itemIdList;
    });

    return (
        <div className="row py-2 justify-content-center ">
            <div className="col-sm-12 col-lg-1 my-1 d-grid">
                <button type="button" className="btn btn-light btn-sm navbarLoginIconBtn">
                    <i className={clsIcon}></i>
                </button>
            </div>
            <div className="col-sm-12 col-lg-1 text-center my-1">
                <h6 className="mt-2">Email</h6>
            </div>
            <div className="col-sm-12 col-lg-3 my-1">
                <Login_email
                    userMode={props.mainParams.userMode}
                    onEmailUpdate={props.onEmailUpdate}
                    loginEntry={props.loginEntry}
                    loginStatus={loginStatus}
                ></Login_email>
            </div>
            <div className="col-sm-12 col-lg-1 text-center my-1">
                <h6 className="mt-2">Password</h6>
            </div>
            <div className="col-sm-12 col-lg-3 my-1">
                <Login_pw
                    userMode={props.mainParams.userMode}
                    onPwUpdate={props.onPwUpdate}
                    loginEntry={props.loginEntry}
                    loginStatus={loginStatus}
                ></Login_pw>
            </div>
            <div className="col-sm-12 col-lg-1 d-grid my-1">
                <Login_btn
                    loginEntry={props.loginEntry}
                    mainParams={props.mainParams}
                    onEmailUpdate={props.onEmailUpdate}
                    onPwUpdate={props.onPwUpdate}
                    onBtnUpdate={props.onBtnUpdate}
                    loginStatus={loginStatus}
                    onLoginStatusUpdate={(newMode) => setLoginStatus((prev) => ({ ...prev, mode: newMode }))}
                ></Login_btn>
            </div>
            <div className="col-sm-12 col-lg-2 my-1 d-grid">
                <button
                    type="button"
                    className="btn btn-light btn-sm position-relative navbarCartBtn"
                    data-bs-toggle="modal"
                    data-bs-target="#cartModal"
                    onClick={(e) => {
                        dispatch( generateCart() );
                    }}
                >
                    <i className="bi bi-cart3 px-3 navbarCartIcon"> </i>
                    <span className="position-absolute top-50 start-150 translate-middle badge navbarCartNum">
                        {storeItemIdList.length}
                    </span>
                </button>

                <div className="modal fade" id="cartModal" tabIndex="-1" aria-labelledby="cartModalLabel">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="cartModalLabel">
                                    Shopping Cart
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <h6>Summary</h6>
                                <table className="table table-striped-columns modalTable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item #</th>
                                            <th scope="col">Item Name</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Color</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Adjust</th>
                                            <th scope="col">Adjust</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {storeCartList.map(function (cartProduct, index) {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td id={cartProduct.itemId + "_itemName"}>{cartProduct.itemName}</td>
                                                    <td id={cartProduct.itemId + "_brand"}>{cartProduct.brand}</td>
                                                    <td id={cartProduct.itemId + "_price"}>${cartProduct.price}</td>
                                                    <td id={cartProduct.itemId + "_size"}>{cartProduct.size}</td>
                                                    <td id={cartProduct.itemId + "_color"}>{cartProduct.color}</td>
                                                    <td id={cartProduct.itemId + "_quantity"}>{cartProduct.quantity}</td>
                                                    <td> 
                                                        <button 
                                                            id={cartProduct.itemId.toString()+"_plus"} 
                                                            className="btn btn-info btn-sm" 
                                                            onClick={(e) => {
                                                                console.log("plus btn pressed:", e.target.id);
                                                                const suffixToRemove = "_plus";
                                                                const itemIdStr = e.target.id.replace(suffixToRemove, "");
                                                                const displatchItem = {type: "increase", id: itemIdStr};
                                                                dispatch(modifyCartQty(displatchItem));
                                                            }}
                                                        > + </button>
                                                    </td>
                                                    <td> 
                                                        <button
                                                            id={cartProduct.itemId.toString()+"_minus"}  
                                                            className="btn btn-secondary btn-sm"
                                                            onClick={(e) => {
                                                                console.log("minus btn pressed:", e.target.id);
                                                                const suffixToRemove = "_minus";
                                                                const itemIdStr = e.target.id.replace(suffixToRemove, "");
                                                                const displatchItem = {type: "decrease", id: itemIdStr};
                                                                dispatch(modifyCartQty(displatchItem));
                                                            }}                                                           
                                                        > - </button>
                                                    </td>                                                    
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => {
                                        console.log('Page_top_login: Modal: Clear cart');
                                        dispatch( clearCart() );
                                    }}
                                >
                                    Delete all items in cart
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-success" 
                                    data-bs-dismiss="modal" 
                                    onClick={(e) => {
                                        // dispatch signal to order slice reducer and go to payment page if cart is not empty
                                        let userEmailStore = props.loginEntry.email;
                                        if (userEmailStore.length === 0)
                                        {
                                            userEmailStore = "";
                                        }
                                        console.log("Make payment button: user email:", props.loginEntry.email)
                                        const dispatchItem = {cartList: storeCartList, userEmail: userEmailStore};
                                        dispatch( updateOrderList(dispatchItem) );
                                    }}>
                                    {storeCartList.length === 0 ? "Cart is Empty" : <Link to={'/pay'} className="plainLink"> Make payment </Link>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
