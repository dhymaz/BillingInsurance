import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import { useEffect, useState } from 'react';
import {
  useParams
} from "react-router-dom";
import axios from 'axios';
import x from './../assets/helper/alerts'
import headerApiInternal from './../assets/helper/apiHelper'
import { FaSearch, FaFilter, FaTelegramPlane } from "react-icons/fa";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import fh from './../assets/helper/formatHelper';


function BillingVerification(props) {
  var [dataList, setDataList] = useState([]);
  var [insco, setInsco] = useState('');
  var [searchType, setSearchType] = useState('');
  var [searchText, setSearchText] = useState('');
  var [insType, setinsType] = useState('');
  var [checkboxValue, setCheckboxValue] = useState('');
  var [checkboxID, setcheckboxID] = useState('');
  const [companyList, setcompanyList] = useState([]);


  useEffect(() => {
    GetApiList();
    GetCompanyList();
  }, [])


  const checklist_process = (event) => {
    $(".checkbox").prop('checked',false);
    var id = event.currentTarget.id;
    document.getElementById(id).checked = true;
    var is_checked = document.getElementById(id).checked;
    if(is_checked){
      setCheckboxValue(event.currentTarget.value);
      setcheckboxID(id);
    }else{
      setCheckboxValue('');
      setcheckboxID('');
    }
  }

  const processVerify = (event) => {
    event.preventDefault();
    const confirm = window.confirm('Are you sure want to submited data?');
    if(confirm){
      var BodyProcess = {
        "billing_no"  : checkboxValue,
        "verified_by" : "KPOTES"
      }

      ProcessData(BodyProcess);
    }else{
      return false;
    }
  }    

  const GetApiList = (bodyData = '', isSearch = false) => {
    $('#example').DataTable().destroy();
    setDataList([]);
    if(bodyData == ''){
      var bodyData = {
        "search_by": "0",
        "kwt_date": "20230317",
        "kwt_no": "",
        "insco_id": null,
        "insc_type": "EL"
      }
    }
    console.log(process.env.REACT_APP_IP_INTERNAL_LIST_VERIFY);

    axios.post(process.env.REACT_APP_IP_INTERNAL_LIST_VERIFY,
      bodyData, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          if (res.data.response.length > 0) {
            
            setDataList(res.data.response);
            document.querySelector("#submitFilter").classList.remove("disabled");
          } else {
            document.querySelector("#submitFilter").classList.remove("disabled"); 
            setDataList([]);
          }
        }
        document.querySelector("#submitFilter").classList.remove("disabled"); 
      })
      .catch(e => { 
        x.sweetAlert('Opps..',e.message,'OK');
        document.querySelector("#submitFilter").classList.remove("disabled"); 
      });
  }

  const ProcessData = (bodyData) => {
    document.querySelector("#submitFilter").classList.remove("disabled");
    axios.post(process.env.REACT_APP_IP_INTERNAL_PROCESS_VERIFY,
      bodyData, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          var bodyData = {
            "search_by": "0",
            "kwt_date": "20230317",
            "kwt_no": "",
            "insco_id": null,
            "insc_type": ""
          }
      
          GetApiList(bodyData);
          document.getElementById(checkboxID).checked = false;
          x.sweetAlert('Great!',res.data.response,'OK','success');
        }else{
          x.sweetAlert('Opps...',res.data.message,'OK');
        }
      })
      .catch(e => console.log(e.message));
  }

  const submitSearch = (event) => {
    event.preventDefault();
    document.querySelector("#submitFilter").classList.add("disabled");
    searchType = $("#searchType").val() == '' ? 0 : searchType;
    console.log(searchType);
    var bodyData = {
      "search_by": searchType == ""?0:searchType,
      "kwt_date": searchType == 0 ? "20230319" : document.querySelector("#searchText").value,
      "kwt_no": searchText,
      "insco_id": insco == '' ? null : insco,
      "insc_type": insType == '' ? 'EL' : insType
    }

    GetApiList(bodyData,true);
  }

  const changeSearchType = (val) => {
    var typeInput = val == 1 ? 'date' : 'text';
    setSearchType(val);
    setSearchText('');
    console.log(typeInput);
    document.querySelector('#searchText').type=typeInput;
    document.querySelector('#searchText').value = '';
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
   
  $(document).ready(function () {
      setTimeout(function(){
      $('#example').DataTable();
      } ,2000);
  });
  return (
    <div className='App'>
      <NotificationContainer />
      <div className='container'>
        <div className='row'>
          <h2>Billing Verification</h2>
          <small className='text-secondary'>Home &gt; Verification</small>
        </div>
        <div className="container">
          <div className='row  mb-4'>
            <div className='card px-0 shadow-sm '>
              <div className='card-header header-form'>
                <h6><FaFilter /> Filter Data</h6>
              </div>
              <div className='card-body'>
                <form id='form_search' method='post' onSubmit={submitSearch}>
                  <div className='row mb-4'>
                    <div className='col-md-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <label className='col-auto'>
                            Insurance Company
                          </label>
                          <select className="form-select" onChange={(e) => { setInsco(e.target.value) }}>
                              {
                                companyList.map((item,index) => {
                                  return (
                                    <option key={index} value={item.InsID}>{item.InsName}</option>
                                  )
                                })
                              }
                          </select>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <label className='col-auto'>
                            Insurance Type
                          </label>
                          <select className="form-select" onChange={(e) => { setinsType(e.target.value) }}>
                              <option value=''>--- ALL Insurance Type ---</option>
                              <option value={'EL'} selected>Asuransi Kerusakan</option>
                              <option value={'CR'}>Asuransi Kredit</option>
                              <option value={'PA'}>Asuransi Jiwa</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-12 col-sm-12'>
                      <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                          <label className='col-auto'>
                            Search By
                          </label>
                          <select className="form-select" id='seaechType' onChange={(e) => { setSearchType(e.target.value);changeSearchType(e.target.value); }}>
                            <option value='0'>No. Kwitansi</option>
                            <option value='1'>Tanggal Kwitansi</option>
                          </select>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <label className='col-auto'>
                            Filter
                          </label>
                          <input type="text" id='searchText' className='form-control' onKeyUp={(e) => { setSearchText(e.target.value) }} onKeyDown={(e) => { setSearchText(e.target.value) }} />
                        </div>
                      </div>
                      <div className="row">
                        <div className='col-md-12 col-sm-12'>
                          <button type="submit" id="submitFilter" className="btn btn-dark-blue mt-2 text-light disabled">
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

          <div className='row'>
            <div className="card shadow-sm ">
              <form onSubmit={processVerify} method="POST">
                <div className="card-body ">
                  <div className='table-responsive'>
                    <table className='table table-stripped stripe' id='example'>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>No.Kwitansi</th>
                          <th>Tgl Kwitansi</th>
                          <th>Insurance Company</th>
                          <th>Total Unit</th>
                          <th>Total net AUM</th>
                          <th>Total Gross</th>
                          <th style={{ 'width': '50px' }}>#</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dataList.map((list, index) => {
                            var no = parseInt(index) + 1;
                            return (
                              <tr key={index} tabIndex={no}>
                                <td>{no}</td>
                                <td>{list.KWTNo}</td>
                                <td>{list.KWTDate}</td>
                                <td>{list.InsName}</td>
                                <td>{list.TotalUnit}</td>
                                <td>{fh.currenyFormat(list.TotalPremiPara)}</td>
                                <td>{fh.currenyFormat(list.TotalPremi)}</td>
                                <td>
                                  <input type="checkbox" value={list.BillingNo} className="checkbox" id={"checkbox_" + no} onClick={checklist_process}/>
                                </td>
                              </tr>
                            )
                          })

                        }
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className='col-md-12 col-sm-12'>
                  {
                      (dataList.length > 0) ?
                    <button className="btn btn-dark-blue  mt-2 mb-3 text-light">
                      <FaTelegramPlane />  Process
                    </button> : ""
                  }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="modal fade" id="exampleModalConfirmProcess" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-form">
              <h5 className="modal-title" id="exampleModalToggleLabel2">Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure want to Process Data ?
            </div>
            <div className="modal-footer">
              <button className="btn btn-danger" >Yes</button>
              <button className="btn btn-light" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
  
export default BillingVerification;
