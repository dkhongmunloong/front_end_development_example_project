import { useState } from 'react';
import ProductItemUtils from './ProductItemUtils.js';
// this component handles the add control menus for admin
// it will update the product listing and perform error checking of input
export default function View_control_add(props) {
    const [addFocus, setFocus] = useState({
        name: '',
        details: '',
        price: '',
        size: '',
        brand: '',
        color: '',
    });
    const [addInput, setAddInput] = useState({
        name: '',
        details: '',
        price: '',
        size: '',
        brand: '',
        color: '',
    });
    const product_item_define = ProductItemUtils();
    const btnEvt = (e) => {
        const emptyNameInput = addInput.name.length === 0;
        const emptyDetailsInput = addInput.details.length === 0;
        const emptyPriceInput = addInput.price.length === 0;
        const emptySizeInput = addInput.size.length === 0;
        const emptyBrandInput = addInput.brand.length === 0;
        const emptyColorInput = addInput.color.length === 0;
        const anyEmptyInput =
            emptyNameInput ||
            emptyDetailsInput ||
            emptyPriceInput ||
            emptySizeInput ||
            emptyBrandInput ||
            emptyColorInput;
        if (anyEmptyInput) {
            alert('Please fill in all the fields before submission');

            if (emptyNameInput) setFocus((prev) => ({ ...prev, name: ' ' + 'formFocus' }));
            if (emptyDetailsInput) setFocus((prev) => ({ ...prev, details: ' ' + 'formFocus' }));
            if (emptyPriceInput) setFocus((prev) => ({ ...prev, price: ' ' + 'formFocus' }));
            if (emptySizeInput) setFocus((prev) => ({ ...prev, size: ' ' + 'formFocus' }));
            if (emptyBrandInput) setFocus((prev) => ({ ...prev, brand: ' ' + 'formFocus' }));
            if (emptyColorInput) setFocus((prev) => ({ ...prev, color: ' ' + 'formFocus' }));
        } else {
            console.log('View_control_add: All fields filled: ', addInput);
            //props.resetControlFilterEvt();
            props.setSelectInput({
                priceRange: 'No Selection',
                size: 'No Selection',
                brand: 'No Selection',
                color: 'No Selection',
            });

            const tsNow = Date.now();
            const newId = product_item_define.getRandProductId();
            const newPriceRange = product_item_define.getPriceRange(addInput.price);
            const newImgUrl = product_item_define.getRandImgUrl();
            const AddedProduct = {
                itemName: addInput.name,
                itemDetails: addInput.details,
                price: addInput.price,
                priceRange: newPriceRange,
                size: addInput.size,
                brand: addInput.brand,
                color: addInput.color,
                itemId: newId,
                createdTs: tsNow,
                imgUrl: newImgUrl,
            };
            props.onAppendProduct(AddedProduct);
            props.onFilterProduct([...props.productList, AddedProduct]);
            setAddInput({
                name: '',
                details: '',
                price: '',
                size: '',
                brand: '',
                color: '',
            });

            console.log('View_control_add: generated product ID:', newId);
            console.log('View_control_add: generated price range:', newPriceRange);
        }
    };

    console.log('View_control_add:', addInput);

    return (
        <>
            <div className="container mt-2 px-3 pt-2 bg-body-tertiary border border-2 rounded-4">
                <h6 className="text-center text-secondary-emphasis">Add new product</h6>
                <form className="adminForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="my-1">
                        <label className={'col-form-label' + addFocus.name}>Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nameAdminInput"
                            name="nameAdminInput"
                            maxLength="25"
                            onChange={(e) => {
                                setAddInput((prev) => ({ ...prev, name: e.target.value }));
                                setFocus((prev) => ({ ...prev, name: '' }));
                            }}
                            value={addInput.name}
                        ></input>
                    </div>
                    <div className="my-1">
                        <label className={'col-form-label' + addFocus.details}>Product Summary</label>
                        <textarea
                            className="form-control"
                            id="detailsAdminText"
                            name="detailsAdminText"
                            rows="4"
                            maxLength="100"
                            placeholder="A limited edition product trending now"
                            onChange={(e) => {
                                setAddInput((prev) => ({ ...prev, details: e.target.value }));
                                setFocus((prev) => ({ ...prev, details: '' }));
                            }}
                            value={addInput.details}
                        ></textarea>
                    </div>
                    <div className="my-1">
                        <label className={'col-form-label' + addFocus.price}>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="priceAdminInput"
                            name="priceAdminInput"
                            step="1"
                            min="1"
                            max="1000"
                            placeholder="1"
                            onChange={(e) => {
                                setAddInput((prev) => ({ ...prev, price: e.target.value }));
                                setFocus((prev) => ({ ...prev, price: '' }));
                            }}
                            value={addInput.price}
                        ></input>
                    </div>
                    <div className="my-1">
                        <label className={'col-form-label' + addFocus.size}>Size</label>
                        <select
                            className="form-select filterSelect"
                            aria-label="Default select example"
                            id="sizeAdminSelect"
                            onChange={(e) => {
                                setAddInput((prev) => ({ ...prev, size: e.target.value }));
                                setFocus((prev) => ({ ...prev, size: '' }));
                            }}
                            value={addInput.size}
                        >
                            <option value="No Selection">No Selection</option>
                            <option value="xs">XS</option>
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                            <option value="xl">XL</option>
                            <option value="xxl">XXL</option>
                            <option value="one size">One Size</option>
                        </select>
                    </div>
                    <div className="my-1">
                        <label className={'col-form-label' + addFocus.brand}>Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            id="brandAdminInput"
                            name="brandAdminInput"
                            maxLength="25"
                            onChange={(e) => {
                                setAddInput((prev) => ({ ...prev, brand: e.target.value }));
                                setFocus((prev) => ({ ...prev, brand: '' }));
                            }}
                            value={addInput.brand}
                        ></input>
                    </div>
                    <div className="my-1">
                        <label className={'col-form-label' + addFocus.color}>Color</label>
                        <input
                            type="text"
                            className="form-control"
                            id="colorAdminInput"
                            name="colorAdminInput"
                            maxLength="25"
                            onChange={(e) => {
                                setAddInput((prev) => ({ ...prev, color: e.target.value }));
                                setFocus((prev) => ({ ...prev, color: '' }));
                            }}
                            value={addInput.color}
                        ></input>
                    </div>
                    <div className="row my-4 d-grid px-2 gap-2">
                        <button type="submit" className="btn btn-primary" onClick={btnEvt}>
                            Add to product listing
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setAddInput({
                                    name: '',
                                    details: '',
                                    price: '',
                                    size: '',
                                    brand: '',
                                    color: '',
                                });
                            }}
                        >
                            Reset Entries
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
