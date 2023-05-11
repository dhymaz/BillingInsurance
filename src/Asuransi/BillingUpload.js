import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import alerts from './../assets/helper/alerts'
import { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { FaSearch, FaFilter, FaTelegramPlane,FaFileUpload } from "react-icons/fa";
import headerApiInternal from './../assets/helper/apiHelper'
import x from './../assets/helper/alerts'
import time from './../assets/helper/time'
import fh from './../assets/helper/formatHelper'
import * as Validator from 'validatorjs';
import ProgressBar from './../assets/helper/ProgressBar'
import { resolve } from 'promise';

function BillingUpload(props) {
  const [statusSubmit, setStatusSubmit] = useState(false);
  const [companyList, setcompanyList] = useState([]);

  useEffect(() => {
    GetCompanyList();
  }, [])


  const GetCompanyList = () => {
    $('#example').DataTable().destroy();
    const bodyReq = {};

    axios.post(process.env.REACT_APP_IP_INTERNAL_COMPANY_LIST,
      bodyReq, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          var companiesWithNullValue = res.data.response.unshift({ "InsID": "", "InsName": "-- All Insurance Companies --" });
          setcompanyList(res.data.response);
        }
      })
      .catch(e => x.sweetAlert('Opps..', e.message, 'OK'));
  }

  const processData =  (e) => {
    const ProgressBarz = ProgressBar();
    return new Promise ( (resolve, reject)=> {
      const el = document.querySelector("#onLoad");
      setTimeout(() => {
        resolve('false');
        setStatusSubmit('false');
        el.style.display = "none";
        console.log("this is the second message");
      }, 5000);
      el.innerHTML = ProgressBarz; 
      setStatusSubmit('true');
      resolve('true');
      console.log("this is the first message");
    });
  }
  
  const submitProcess = async (e) => {
    e.preventDefault();
    const tex = processData();
    tex.then(resolvevalue => {
      setStatusSubmit(resolvevalue);
    }).catch(error => console.log(error))
  }

  return (
    <div className='App'>
        <div id="onLoad" >
          
        </div>
        <div className='container'>
          <div className='row'>
            <h2>Ins. Billing Upload</h2>
            <small className='text-secondary'>Home &gt; Ins. Billing Upload</small>
          </div>
          <div class="container">
            <form method='POST' action='#' onSubmit={submitProcess}>
              <div className='row  mb-4'>
                  <div className='card px-0 shadow-sm '>
                    <div className='card-header header-form'>
                      <h6><FaFilter /> Upload Data</h6>
                    </div>
                    <div className='card-body'>
                      <div className='row mb-4'>
                        <div className='col-md-12 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                              <label className='col-auto'>
                                Insurance Type
                              </label>
                              <select className="form-select">
                                <option value='' selected>--- ALL Insurance Type ---</option>
                                <option value={'EL'}>Asuransi Kerusakan</option>
                                <option value={'CR'}>Asuransi Kredit</option>
                                <option value={'PA'}>Asuransi Jiwa</option>
                              </select>
                            </div>
                            <div className='col-md-6 col-sm-12'>
                              <label className='col-auto'>
                                Tanggal Penutupan
                              </label>
                              <input type="date" id="tglV" className='form-control' max={time.now()}/>
                            </div>
                          </div>                  
                        </div>
                        <div className='col-md-12 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-12 col-sm-12'>
                              <label className='col-auto'>
                                Upload Billing
                              </label>
                              <input type='file' name='upload' id='upload' className='form-control'/>
                            </div>
                          </div>                  
                        </div>
                        <div className='col-md-12 col-sm-12'>
                          <div className='row'>
                            <div className='col-md-12 col-sm-12'>
                              <button type="submit" className="btn btn-dark-blue mt-2 text-light" >
                                <FaFileUpload />  Upload
                              </button>
                            </div>
                          </div>                  
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </form>
          </div>
        </div> 
    </div>
  );
}

export default BillingUpload;
