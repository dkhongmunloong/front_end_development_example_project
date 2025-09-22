import Get_category_set from './Get_category_set.js';
import Filter_select from './Filter_select.js';

const selectValues = {
    priceRange: { labelTxt: 'Price Range', idSelect: 'priceSelect', txtCap: false },
    size: { labelTxt: 'Size', idSelect: 'sizeSelect', txtCap: true },
    brand: { labelTxt: 'Brand', idSelect: 'brandSelect', txtCap: false },
    color: { labelTxt: 'Color', idSelect: 'colorSelect', txtCap: false },
};

const initSelectInput = {
    priceRange: 'No Selection',
    size: 'No Selection',
    brand: 'No Selection',
    color: 'No Selection',
};

function filterBtnTrigger(productListCurr, selectCurr, updateFilterList) {
    var prSelect = selectCurr.priceRange,
        sizeSelect = selectCurr.size,
        brandSelect = selectCurr.brand,
        colorSelect = selectCurr.color;

    const filterBySelection = (item) => {
        //console.log('Inside filterBySelect:', prSelect, sizeSelect, brandSelect, colorSelect);

        const prResult = prSelect !== 'No Selection' ? item.priceRange === prSelect : true;
        const sizeResult = sizeSelect !== 'No Selection' ? item.size === sizeSelect : true;
        const brandResult = brandSelect !== 'No Selection' ? item.brand === brandSelect : true;
        const colorResult = colorSelect !== 'No Selection' ? item.color === colorSelect : true;
        const finalResult = prResult && sizeResult && brandResult && colorResult;

        return finalResult;
    };

    let filterArr = productListCurr.filter(filterBySelection);
    console.log('View_control_filter: filterArr:', filterArr);
    updateFilterList(filterArr);
}

// this component handles the product filter menus which processes
// the product listing and generate the unique set for the filter options in select
export default function View_control_filter(props) {
    // do the set calculation here and pass the final array to each select component
    const productUniqueCategory = Get_category_set(props.productList);
    console.log('View_control_filter: productList:', props.productList);
    console.log('View_control_filter: filterList: ', props.filterList);
    console.log('View_control_filter: select input:', props.selectInput);
    console.log('View_control_filter: productUniqueCategory:', productUniqueCategory);

    return (
        <>
            <div className="container px-3 pt-2 bg-body-tertiary border border-2 rounded-4">
                <h6 className="text-center text-secondary-emphasis" id="filterTextHeader">
                    Filter products to display
                </h6>
                <form className="filterForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="my-1">
                        <Filter_select
                            categoryArr={productUniqueCategory.priceRange}
                            categoryInfo={selectValues.priceRange}
                            onSelectUpdate={(prInput) =>
                                props.setSelectInput((prev) => ({ ...prev, priceRange: prInput }))
                            }
                            selectValue={props.selectInput.priceRange}
                        ></Filter_select>
                    </div>
                    <div className="my-1">
                        <Filter_select
                            categoryArr={productUniqueCategory.size}
                            categoryInfo={selectValues.size}
                            onSelectUpdate={(sizeInput) =>
                                props.setSelectInput((prev) => ({ ...prev, size: sizeInput }))
                            }
                            selectValue={props.selectInput.size}
                        ></Filter_select>
                    </div>
                    <div className="my-1">
                        <Filter_select
                            categoryArr={productUniqueCategory.brand}
                            categoryInfo={selectValues.brand}
                            onSelectUpdate={(brandInput) =>
                                props.setSelectInput((prev) => ({ ...prev, brand: brandInput }))
                            }
                            selectValue={props.selectInput.brand}
                        ></Filter_select>
                    </div>
                    <div className="my-1">
                        <Filter_select
                            categoryArr={productUniqueCategory.color}
                            categoryInfo={selectValues.color}
                            onSelectUpdate={(colorInput) =>
                                props.setSelectInput((prev) => ({ ...prev, color: colorInput }))
                            }
                            selectValue={props.selectInput.color}
                        ></Filter_select>
                    </div>
                    <div className="row my-4 d-grid px-2 gap-2">
                        <button
                            className="btn btn-primary"
                            onClick={(e) =>
                                filterBtnTrigger(props.productList, props.selectInput, props.onFilterProduct)
                            }
                        >
                            Filter
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={(e) => {
                                console.log('Reset filter clicked');
                                filterBtnTrigger(props.productList, initSelectInput, props.onFilterProduct);
                                props.setSelectInput({
                                    priceRange: 'No Selection',
                                    size: 'No Selection',
                                    brand: 'No Selection',
                                    color: 'No Selection',
                                });
                            }}
                        >
                            Reset Filter
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
