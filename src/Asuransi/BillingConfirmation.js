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
import { FaSearch, FaFilter,FaTelegramPlane } from "react-icons/fa";


function BillingConfirmation(props) {

  useEffect(() => {
    alerts.notification();
    $(document).ready(function () {
      $('#example').DataTable();  
    });
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    var element = document.getElementById('konten').style.display='block';
  }

  return (
    <div className='App'>
        <div className='container'>
          <div className='row'>
            <h2>Billing Confirmation</h2>
            <small className='text-secondary'>Home &gt; Billing Confirmation</small>
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
                        <select className="form-select">
                          <option>All</option>
                        </select>
                      </div>
                      <div className='col-md-12 col-sm-12'>
                        <form id='submit_search' onSubmit={submitSearch}>
                            <div className='row'>
                                <div className='col-md-6 col-sm-12'>
                                    <label className='col-auto'>
                                    Search By
                                    </label>
                                    <select className="form-select">
                                    <option>No. Kwitansi</option>
                                    </select>
                                </div>
                                <div className='col-md-6 col-sm-12'>
                                    <label className='col-auto'>
                                    &nbsp;
                                    </label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className='col-md-12 col-sm-12'>
                                    <button type="submit" className="btn btn-dark-blue mt-2 text-light">
                                        <FaSearch />  Search
                                    </button>
                                </div>
                            </div>                  
                        </form>
                      </div>
                    </div>  
                   
                  </div>
                </div>
            </div>

            <div className='row mb-4' id='konten' style={{'display':'none'}}>
              <div class="card shadow-sm ">
                <div class="card-body">
                  <table className='table table-responsive' id='example'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Data Tertanggung</th>
                        <th>No. Polis</th>
                        <th>Tenor & Premi</th>
                        <th>Insurance Company</th>
                        <th>Kwitansi</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td>1</td>
                          <td>SC00000001-0000001</td>
                          <td>03-07-2011</td>
                          <td>PT Asuransi Umum MEGA</td>
                          <td>0.00</td>
                          <td>0.00</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
                <div className='row'>
                  <div className='col-md-12 col-sm-12 mb-3'>
                    <button type="submit" className="btn btn-dark-blue mt-2 mb-2 text-light">
                      <FaTelegramPlane />  Confirmed
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div> 
    </div>
  );
}

export default BillingConfirmation;
