import { useContext } from 'react';

import View_control_filter from './View_control_filter.js';
import View_control_select_action from './View_control_select_action.js';
import View_control_add from './View_control_add.js';
import { contextMainParams } from './contextMainParams.js';

// this higher level component contains the sub components for filter menu,
// selection action menu, add item menu
export default function View_control(props) {
    const mainParamsLocal = useContext(contextMainParams);
    const isAdminMode = mainParamsLocal.userMode === 'administrator';
    //console.log('View_control: isAdminMode :', isAdminMode);

    return (
        <>
            <View_control_filter
                productList={props.productList}
                filterList={props.filterList}
                onFilterProduct={props.onFilterProduct}
                setSelectInput={props.setSelectInput}
                selectInput={props.selectInput}
            ></View_control_filter>
            <View_control_select_action
                filterList={props.filterList}
                productList={props.productList}
                onFilterProduct={props.onFilterProduct}
                onUpdateProduct={props.onUpdateProduct}
                setSelectInput={props.setSelectInput}
            ></View_control_select_action>
            {isAdminMode && (
                <View_control_add
                    productList={props.productList}
                    resetControlFilterEvt={props.resetAllFilterInput}
                    setSelectInput={props.setSelectInput}
                    onAppendProduct={props.onAppendProduct}
                    onFilterProduct={props.onFilterProduct}
                ></View_control_add>
            )}
        </>
    );
}
