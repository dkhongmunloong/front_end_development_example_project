import Product_single_display from './Product_single_display.js';

// this component handles the product display of product listing
// each product entry is a standalone card panel
export default function View_display(props) {
    console.log('View_display: productList:', props.productList);
    console.log('View_display: filterList:', props.filterList);

    return (
        <>
            <div className="container">
                <div className="row mt-2 mb-4">
                    {props.filterList.map(function (listItem, index) {
                        return (
                            <Product_single_display
                                key={listItem.itemId}
                                item={listItem}
                                listIndex={index}
                                productList={props.productList}
                                filterList={props.filterList}
                                onUpdateProductList={props.onUpdateProductList}
                                onUpdateFilterList={props.onUpdateFilterList}
                                resetAllFilterInput={props.resetAllFilterInput}
                                setSelectInput={props.setSelectInput}
                            ></Product_single_display>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
