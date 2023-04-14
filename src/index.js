import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Layouts/Header';
import Dashboard from './Dashboard/Dashboard';
import PageNotFound from './Layouts/PageNotFound';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductDetail from './Dashboard/ProductDetail';
import FormLogin from './Layouts/FormLogin';
import Regist from './Layouts/Regist';
import Logout from './Layouts/Logout';
import BillingVerification from './Asuransi/BillingVerification';
import Voucher from './Asuransi/Voucher';
import VoucherList from './Asuransi/voucherList';
import VoucherListIPC from './Asuransi/voucherListIPC';
import Billpay from './Asuransi/BillingPayment';
import BillPaid from './Asuransi/BillingPaid';
import BillPaidVoucher from './Asuransi/BillingPaidVoucher';
import BillingConfirmation from './Asuransi/BillingConfirmation';
import PrintBillingVoucher from './Asuransi/printBillingVoucher';
import ReactPDF from '@react-pdf/renderer';

const router = createBrowserRouter([
    {
        path: "/",
        element: <FormLogin/>
    }, {
        path: "/dashboard",
        element: <Dashboard/>
    }, {
        path: "/detail/:id",
        element: <ProductDetail/>
    }, {
        path: "/regist",
        element: <Regist/>
    }, {
        path: "/logout",
        element: <Logout/>
    }, {
        path: "/verification",
        element : <BillingVerification />
    }, {
        path: "/voucher",
        element : <Voucher />
    }, {
        path: "/voucherList",
        element : <VoucherList />
    }, {
        path: "/voucherListIPC",
        element : <VoucherListIPC />
    }, {
        path: "/billpay",
        element : <Billpay />
    }, {
        path: "/voucherlist",
        element : <VoucherList />
    }, {
        path: "/billpaid",
        element : <BillPaid />
    }, {
        path: "/billPaidVoucher",
        element : <BillPaidVoucher />
    }, {
        path: "/tesPrint",
        element : <PrintBillingVoucher />
    }, {
        path: "/BillConfirm",
        element : <BillingConfirmation />
    },{
        path: "*",
        element: <PageNotFound/>
    }
]);

const eventLoader = () => {
    console.log('please wait . . .')
} 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Header/>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
