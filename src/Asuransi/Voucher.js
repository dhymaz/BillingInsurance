import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import alerts from  './../assets/helper/alerts' 
import { useEffect, useState } from 'react';
import {
  useParams 
} from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FaFileAlt } from "react-icons/fa";


function Voucher(props) {

  useEffect(() => {
    alerts.notification();
    $(document).ready(function () {
      $('#example').DataTable();  
    });
  }, [])

  return (
    <div className='App'>
        <div className='container'>
          <div className='row'>
            <h2>Ins Billing Voucher</h2>
            <small className='text-secondary'>Home &gt; Ins Billing Voucher</small>
          </div>
          <div class="container">
             <div className='row'>
                <div  className='card px-0'>
                    <div className='card-header header-form'>
                        <h6>Billing</h6>
                    </div>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12 d-flex mt-2 voucher-content flex-row-reverse'>
                                <a href={'voucherList'}>
                                    <button id='vipb' className='btn btn-dark-blue btn-voucher' ><FaFileAlt size={70}/><h5>Voucher IPB</h5></button>
                                </a>
                            </div>
                            <div className='col-md-6 col-sm-12 d-flex mt-2 voucher-content flex-row'>
                                <a href={'voucherListIPC'}>                               
                                    <button id='vipc' className='btn btn-dark-blue btn-voucher' ><FaFileAlt size={70}/><h5>Voucher IPC</h5></button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div> 
    </div>
  );
}

export default Voucher;
