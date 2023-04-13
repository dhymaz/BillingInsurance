import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import { Component} from 'react';

// function FormLogin() {
// document.body.style.overflow = "hidden"

//   return (
//     <div className='App backgrounLogin'>
//         <div className='container'>
//           <div className='row'>
//             <div className='col-lg-5 border position-absolute top-50 start-50 translate-middle card-login shadow p-3 mb-5 bg-body rounded'>
//               <h4>Login</h4>
//               <form>
//                 <div className="mb-3">
//                   <label for="exampleInputEmail1" className="form-label text-grey">Email address</label>
//                   <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
//                 </div>
//                 <div className="mb-3">
//                   <label for="exampleInputPassword1" className="form-label">Password</label>
//                   <input type="password" className="form-control" id="exampleInputPassword1"/>
//                 </div>
//                 <div className="mb-3 row">
//                   <a href={'#'}>Forgot Password</a>
//                 </div>
//                 <button type="submit" className="btn btn-warning">Submit</button>
//               </form> 
//             </div>
//           </div>
//         </div> 
//     </div>
//   );
// }


class Registration extends Component {
  render () {
    return (
      <div className='App backgrounLogin'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-5 border position-absolute top-50 start-50 translate-middle card-login shadow p-3 mb-5 bg-body rounded'>
                <h4>Login</h4>
                <form>
                  <div className="mb-3">
                    <label for="exampleInputRegistration" className="form-label">Fullname</label>
                    <input type="input" className="form-control" id="exampleInputRegistration"/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label text-grey">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputAddress" className="form-label">Password</label>
                    <textarea className="form-control" id="exampleInputAddress"/>
                  </div>
                  <button type="submit" className="btn btn-warning">Submit</button>
                </form> 
              </div>
            </div>
          </div> 
      </div>
    );
  } 
}

export default Registration;
