export default function CheckLogin(userCredentials) {
    console.log('CheckLogin: userCredentials: ', userCredentials);

    const adminCredentials = { email: 'admin@leeps.com', password: 'admin' };
    const customerCredentialsList = [
        { email: 'customer1@leeps.com', password: 'password' },
        { email: 'customer2@leeps.com', password: 'password' }
    ];
    const userTypeFlag = { admin: 'admin', valid_customer: 'customer', invalid_customer: 'unknown' };

    if (userCredentials.email === adminCredentials.email && userCredentials.password === adminCredentials.password) 
    {
        return userTypeFlag.admin;
    } 
    else 
    {
        for (let i = 0; i < customerCredentialsList.length; i++) 
        {
            if (userCredentials.email === customerCredentialsList[i].email && userCredentials.password === customerCredentialsList[i].password) 
            {
                //console.log("checking customer credentials:", i);
                return userTypeFlag.valid_customer;
            } 
        }

        return userTypeFlag.invalid_customer;
    }
}
