import { useState } from 'react';

function searchBtnTrigger(productListCurr, subString, updateFilterList) {
    const filterBySubstr = (item) => {
        const itemNameLower = item.itemName.toLowerCase();
        const subStringLower = subString.toLowerCase();
        return itemNameLower.includes(subStringLower);
    };

    let filterArr = productListCurr.filter(filterBySubstr);
    console.log('View_search: filterArr:', filterArr);
    updateFilterList(filterArr);
}

// this component handles the logic for the product search bar
export default function View_search(props) {
    const [searchInput, setSearchInput] = useState('');

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <form className="container-fluid" onSubmit={(e) => e.preventDefault()}>
                    <div className="input-group">
                        <span className="input-group-text text-primary-emphasis fw-semibold" id="basic-addon1">
                            Product Name
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Jordan"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        ></input>
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                if (searchInput.length === 0) {
                                    alert('Search text field is empty');
                                } else {
                                    console.log('View_search: search button clicked');
                                    searchBtnTrigger(props.productList, searchInput, props.onFilterProduct);
                                }
                            }}
                        >
                            Search
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={(e) => {
                                setSearchInput('');
                                props.onFilterProduct(props.productList);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </nav>
        </>
    );
}
