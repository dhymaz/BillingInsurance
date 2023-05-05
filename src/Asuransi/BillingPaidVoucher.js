import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import alerts from  './../assets/helper/alerts' 
import time from  './../assets/helper/time' 
import { useEffect, useState } from 'react';
import ReactPDF from '@react-pdf/renderer';
import headerApiInternal from './../assets/helper/apiHelper'
import x from './../assets/helper/alerts'
import fh from './../assets/helper/formatHelper'



import {
  useParams 
} from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FaSearch, FaFilter,FaPrint } from "react-icons/fa";


function VoucherList(props) {
  const [dataPrint, setDataPrint] = useState([]);


  useEffect(() => {
    alerts.notification();
    $(document).ready(function () {
      $('#example').DataTable();  
    });
  }, []);

  const GetApiList = async (bodyData='') => {
    return new Promise ( (resolve, reject)=> {
      $('#example').DataTable().destroy();
      if( bodyData == '' ){
        var bodyReq = {
          "transDate":document.querySelector("#tglV").value.split("-").join("")
        }
      }else{
        bodyReq = bodyData;
      }
      axios.post(process.env.REACT_APP_IP_INTERNAL_LIST_IPP,
        bodyReq, headerApiInternal)
        .then(res => {
          if (res.data.status_code == "00") {
            setDataPrint(res.data.response);
            resolve(res.data.response);
          }
        })
        .catch(e => x.sweetAlert('Opps..',e.message,'OK'));
    })
  }

  const voucherPrint = async () => {
    var dataPrint = 'ok';
    var data = await GetApiList();
    if(data.length  > 0){
      var a = window.open( "", 'Print', 'left=200, top=0, width=950, height=500, toolbar=0, resizable=0');
      
      a.document.write('<html>');
      a.document.write('<body >');
      a.document.write('<p align="center"><strong >PT. Mega Finance</strong> <br><p>');
      a.document.write('<h3 align="center">INSURANCE PAYABLE - BILLED </h3>');
      a.document.write('<table border=1 width="100%">');
      a.document.write('<tbody>');
      a.document.write('<tr>');
      a.document.write('<td width="300px">Description</td>');
      a.document.write('<td align="right">Reff</td>');
      a.document.write('<td>:</td>');
      a.document.write('<td>201506221</td>');
      a.document.write('</tr>');
      a.document.write('<tr>');
      a.document.write('<td>Self Insurance</td>');
      a.document.write('<td align="right">Date</td>');
      a.document.write('<td>:</td>');
      a.document.write('<td>22-06-2015</td>');
      a.document.write('</tr>');
      a.document.write('<tr>');
      a.document.write('<td>Pengakuan Premi Asuransi Terbayar</td>');
      a.document.write('<td align="right">Attachment</td>');
      a.document.write('<td>:</td>');
      a.document.write('<td>Ins. Payble - Billed List</td>');
      a.document.write('</tr>');
      a.document.write('</tbody>');
      a.document.write('</table>');
      a.document.write('<p align="center"><strong >Insurance Premium Payable - Billed Journal Entries:</strong> <br><p>');
      a.document.write('<table style="width:100%;border:1px solid black;border-collapse:collapse;" border="1">');
      a.document.write('<thead>');
      a.document.write('<th>No</th>');
      a.document.write('<th>Acc No</th>');
      a.document.write('<th>Branch</th>');
      a.document.write('<th>Acc Name</th>');
      a.document.write('<th>Debet</th>');
      a.document.write('<th>Credit1</th>');
      a.document.write('</thead>');
      a.document.write('<tbody>');
      
      data.map((listPrint,indexPrint)=> {
        var accNo = listPrint.accno;
        var branch = listPrint.DocNo.substring(0,3);

        a.document.write('<tr>');
          a.document.write('<td>');
          a.document.write(indexPrint+1);
          a.document.write('</td>');
          a.document.write('<td>');
          a.document.write(String(accNo));
          a.document.write('</td>');
          a.document.write('<td>');
          a.document.write(String(branch));
          a.document.write('</td>');
          a.document.write('<td>');
          a.document.write((listPrint.AccName));
          a.document.write('</td>');
          a.document.write('<td>');
          a.document.write(fh.currenyFormat(listPrint.debet));
          a.document.write('</td>');
          a.document.write('<td>');
          a.document.write(fh.currenyFormat(listPrint.credit));
          a.document.write('</td>');
        a.document.write('</tr>');
        // totalDebet = parseInt(totalDebet) + parseInt(listPrint.debet);
        // totalKredit = parseInt(totalKredit) + parseInt(listPrint.credit);
      })
      
      a.document.write('</tbody>');
      a.document.write('</table>');
      a.document.write('<table width="100%" style={{marginTop:"100px"}}>');
      a.document.write('<tr>');
      a.document.write('<td width="183" valign="top" align="center"></td>');
      a.document.write('<td width="183" valign="top" align="center"><b>Disetujui Oleh</b><br><br><br><br><br><br></td>');
      a.document.write('<td width="183" valign="top" align="center"></td>');
      a.document.write('</tr>');
      a.document.write('</table>');
      a.document.write('</body></html>');
      a.document.close();
      a.print();
    }
  }

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
                        <input type="date" id="tglV" className='form-control' max={time.now()}/>
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
                            <button type="submit" className="btn btn-dark-blue mt-2 text-light" onClick={voucherPrint}>
                              <FaPrint />  Print
                            </button>
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
