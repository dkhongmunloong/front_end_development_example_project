import { useSelector, useDispatch  } from 'react-redux';
import { userPaymentConfirmed } from './orderSlice.js';
import { clearCart } from './cartSlice.js';

import { Link } from 'react-router-dom';

function CalculateTotalCostStr(cartList)
{
    let totalCost = 0;
    for (let i = 0; i < cartList.length; i++) 
    {
        const subtotal = parseInt(cartList[i].price) * parseInt(cartList[i].quantity);
        totalCost += subtotal;
    }
    return totalCost.toString();
}

// this component handles the payment page payment summary section
export default function PaymentSummary() {

    const dispatch = useDispatch();
    const storeOrderList = useSelector(function (store) {
        return store.orderProcess.orderList;
    });

    console.log('PaymentSummary', storeOrderList);

    return (
        <div className="col-lg-7 my-2">
            <div className="h-100 p-3 bg-body-tertiary border border-2 rounded-4 shadow-lg">
                <h3 className="text-center">Order Summary</h3>
                <table className="table table-striped-columns paymentSummaryTable mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Size</th>
                            <th scope="col">Color</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeOrderList.map(function (cartProduct, index) { 
                            const subtotal = parseInt(cartProduct.price) * parseInt(cartProduct.quantity);
                            return (
                                <tr key={index}>
                                    <td id={cartProduct.itemId + "_itemName_o"}>{cartProduct.itemName}</td>
                                    <td id={cartProduct.itemId + "_brand_o"}>{cartProduct.brand}</td>
                                    <td id={cartProduct.itemId + "_size_o"}>{cartProduct.size}</td>
                                    <td id={cartProduct.itemId + "_color_o"}>{cartProduct.color}</td>
                                    <td id={cartProduct.itemId + "_price_o"}>${cartProduct.price}</td>
                                    <td id={cartProduct.itemId + "_quantity_o"}>{cartProduct.quantity}</td>
                                    <td id={cartProduct.itemId + "_subtotal_o"}>{subtotal.toString()}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="row" colSpan="6">Grand Total</th>
                            <td>${CalculateTotalCostStr(storeOrderList)}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="d-flex justify-content-center">
                    <button 
                        className="btn btn-success my-2" 
                        onClick={() => {
                            // clear cart and dispatch signal to save order details to order book
                            console.log("PaymentSummary: User completes payment");
                            dispatch( userPaymentConfirmed() );
                            dispatch( clearCart() );
                        }}
                        >
                        <Link to={'/'} className="plainLink">
                            Submit Payment
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}