import { createHashRouter, Link, RouterProvider } from 'react-router-dom';

import RootPage from './RootPage.js';
import Page_centre_1 from './Page_centre_1.js';
import Home_Page from './Home_Page.js';
import PaymentDetails from './PaymentDetails.js'

// Front end web development showcase
// Author: Daniel Khong Mun Loong 

const router = createHashRouter([
    {
        path: '/',
        element: <RootPage />,
        children: [
            {
                path: '/',
                element: <Page_centre_1></Page_centre_1>,
            },
            {
                path: '/aboutus',
                element: <Home_Page></Home_Page>, 
            },
            {
                path: '/pay',
                element: <PaymentDetails></PaymentDetails>, 
            },            
        ],
    },
]);

export default function App(props) {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}