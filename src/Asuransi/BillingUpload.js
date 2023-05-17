import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import alerts from './../assets/helper/alerts'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaFilter, FaFileUpload } from "react-icons/fa";
import headerApiInternal from './../assets/helper/apiHelper'
import x from './../assets/helper/alerts'
import time from './../assets/helper/time'
import fh from './../assets/helper/formatHelper'
import * as Validator from 'validatorjs';
import { resolve } from 'promise';
import Swal from 'sweetalert2';

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

  const processData = (e) => {
    e.preventDefault();
  }

  const submitProcess = async (e) => {
    e.preventDefault();
    const bodyReq = {
      "insco_id": document.getElementById('insco').value,
      "insc_type": document.getElementById('inscType').value,
      "closing_date": document.getElementById('closingDate').value.split("-").join(""),
      "data": document.getElementById('base64').value
    }


    axios.post(process.env.REACT_APP_IP_UPLOAD_BILLING,
      bodyReq, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          x.sweetAlert('Success', 'Upload Data Success', 'OK', 'success')
        } else {
          x.sweetAlert('Opps..', 'Data failed please try again!', 'OK')
        }
      })
      .catch(e => x.sweetAlert('Opps..', e.message, 'OK'));
  }

  const UploadFile = (file) => {
    console.log("target.value : " + file);
    var formData = new FormData();
    var imagefile = document.querySelector('#upload');
    formData.append("image", imagefile.files[0]);
    console.log(imagefile.files[0]);
    var f = imagefile.files[0];
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        //showing file converted to base64
        document.getElementById('base64').value = base64String;
        // alert('File converted to base64 successfuly!\nCheck in Textarea');
        alerts.notification('File Ready To Upload', 'success');
      };
    })(f);

    reader.readAsBinaryString(f);
  }

  return (
    <div className='App'>
      <NotificationContainer />
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
                  <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                          <label className='col-auto'>
                            Insurance Companies
                          </label>
                          <select className="form-select" id='insco' required>
                            {
                              companyList.map((res, index) => {
                                return (
                                  <option value={res.InsID}>{res.InsName}</option>
                                )
                              })
                            }
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='row mb-4'>
                    <div className='col-md-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <label className='col-auto'>
                            Insurance Type
                          </label>
                          <select className="form-select" id='inscType' required>
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
                          <input type="date" id="closingDate" className='form-control' max={time.now()} required />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                          <label className='col-auto'>
                            Upload Billing
                          </label>
                          <input type='file' name='upload' id='upload' className='form-control' onChange={(e) => { UploadFile(e.target.value) }} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" required />
                          <textarea id="base64" rows="5" hidden></textarea>
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
