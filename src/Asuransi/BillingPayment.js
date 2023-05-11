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
import { FaSearch, FaFilter, FaTelegramPlane } from "react-icons/fa";
import headerApiInternal from './../assets/helper/apiHelper'
import x from './../assets/helper/alerts'
import time from './../assets/helper/time'
import fh from './../assets/helper/formatHelper'
import * as Validator from 'validatorjs';


function BillingPayment(props) {
  const [dataList, setDataList] = useState([]);
  const [insco, setInsco] = useState('');
  const [searchType, setSearchType] = useState('0');
  const [searchText, setSearchText] = useState('');
  const [Bank, setBank] = useState('');
  const [sisaBayar, setSisaBayar] = useState('');
  var [tglTransaksi, setTglTransaksi] = useState('');
  const [checkboxValue, setcheckboxValue] = useState('');
  const [grandtotal, setGrandTotal] = useState(0);
  const [companyList, setcompanyList] = useState([]);

  useEffect(() => {
    if (dataList.length == 0) {
      GetApiList()
    }
    GetCompanyList();
  }, [])


  const GetApiList = (bodyParam = '') => {
    $('#example').DataTable().destroy();
    if (bodyParam == '') {
      var bodyReq = {
        "search_by": "0",
        "kwt_date": "20110703",
        "kwt_no": "",
        "insco_id": insco
      }
    } else {
      bodyReq = bodyParam;
    }

    axios.post(process.env.REACT_APP_IP_INTERNAL_BILLING_PAYMENT,
      bodyReq, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          console.log(res.data.response);
          setDataList(res.data.response);
          document.getElementById("form-submit").style.display = "block"
        }
        var total = 0;
        res.data.response.map((listNumber, indexNumber) => {
          total = parseInt(total) + parseInt(listNumber.SisaTerbayar);
        })
        setGrandTotal(total);
      })
      .catch(e => x.sweetAlert('Opps..', e.message, 'OK'));
  }

  const ProcessData = (bodyReq = '') => {
    console.log('SUBMITED');

    axios.post(process.env.REACT_APP_IP_INTERNAL_BILLING_PAYMENT_PROCESS,
      bodyReq, headerApiInternal)
      .then(res => {
        x.sweetAlert('Great!', res.data.response, 'OK', 'success');
        console.log(res);
        GetApiList();
      })
      .catch(e =>
        console.log(e)
      );
  }

  const submitSearch = (e) => {
    e.preventDefault();

    var bodyReq = {
      "search_by": searchType,
      "kwt_date": searchType == '1' ? searchText.split("-").join("") : "20110703",
      "kwt_no": searchText.trim(),
      "insco_id": insco
    }

    GetApiList(bodyReq);
  }

  const changeSearchType = (val) => {
    var typeInput = val == 1 ? 'date' : 'text';
    console.log(typeInput);
    document.querySelector('#searchText').type = typeInput;
    document.querySelector('#searchText').value = '';
  }

  const submitProcess = (event) => {
    event.preventDefault();
    var confirmation = window.confirm('Apakah Anda Yakin akan melakukan Pembayaran Untuk record yang dipilih?');
    if (confirmation == false) {
      return false;
    }


    const rules = {
      Bank: 'required|string',
      sisaBayar: 'required|numeric',
      tglTransaksi: 'required'
    }
    //datepicker terkadang bisa ke ambil kadang tidak, solusinya langsung panggil ID value saja
    tglTransaksi = document.getElementById("tglTransaksi").value;

    var dataInput = {
      Bank: Bank,
      sisaBayar: sisaBayar.trim().replaceAll(",", ""),
      tglTransaksi: new Date(tglTransaksi)
    }

    let validation = new Validator(dataInput, rules);

    validation.passes(); // true
    validation.fails();

    if (validation.errors.get('tglTransaksi') != '') {
      alert(validation.errors.get('tglTransaksi'));
    } else if (validation.errors.get('Bank') != '') {
      alert(validation.errors.get('Bank'));
    } else if (validation.errors.get('sisaBayar') != '') {
      alert(validation.errors.get('sisaBayar'));
    } else {
      console.log(tglTransaksi);
      var bodyReq = {
        "bank_id": Bank.trim(),
        "premi_terbayar": sisaBayar.trim().replaceAll(",", ""),
        "tgl_bayar": tglTransaksi.split("-").join(""),
        "billing_no": checkboxValue.trim(),
        "petugas": "KPOTES"
      }
      //  console.log(bodyReq);
      ProcessData(bodyReq);
    }
  }

  const checklist_billpay = (event) => {
    // document.querySelector(".checkbox_billpay").style.display='none';
    $(".checkbox_billpay").prop('checked', false);
    var explode = event.target.id.split("_");
    var thisCheckbox = document.getElementById(event.target.id);
    setcheckboxValue(thisCheckbox.value);
    thisCheckbox.checked = true;
    var thisSisaByar = document.getElementById('sisaBayar_' + explode[1]).value.replaceAll(".00", "");
    setSisaBayar(thisSisaByar);
    console.log($("#sisaBayar_" + explode[1]))
    document.getElementById('inputSisaBayar').value = thisSisaByar;
    fh.inputCurrency($("#inputSisaBayar"))
    document.getElementById('inputSisaBayar').scrollIntoView();
  }

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

  $(document).ready(function () {
    setTimeout(function () {
      $('#example').DataTable();
    }, 2000);
  });

  return (
    <div className='App'>
      <NotificationContainer />
      <div className='container'>
        <div className='row'>
          <h2>Billing Payment</h2>
          <small className='text-secondary'>Home &gt; Verification</small>
        </div>
        <div className="container">
          <div className='row  mb-4'>
            <div className='card px-0 shadow-sm '>
              <div className='card-header header-form'>
                <h6><FaFilter /> Filter Data</h6>
              </div>
              <div className='card-body'>
                <form method="post" onSubmit={submitSearch}>
                  <div className='row mb-4'>
                    <div className='col-md-12 col-sm-12'>
                      <label className='col-auto'>
                        Insurance Name
                      </label>
                      <select className="form-select" onChange={(e) => { setInsco(e.target.value) }}>
                        {
                          companyList.map((item, index) => {
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
                          <select className="form-select" onChange={(e) => { setSearchType(e.target.value); changeSearchType(e.target.value) }}>
                            <option value="0">No. Kwitansi</option>
                            {/* <option value="1">Tgl Kwitansi</option> */}
                          </select>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                          <label className='col-auto'>
                            &nbsp;
                          </label>
                          <input type="text" id='searchText' className='form-control' onChange={(e) => { setSearchText(e.target.value) }} />
                        </div>
                        <div className='col-md-12 col-sm-12'>
                          <button type="submit" className="btn btn-dark-blue mt-2 text-light">
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
            <div className="card shadow-sm ">
              <div className="card-body">
                <div className='table-responsive'>
                  <table className='table stripe' id='example'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>No.Kwitansi</th>
                        <th>Tgl Kwitansi</th>
                        <th>Insurance Company</th>
                        <th>Total Para</th>
                        <th>Total Premi</th>
                        <th>Nett<br />Premi</th>
                        <th>Nett<br />Terbayar</th>
                        <th>#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dataList.map((list, index) => {
                          var no = index + 1;
                          return (
                            <tr key={index} tabIndex={index + 1}>
                              <td style={{ "width": "10px" }}>{no}</td>
                              <td>{list.KWTNo}</td>
                              <td>{list.KWTTgl}</td>
                              <td>{list.InsName}</td>
                              <td align='right'>{fh.currenyFormat(list.totalpara)}<br /><strong>{list.TotalUnitPara}</strong></td>
                              <td align='right'>{fh.currenyFormat(list.TotalPremi)}<br /><strong>{list.TotalUnitPremi}</strong></td>
                              <td align='right'>{fh.currenyFormat(list.NetPremi)}</td>
                              <td align='right'>{fh.currenyFormat(list.Terbayar)}</td>
                              <td style={{ "width": "10px" }}>
                                <input name='nilai_premi_withot_separator' id={'sisaBayar_' + no} type='hidden' value={list.SisaTerbayar} />
                                <input id={'checkbox_' + no}
                                  type="checkbox" className='checkbox_billpay' value={list.BillingNo} onChange={checklist_billpay} />
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='row d-flex justify-content-end'>
                <div className='col-md-3 col-sm-6 mb-3' id='grandTotal'>
                  <h5>Total : {fh.currenyFormat(grandtotal)}</h5>
                </div>
              </div>
            </div>
          </div>


          <div className='row mb-4 hidden' id='form-submit' >
            <div className='card px-0 shadow-sm '>
              <div className='card-header header-form'>
                <h6><FaFilter /> Payment Data</h6>
              </div>
              <div className='card-body'>
                <form onSubmit={submitProcess} method='post'>
                  <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                      <label className='col-auto'>Bank Name <span className='text-danger'>*</span></label>
                      <select className='form-control' onChange={(e) => setBank(e.target.value)} required>
                        <option value={''}>-- Select Bank --</option>
                        <option value={'000004'}>Mega KPO - [010230011004428]</option>
                        <option value={'000027'}>Mega Syariah Operational - [1000000403]</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                      <label className='col-auto'>Premi Terbayar <span className='text-danger'>*</span></label>

                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">Rp.</div>
                        </div>
                        <input type="text" id='inputSisaBayar' className="form-control" onKeyUp={(e) => { setSisaBayar(e.target.value); fh.inputCurrency($("#inputSisaBayar")); }} onKeyDown={(e) => { setSisaBayar(e.target.value);; fh.inputCurrency($("#inputSisaBayar")); }} required />
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                      <label className='col-auto'>Tanggal Transaksi <span className='text-danger'>*</span></label>
                      <input type="date" style={{ "width": "200px" }} className="form-control" id='tglTransaksi' max={time.now()} onChange={date => setTglTransaksi(date)} requeired />
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                      <button className='btn btn-dark-blue mt-3 text-light'>
                        <FaTelegramPlane /> Submit
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BillingPayment;
