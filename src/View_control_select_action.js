import { useContext } from 'react';
import { contextMainParams } from './contextMainParams.js';

import { useDispatch } from 'react-redux';
import { addMultiple } from './cartSlice.js';
// this component handles the selection action logic for
// admin and default user. To delete from listing or add to cart depending on mode
export default function View_control_select_action(props) {
    const mainParamsLocal = useContext(contextMainParams);
    const isAdminMode = mainParamsLocal.userMode === 'administrator';

    const dispatch = useDispatch();

    return (
        <>
            <div className="container mt-2 px-3 py-2 bg-body-tertiary border border-2 rounded-4">
                <h6 className="text-center text-secondary-emphasis">Selection action</h6>
                <div className="row my-3 d-grid px-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            if (isAdminMode) {
                                let itemIdDeleteList = [];

                                for (let i = 0; i < props.filterList.length; i++) {
                                    const idVal = `itemCheckbox_${i}`;
                                    const element = document.getElementById(idVal);
                                    if (element.checked) {
                                        const itemId = props.filterList[i].itemId;
                                        itemIdDeleteList.push(itemId);
                                    }
                                }

                                //console.log('View_control_select_action: itemIdDeleteList:', itemIdDeleteList);
                                if (itemIdDeleteList.length !== 0) {
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
                                    props.onFilterProduct(newProductList);
                                    props.onUpdateProduct(newProductList);
                                    props.setSelectInput({
                                        priceRange: 'No Selection',
                                        size: 'No Selection',
                                        brand: 'No Selection',
                                        color: 'No Selection',
                                    });
                                    console.log(
                                        'View_control_select_action: admin mode: newProductList generated:',
                                        newProductList
                                    );
                                } else {
                                    console.log('View_control_select_action: admin mode: Nothing to delete');
                                }
                            } else {
                                let itemIdAddList = [];

                                for (let i = 0; i < props.filterList.length; i++) {
                                    const idVal = `itemCheckbox_${i}`;
                                    const element = document.getElementById(idVal);
                                    if (element.checked) {
                                        const itemId = props.filterList[i].itemId;
                                        itemIdAddList.push(itemId);
                                    }
                                    element.checked = false;
                                }
                                // dispatch items to cart slice reducer for storage                                 
                                const dispatchItem = {appendList: itemIdAddList, productList: props.productList};
                                dispatch( addMultiple(dispatchItem) );

                                console.log(
                                    'View_control_select_action: default mode: itemIdAddList generated:',
                                    itemIdAddList
                                );
                            }
                        }}
                    >
                        {isAdminMode ? 'Delete all selected' : 'Add all selected'}
                    </button>
                </div>
            </div>
        </>
    );
}
