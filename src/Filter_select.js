export default function Filter_select(props) {
    // this component does the mapping of category sets into select options
    const optionArr = props.categoryArr.map((itemTxt) => (
        <option key={itemTxt} value={itemTxt}>
            {props.categoryInfo.txtCap && itemTxt !== 'No Selection' ? itemTxt.toUpperCase() : itemTxt}
        </option>
    ));

    return (
        <>
            <label className="col-form-label">{props.categoryInfo.labelTxt}</label>
            <select
                className="form-select filterSelect"
                aria-label="Default select example"
                id={props.categoryInfo.idSelect}
                value={props.selectValue}
                onChange={(e) => props.onSelectUpdate(e.target.value)}
            >
                {optionArr}
            </select>
        </>
    );
}
