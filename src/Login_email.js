export default function Login_email(props) {
    // this component handles the login input for email
    //console.log(props.loginEntry);

    if (props.userMode === 'default') 
    {
        //console.log("Login_email:", props.loginStatus);
        if(props.loginStatus.mode === 'customer login')
        {
            return (
                <>
                    <input
                        type="email"
                        className="form-control"
                        value={props.loginEntry.email}
                        id="accEmail"
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
                        type="email"
                        className="form-control"
                        id="accEmail"
                        placeholder="customer1@leeps.com"
                        value={props.loginEntry.email}
                        onChange={(e) => props.onEmailUpdate(e.target.value)}
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
                    type="email"
                    className="form-control"
                    value={props.loginEntry.email}
                    id="accEmail"
                    disabled
                ></input>
            </>
        );
    }
}
