export default function Login_pw(props) {
    // this component handles the login input for password
    //console.log(`Login_pw: entry password: ${props.loginEntry.password}`);

    if (props.userMode === 'default') 
    {
        if(props.loginStatus.mode === 'customer login')
        {
            return (
                <>
                    <input
                        type="password"
                        className="form-control"
                        id="accPw"
                        value={props.loginEntry.password}
                        disabled
                    ></input>
                </>
            );
        }
        else
        {
            return (
                <>
                    <input
                        type="password"
                        className="form-control"
                        id="accPw"
                        placeholder="password"
                        value={props.loginEntry.password}
                        onChange={(e) => props.onPwUpdate(e.target.value)}
                    ></input>
                </>
            );
        }
    }
    else 
    {
        return (
            <>
                <input
                    type="password"
                    className="form-control"
                    id="accPw"
                    value={props.loginEntry.password}
                    disabled
                ></input>
            </>
        );
    }
}
