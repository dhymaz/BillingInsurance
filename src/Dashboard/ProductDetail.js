import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import { useEffect, useState } from 'react';
import {
  useParams 
} from "react-router-dom";
import axios from 'axios';

function ProductDetail(props) {
  var [dataService, entryDataService] = useState([]);
  let { id } = useParams();
  
  useEffect(()=> {
    // setCount(100);
    axios.get('https://dummyjson.com/products/'+id)
    .then( res => {
        entryDataService(res.data);
        console.log(res.data)
      })
      .catch(err => console.log(err))
  },[]);
  
  return (
    <div className='App'>
        <div className='container'>
          <div className='row'>
            <h2>{dataService.title}</h2>
            <small>{dataService.description}</small>
          </div>
          <div className='row'>
            <img src={dataService.thumbnail}/>
          </div>
        </div> 
    </div>
  );
}

export default ProductDetail;
