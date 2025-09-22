import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useReducer, useState } from 'react';

import Page_top_login from './Page_top_login.js';
import Page_top_nav from './Page_top_nav.js';
import { contextMainParams } from './contextMainParams.js';
import storage from './storage.js';

// CA 2 Assignment IT8906 WMF
// Author: Daniel Khong Mun Loong 
// Student ID: 9197316U

export default function RootPage(props) {
    const [loginInput, setLoginInput] = useState({ email: 'admin@leeps.com', password: 'admin' });
    const [mainParams, setMainParams] = useState({ userMode: 'administrator' });

    console.log(`App: loginInput: ${loginInput.email}, ${loginInput.password}`);
    console.log(`App: mainParams:`, mainParams);

    return (
        <div>
            <Page_top_nav> </Page_top_nav>
            <Provider store={storage}> 
                <Page_top_login
                    onEmailUpdate={(emailEntry) => setLoginInput((prev) => ({ ...prev, email: emailEntry }))}
                    onPwUpdate={(pwEntry) => setLoginInput((prev) => ({ ...prev, password: pwEntry }))}
                    onBtnUpdate={(newUserMode) => setMainParams((prev) => ({ ...prev, userMode: newUserMode }))}
                    loginEntry={loginInput}
                    mainParams={mainParams}
                ></Page_top_login>      
                <div>                
                    <contextMainParams.Provider value={mainParams}>
                        <Outlet />
                    </contextMainParams.Provider>
                </div>
            </Provider>
        </div>
    );
}