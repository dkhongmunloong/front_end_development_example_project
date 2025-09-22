import { useContext } from 'react';
import { contextMainParams } from './contextMainParams.js';

import { useDispatch } from 'react-redux';
import { addSingle } from './cartSlice.js';
// this component handles the single product item information card
// in the view_display component
export default function Product_single_display(props) {
    const mainParamsLocal = useContext(contextMainParams);
    const isAdminMode = mainParamsLocal.userMode === 'administrator';

    const dispatch = useDispatch();

    return (
        <>
            <div className="col-sm-6 col-lg-4 my-2 d-flex justify-content-center">
                <div className="card">
                    <img src={props.item.imgUrl} className="card-img-top" alt="Picture of item"></img>
                    <div className="card-body">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id={'itemCheckbox_' + props.listIndex}
                            ></input>
                            <label className="form-check-label">
                                <h6>{props.item.itemName}</h6>
                            </label>
                        </div>
                        <p className="card-text">{props.item.itemDetails}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <b>Price: </b> ${props.item.price}
                        </li>
                        <li className="list-group-item">
                            <b>Size:</b> {props.item.size.toUpperCase()}
                        </li>
                        <li className="list-group-item">
                            <b>Brand:</b> {props.item.brand}
                        </li>
                        <li className="list-group-item">
                            <b>Color:</b> {props.item.color}
                        </li>
                        <li className="list-group-item">
                            <b>Item ID:</b> {props.item.itemId}
                        </li>
                    </ul>
                    <div className="card-body d-flex justify-content-center">
                        <button
                            className="btn btn-outline-primary addCart"
                            onClick={(e) => {
                                if (isAdminMode) {
                                    const itemIdSelect = props.item.itemId;
                                    const itemIdDeleteList = [itemIdSelect];
                                    const itemIdDeleteTest = (item) => {
                                        for (let i = 0; i < itemIdDeleteList.length; i++) {
                                            if (itemIdDeleteList[i] === item.itemId) {
                                                // reject this item in final array if this item's id is in delete list
                                                return false;
                                            }
                                        }
                                        // accept this item in final array if this item's id is not in delete list
                                        return true;
                                    };
                                    const newProductList = props.productList.filter(itemIdDeleteTest);
                                    console.log(
                                        'Product_single_display: admin mode: delete pressed, newProductList:',
                                        newProductList
                                    );
                                    props.onUpdateFilterList(newProductList);
                                    props.onUpdateProductList(newProductList);

                                    props.setSelectInput({
                                        priceRange: 'No Selection',
                                        size: 'No Selection',
                                        brand: 'No Selection',
                                        color: 'No Selection',
                                    });
                                } else {
                                    // dispatch item to cart slice reducer for storage
                                    console.log('Product_single_display: default mode: add button clicked');
                                    const itemIdSelect = props.item.itemId;                                                                       
                                    const dispatchItem = {itemId: itemIdSelect, productList: props.productList};
                                    dispatch( addSingle(dispatchItem) );
                                }
                            }}
                        >
                            {isAdminMode ? 'Delete' : 'Add to cart'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
