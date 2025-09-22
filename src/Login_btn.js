import { useDispatch  } from 'react-redux';
import { clearCart } from './cartSlice.js';

import CheckLogin from './CheckLogin.js';

export default function Login_btn(props) {
    // this component handles the login logic for user's email and password input
    // it also uses an imported function to handle the login identity check

    let btnText = 'Login';
    
    if (props.loginStatus.mode !== 'no login')
    {
        btnText = 'Logout';
    }

    console.log(`Login_btn: mainParams check:`, props.mainParams.userMode);

    const dispatch = useDispatch();

    return (
        <>
            <button
                type="submit"
                className="btn btn-primary navbarLoginBtn"
                onClick={() => {
                    let login_mode = 'no login';

                    if (props.mainParams.userMode === 'default') 
                    {
                        if (props.loginStatus.mode === 'no login')
                        {
                            const loginIdentity = CheckLogin(props.loginEntry);

                            console.log('Login_btn: button invoked in mode: default');
                            console.log('Login_btn: button:', loginIdentity);

                            if (loginIdentity === 'admin') 
                            {
                                props.onBtnUpdate('administrator');
                                props.onLoginStatusUpdate('admin login');
                                dispatch( clearCart() );
                                //login_mode = 'admin login';
                            }
                            else if (loginIdentity === 'customer') 
                            {
                                props.onLoginStatusUpdate('customer login');
                                //login_mode = 'customer login';
                            }
                            else 
                            {
                                props.onLoginStatusUpdate('no login');
                                //login_mode = 'no login';
                            }
                        }
                        else
                        {
                            // other login status modes
                            console.log('Login_btn: button invoked in default mode:', props.loginStatus.mode);
                            props.onEmailUpdate('');
                            props.onPwUpdate('');
                            dispatch( clearCart() );
                            props.onLoginStatusUpdate('no login');
                        }
                    }
                    else 
                    {
                        // userMode === 'administrator'
                        console.log('Login_btn: button invoked in system mode:', props.mainParams.userMode);
                        props.onBtnUpdate('default'); // returns the page back to user mode: default
                        props.onEmailUpdate('');
                        props.onPwUpdate('');
                        dispatch( clearCart() );
                        props.onLoginStatusUpdate('no login');
                        //login_mode = 'logout';
                    }
                }}
            >
                {btnText}
            </button>
        </>
    );
}
