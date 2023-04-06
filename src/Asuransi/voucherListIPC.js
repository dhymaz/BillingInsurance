import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import alerts from  './../assets/helper/alerts' 
import { useEffect, useState } from 'react';
import ReactPDF from '@react-pdf/renderer';
import headerApiInternal from './../assets/helper/apiHelper'
import x from './../assets/helper/alerts'
import fh from './../assets/helper/formatHelper'
import tesPrint from './printBillingVoucher'

import {
  useParams 
} from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FaSearch, FaFilter,FaPrint } from "react-icons/fa";


function VoucherListIPC(props) {
  const date = new Date();

  const [dataList, setDataList] = useState([]);
  const [dataPrint, setDataPrint] = useState([]);


  useEffect(() => {
    GetApiList();
  }, []);

  const tes = () => {
    return (
      <h2>tess</h2>
    )
  }

  const Print = () => {
    // var url = './tesPrint';
    // var a = window.open( "", 'Print', 'left=200, top=0, width=950, height=500, toolbar=0, resizable=0');
    
    // a.document.write('<html>');
    // a.document.write('<body >');
    // a.document.write('<p align="center"><strong >PT. Mega Finance</strong> <br><p>');
    // a.document.write('<h3 align="center">INSURANCE PAYABLE - BILLED </h3>');
    // a.document.write('<table border=1 width="100%">');
    // a.document.write('<tbody>');
    // a.document.write('<tr>');
    // a.document.write('<td width="300px">Description</td>');
    // a.document.write('<td align="right">Reff</td>');
    // a.document.write('<td>:</td>');
    // a.document.write('<td>201506221</td>');
    // a.document.write('</tr>');
    // a.document.write('<tr>');
    // a.document.write('<td>Self Insurance</td>');
    // a.document.write('<td align="right">Date</td>');
    // a.document.write('<td>:</td>');
    // a.document.write('<td>22-06-2015</td>');
    // a.document.write('</tr>');
    // a.document.write('<tr>');
    // a.document.write('<td>Pengakuan Premi Asuransi Terbayar</td>');
    // a.document.write('<td align="right">Attachment</td>');
    // a.document.write('<td>:</td>');
    // a.document.write('<td>Ins. Payble - Billed List</td>');
    // a.document.write('</tr>');
    // a.document.write('</tbody>');
    // a.document.write('</table>');
    // a.document.write('<p align="center"><strong >Insurance Premium Payable - Billed Journal Entries:</strong> <br><p>');
    // a.document.write('<table border=1 style="width:100%">');
    // a.document.write('<thead>');
    // a.document.write('<th>No</th>');
    // a.document.write('<th>Acc No</th>');
    // a.document.write('<th>Branch</th>');
    // a.document.write('<th>Acc Name</th>');
    // a.document.write('<th>Debet</th>');
    // a.document.write('<th>Credit</th>');
    // a.document.write('</thead>');
    var bodyReq = {
      "is_print": true,
      "type":1,
      "transDate":"20140603",
      "petugas":"KPOTES "
    }

    var data = GetApiList(bodyReq);
    // var totalDebet = 0;
    // var totalKredit = 0;
    // if(dataPrint.length > 0){
    //   dataPrint.map((listPrint,indexPrint)=> {
    //     var accNo = listPrint.AccNo.substring(0,7);
    //     var branch = listPrint.DocNo.substring(0,3);

    //     a.document.write('<tr>');
    //       a.document.write('<td>');
    //       a.document.write(indexPrint+1);
    //       a.document.write('</td>');
    //       a.document.write('<td>');
    //       a.document.write(String(accNo));
    //       a.document.write('</td>');
    //       a.document.write('<td>');
    //       a.document.write(String(branch));
    //       a.document.write('</td>');
    //       a.document.write('<td>');
    //       a.document.write((listPrint.AccName));
    //       a.document.write('</td>');
    //       a.document.write('<td>');
    //       a.document.write(fh.currenyFormat(listPrint.debet));
    //       a.document.write('</td>');
    //       a.document.write('<td>');
    //       a.document.write(fh.currenyFormat(listPrint.credit));
    //       a.document.write('</td>');
    //     a.document.write('</tr>');
    //     totalDebet = parseInt(totalDebet) + parseInt(listPrint.debet);
    //     totalKredit = parseInt(totalKredit) + parseInt(listPrint.credit);
    //   })
    // }
    // a.document.write('<tr>');
    //   a.document.write('<td colspan=4 align="right" >');
    //   a.document.write("<strong style='padding-right:10px'>Total</strong>");
    //   a.document.write('</td>');
    //   a.document.write('<td >');
    //   a.document.write(fh.currenyFormat(totalDebet));
    //   a.document.write('</td>');
    //   a.document.write('<td >');
    //   a.document.write(fh.currenyFormat(totalKredit));
    //   a.document.write('</td>');
    // a.document.write('</tr>');
    // // }
    // a.document.write('</table>');
    // a.document.write('<table width="100%">');
    // a.document.write('<tr>');
    // a.document.write('<td width="183" valign="top" align="center"><b>Accounting</b><br><br><br><br><br><br></td>');
    // a.document.write('<td width="183" valign="top" align="center"><b>Printed By</b><br><br><br><br><br><br></td>');
    // a.document.write('<td width="183" valign="top" align="center"><b>Finance</b><br><br><br><br><br><br></td>');
    // a.document.write('</tr>');
    // a.document.write('</table>');
    // a.document.write('</body></html>');
    // a.document.close();
    // a.print();
  }

  const GetApiList = (bodyData='') => {
    $('#example').DataTable().destroy();
    if( bodyData == '' ){
      var bodyReq = {
          "is_print": false,
          "type":0,
          "transDate":"201503301",
      }
    }else{
      bodyReq = bodyData;
    }
    axios.post(process.env.REACT_APP_IP_INTERNAL_LIST_IPC,
      bodyReq, headerApiInternal)
      .then(res => {
        if (res.data.status_code == "00") {
          if(bodyData==''){
            setDataList(res.data.response);
            console.log(res.data.response);
          }else{
            setDataPrint(res.data.response);
          }
        }
      })
      .catch(e => x.sweetAlert('Opps..',e.message,'OK'));
  }
  
  const currencyFormat = (number = 0) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'IDR' }).format(number)
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
            <h2>Ins. Billing Voucher IPC</h2>
            <small className='text-secondary'>Home &gt; Ins. Billing Voucher &gt; IPC</small>
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
                          <div className='col-md-6 col-sm-12'>
                            <label className='col-auto'>
                              Jenis Asuransi
                            </label>
                            <select className="form-select">
                              <option>Insurance</option>
                              <option>Self Insurance</option>
                            </select>
                          </div>
                          <div className='col-md-6 col-sm-12'>
                            <label className='col-auto'>
                              Pilihan
                            </label>
                            <select className="form-select">
                              <option value="0">Voucher</option>
                              <option value="1">Lampiran Rekap Konsumen</option>
                            </select>
                          </div>
                          <div className='col-md-12 col-sm-12'>
                            <button type="submit" className="btn btn-dark-blue mt-2 text-light" onClick={Print}>
                              <FaPrint />  Print
                            </button>
                          </div>
                        </div>                  
                      </div>
                    </div>  
                   
                  </div>
                </div>
            </div>

            <div className='row'>
              <div class="card shadow-sm ">
                <div class="card-body">
                  <table className='table stripe' id='example'>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Tanggal Voucher</th>
                        <th>Total Debet</th>
                        <th>Total Kredit</th>
                      </tr>
                    </thead>
                    <tbody>
                    {

                        dataList.map((list, index)=>{
                          var no = parseInt(index) + 1;
                          return (  
                            <tr>
                              <td>{no}</td>
                              <td>{list.ClaimDate}</td>
                              <td>{fh.currenyFormat(list.debet)}</td>
                              <td>{fh.currenyFormat(list.credit)}</td>
                            </tr>
                          )
                        })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
             
            </div>

          </div>

        </div> 
    </div>
  );
}

export default VoucherListIPC;
