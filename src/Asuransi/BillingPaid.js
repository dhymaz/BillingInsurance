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
import headerApiInternal from './../assets/helper/apiHelper'
import x from './../assets/helper/alerts'
import fh from './../assets/helper/formatHelper'
import * as Validator from 'validatorjs';



function BillingPayment(props) {
  const [dataList, setDataList] = useState([]);
  const [insco, setInsco] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [checkboxValue, setcheckboxValue] = useState('');
  const [companyList, setcompanyList] = useState([]);



  useEffect(() => {
    GetApiList();
    GetCompanyList();
  }, [])

  const GetApiList = (bodyParam='') => {
    $('#example').DataTable().destroy();
    if(bodyParam ==''){
      var bodyReq = {
        "search_by" : "0",
        "kwt_no"    : "",
        "no_surat"  : "2023033106",
        "tgl_surat" : "20230331",
        "insco_id"  : insco
      }
    }else{
      bodyReq = bodyParam;
    }

    axios.post(process.env.REACT_APP_IP_INTERNAL_BILLING_PAID,
      bodyReq, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          setDataList(res.data.response);
        }
      })
      .catch(e => x.sweetAlert('Opps..',e.message,'OK'));
  }


  const GetCompanyList = () => {
    $('#example').DataTable().destroy();
    const bodyReq = {};

    axios.post(process.env.REACT_APP_IP_INTERNAL_COMPANY_LIST,
      bodyReq, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          var companiesWithNullValue = res.data.response.unshift({"InsID":"","InsName":"-- All Insurance Companies --"}); 
          setcompanyList(res.data.response);
          // console.log(res.data.response);
        }
      })
      .catch(e => x.sweetAlert('Opps..',e.message,'OK'));
  }

  
  const submitProcess = (event) => {
    event.preventDefault();

    var bodyReq = {
        "payment_no" : checkboxValue,
        "petugas"    : "KPODIMAS"
    }

    ProcessData(bodyReq);
  }

  const ProcessData = (bodyReq = '') => {
    console.log('SUBMITED');

    axios.post(process.env.REACT_APP_IP_INTERNAL_BILLING_PAID_PROCESS,
      bodyReq, headerApiInternal)
      .then(res => {
        if(res.data.status_code !== "00") { x.sweetAlert('Opps...',res.data.message,'OK') }; 
      })
      .catch(e => 
        x.sweetAlert('Opps..',e.message,'OK')
      );
  }

  const submitSearch = (e) => {
    e.preventDefault();
   
    var bodyReq = {
      "search_by" : searchType==""?0:searchType,
      "kwt_no"    : searchText,
      "no_surat"  : searchText==""?"2023033106":searchText, // nanti di update karena dari backend validasinya belum fix 
      "tgl_surat" : searchType == '2' ? searchText.split("-").join("") :"20230331",
      "insco_id"  : insco
    }
    
    GetApiList(bodyReq);
  }

  const checklist_billpay = (event) => {
    // document.querySelector(".checkbox_billpay").style.display='none';
    $(".checkbox_billpay").prop('checked',false);
    var thisCheckbox = document.getElementById(event.target.id);
    setcheckboxValue(thisCheckbox.value);
    thisCheckbox.checked = true;
    document.getElementById("submit").scrollIntoView();
  }

  $(document).ready(function () {
    setTimeout(function(){
    $('#example').DataTable();
    } ,1000);
  });

  return (
    <div className='App'>
        <div className='container'>
          <div className='row'>
            <h2>Billing Paid</h2>
            <small className='text-secondary'>Home &gt; Billing Paid</small>
          </div>
          <div class="container">
            <div className='row  mb-4'>
                <div className='card px-0 shadow-sm '>
                  <div className='card-header header-form'>
                    <h6><FaFilter /> Filter Data</h6>
                  </div>
                  <div className='card-body'>
                  <form method='post' onSubmit={submitSearch}>
                    <div className='row mb-4'>
                      <div className='col-md-12 col-sm-12'>
                        <label className='col-auto'>
                          Insurance Name
                        </label>
                        <select className="form-select" onChange={(e)=> setInsco(e.target.value)}>
                          {
                            companyList.map((item,index) => {
                              return (
                                <option key={index} value={item.InsID}>{item.InsName}</option>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div className='col-md-12 col-sm-12'>
                        <div className='row'>
                          <div className='col-md-6 col-sm-12'>
                            <label className='col-auto'>
                              Search By
                            </label>
                            <select className="form-select" onChange={(e)=> setSearchType(e.target.value)}>
                              <option value="0">No. Kwitansi</option>
                              <option value="1">No. Surat</option>
                              <option value="2">Tanggal Surat</option>
                            </select>
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <label className='col-auto'>
                              &nbsp;
                            </label>
                            <input type="text" className='form-control' onChange={(e)=> setSearchText(e.target.value)}/>
                          </div>
                          <div className='col-md-12 col-sm-12'>
                            <button type="submit"  className="btn btn-dark-blue mt-2 text-light">
                              <FaSearch />  Search
                            </button>
                          </div>
                        </div>                  
                      </div>
                    </div>  
                    </form>
                  </div>
                </div>
            </div>

            <div className='row mb-4'>
              <div class="card shadow-sm ">
                <form method='POST' onSubmit={submitProcess}>
                <div class="card-body">
                  <table className='table table-responsive' id='example'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>No. Surat</th>
                        <th>Tgl Surat</th>
                        <th>No. Kwitansi</th>
                        <th>Total Unit</th>
                        <th>Total Premi</th>
                        <th>Terbayar</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                    {   
                      dataList.map((list,index)=>{
                        var no =  index + 1;
                          return (
                            <tr>
                              <td>{no}</td>
                              <td>{list.PaymentNo}</td>
                              <td>{list.PaymentDate}</td>
                              <td>{list.KWTNo}</td>
                              <td>{list.TotalUnit}</td>
                              <td>{fh.currenyFormat(list.TotalPremi)}</td>
                              <td>{fh.currenyFormat(list.Terbayar)}</td>
                              <td>
                                <input 
                                type="checkbox" className='billing_payment' id={'billing_payment_'+no} onClick={checklist_billpay} value={list.PaymentNo}  />
                              </td>
                            </tr>
                          )
                        })
                    }
                    </tbody>
                  </table>
                </div>
                <div className='row '>
                  <div className='col-md-12 col-sm-12 mb-3'>
                    <button type="submit" id='submit' className="btn btn-dark-blue mt-2 mb-2 text-light">
                      <FaTelegramPlane />  Process
                    </button>
                  </div>
                </div>
                </form>
              </div>
            </div>

          </div>
        </div> 
    </div>
  );
}

export default BillingPayment;
