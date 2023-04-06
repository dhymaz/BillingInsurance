import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery'; 
import axios from 'axios';
import { useState, useEffect } from 'react';
import alerts from  './../assets/helper/alerts' 
import { FaPlus } from "react-icons/fa";

function Dashboard() {

  const [lists, setLists] = useState([]);

  useEffect(() => {
    alerts.notification();
    axios.get(process.env.REACT_APP_URL_GET_PRODUCT)
      .then(res => {
          setLists( res.data.products)
          
          $(document).ready(function () {
            $('#example').DataTable();  
          });
          console.log(JSON.parse(sessionStorage.getItem("mySess")));

        })
        .catch( e => console.log(e.message) );
  }, [])


  function confirmation(){
    return alerts.originalConfirm('Are you sure want to delete this data?','testext123');
  }

  return (
    <div className='container'>
      <div className='row'>
      <div className='col-lg-9 '>
        <h3>Dashboard</h3>
      </div>
        <div className='col-lg-3 '>
          <button  className='btn btn-success float-end'>
             <FaPlus />
             Add tambah
          </button>
        </div>
      </div>
      <hr />
      <div className='row'>
          <div className='col-lg-12'>
            <div className='table-responsive-lg'>
              <table className='table' id='example'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title1</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Discount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {   
                      lists.map( (listData, index) => {
                          return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{listData.title}</td>
                                <td>{listData.brand}</td>
                                <td>{listData.category}</td>
                                <td>{listData.discountPercentage}</td>
                                <td style={{'display':'inline-block'}}>
                                  <a href={'/detail/'+listData.id} style={{'marginRight':'10px'}}>
                                    <button className='btn btn-warning'>Detail</button>
                                  </a>
                                  <button  className='btn btn-danger' onClick={confirmation}>Delete</button>
                                </td>
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
  );
}

export default Dashboard;
