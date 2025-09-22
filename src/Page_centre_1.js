import { useState } from 'react';
import { useSelector } from 'react-redux';

import View_search from './View_search.js';
import View_control from './View_control.js';
import View_display from './View_display.js';
import Preload_data from './Preload_data.js';

var preloadData = Preload_data();
// this higher level component contains the centre portion of site
// which includes top search bar, left side controls, right side product display
export default function Page_centre_1(props) {
    const [productList, setProductList] = useState(preloadData);
    const [filterList, setFilterList] = useState(preloadData);

    const [selectInput, setSelectInput] = useState({
        priceRange: 'No Selection',
        size: 'No Selection',
        brand: 'No Selection',
        color: 'No Selection',
    });
    const resetAllFilterInput = () => {
        setSelectInput({
            priceRange: 'No Selection',
            size: 'No Selection',
            brand: 'No Selection',
            color: 'No Selection',
        });
        console.log('resetFilterInput invoked');
    };

    console.log('Page_centre_1: productList:', productList);
    console.log('Page_centre_1: filterList:', filterList);
    console.log('Page_centre_1: selectInput:', selectInput);

    const cartItemIdLs = useSelector(function (store) {
        return store.cart.itemIdList;
    });

    const cartProductList = useSelector(function (store) {
        return store.cart.productList;
    });

    const storeCartList = useSelector(function (store) {
        return store.cart.cartList;
    });    

    console.log('Page_centre_1: cartItemIdLs:', cartItemIdLs);
    console.log('Page_centre_1: cartProductList:', cartProductList);
    console.log('Page_centre_1: storeCartList:', storeCartList);

    return (
        <>
            <View_search
                productList={productList}
                filterList={filterList}
                onFilterProduct={(filteredList) => setFilterList([...filteredList])}
            ></View_search>
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12 col-lg-3 mt-3">
                        <View_control
                            productList={productList}
                            filterList={filterList}
                            selectInput={selectInput}
                            onFilterProduct={(filteredList) => setFilterList([...filteredList])}
                            onAppendProduct={(addedProduct) => setProductList([...productList, addedProduct])}
                            onUpdateProduct={(updatedProductList) => setProductList([...updatedProductList])}
                            setSelectInput={setSelectInput}
                            resetAllFilterInput={resetAllFilterInput}
                        ></View_control>
                    </div>
                    <div className="col-sm-12 col-lg-9">
                        <View_display
                            productList={productList}
                            filterList={filterList}
                            onUpdateProductList={(updatedProductList) => setProductList([...updatedProductList])}
                            onUpdateFilterList={(updatedFilterList) => setFilterList([...updatedFilterList])}
                            setSelectInput={setSelectInput}
                            resetAllFilterInput={resetAllFilterInput}
                        ></View_display>
                    </div>
                </div>
            </div>
        </>
    );
}
