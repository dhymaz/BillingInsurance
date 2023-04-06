import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import alerts from  './../assets/helper/alerts' 
import { useEffect, useState } from 'react';
import ReactPDF from '@react-pdf/renderer';

import {
  useParams 
} from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FaSearch, FaFilter,FaPrint } from "react-icons/fa";


function VoucherList(props) {

  useEffect(() => {
    alerts.notification();
    $(document).ready(function () {
      $('#example').DataTable();  
    });
  }, []);

  // ReactPDF.renderToStream("hello");

  return (
    <div className='App'>
        <div className='container'>
          <div className='row'>
            <h2>Ins. Billing Paid Voucher</h2>
            <small className='text-secondary'>Home &gt; Ins. Billing Voucher</small>
          </div>
          <div class="container">
            <div className='row  mb-4'>
                <div className='card px-0 shadow-sm '>
                  <div className='card-header header-form'>
                    <h6><FaFilter /> Filter Data</h6>
                  </div>
                  <div className='card-body'>
                    <div className='row mb-4'>
                      <div className='col-md-12 col-sm-12'>
                        <label className='col-auto'>
                          Insurance Name
                        </label>
                        <input type="date" className='form-control'/>
                      </div>
                      <div className='col-md-12 col-sm-12'>
                        <div className='row'>
                          <div className='col-md-12 col-sm-12'>
                            <label className='col-auto'>
                              Pilihan
                            </label>
                            <select className="form-select">
                              <option>Voucher</option>
                              <option>Lampiran Premi Asuransi</option>
                              <option>Lampiran Rekap Konsumen</option>
                            </select>
                          </div>
                          <div className='col-md-12 col-sm-12'>
                            <a href={'/tesPrint'}>
                              <button type="submit" className="btn btn-dark-blue mt-2 text-light">
                                <FaPrint />  Print
                              </button>
                            </a>
                          </div>
                        </div>                  
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

export default VoucherList;
