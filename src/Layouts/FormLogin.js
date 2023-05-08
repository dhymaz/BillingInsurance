import './../App.css';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import * as Validator from 'validatorjs';
import './../assets/helper/alerts';
import CheckAuth from './CheckAuth';
import 'react-notifications/lib/notifications.css';
import Logout from './Logout';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { FaTelegramPlane } from "react-icons/fa";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import x from './../assets/helper/alerts'
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  alertz
} from './../store/reducers/todoReducer';

function FormLogin() {
    document.body.style.overflow = "hidden"
    var [username, inputUsername] = useState('');
    var [password, inputPassword] = useState('');
    var [data, setData] = useState([]);
    var inputName;
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    

    useEffect(() => {
        // console.log(sessionStorage.getItem("username"));
        if (sessionStorage.getItem("username") != null || sessionStorage.getItem("username") ==='' ) {
            console.log('ini dulu');
            localStorage.setItem("menuSess", "G.06 Verification");
            window.location.href = '/verification';
        }
        // <CheckAuth />
    }, []);

    const HandleSubmit = (event) => {
        event.preventDefault();
        const rules = {
            username: 'required',
            password: 'required'
        }

        var dataInput = {
            username: username,
            password: password
        }

        let validation = new Validator(dataInput, rules);

        validation.passes(); // true
        validation.fails(); // false

        if (validation.errors.get('username') != '') {
            inputName = 'username';
            NotificationManager.error(validation.errors.get(inputName));
        } else if (validation.errors.get('password') != '') {
            inputName = 'password';
            NotificationManager.error(validation.errors.get(inputName));
        } else {
            // console.log(process.env.REACT_APP_URL_LOGIN);
            const headers = {
                'Content-Type': 'application/json'
            }

            const data = {
                username: 'kminchelle',
                password: '0lelplR'
            }

            axios
                .post(process.env.REACT_APP_URL_LOGIN, data, {headers: headers})
                .then((response) => {
                    if("admin" === dataInput.username){
                        sessionStorage.clear();
                        console.log(JSON.stringify(response.data));
                        sessionStorage.setItem("username", response.data.username);
                        localStorage.setItem("menuSess", "G.06 Verification");
                        window.location.href = '/verification';
                        // console.log(sessionStorage.getItem("mySess"));
                    }else{
                        x.sweetAlert('Opps..Login gagal',"Silahkan cek username dan password anda!",'OK');
                    }
                })
                .catch((error) => {
                    NotificationManager.error('Username and Password not match');
                    console.log(error)
                });
        }

    }

    return (
        sessionStorage.getItem("username") != null ? "" :  
        <div className='App backgrounLogin'>
            <NotificationContainer/>
            <div className='container'>
                <div className='row'>
                    <div
                        className='col-lg-7 border position-absolute top-50 start-50 translate-middle card-login shadow p-3 mb-5 bg-body rounded'>
                        <div className='row'>
                            <h3 className='text-primary'>Insurance</h3>
                        </div>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <div className='d-flex justify-content-center'>
                                    <img src={process.env.PUBLIC_URL + '/assets/img/login.jpg'} className="img-login rounded" alt="img"/>
                                </div>
                            </div>
                            <div className='col-lg-8 col-sm-12'>
                                <form id='form-login' onSubmit={HandleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-grey">Email address</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            onChange={event => inputUsername(event.target.value)}/>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            onChange={event => inputPassword(event.target.value)}/>
                                    </div>
                                    <div className="mb-3 row">
                                        <a href={'#'}>Forgot Password</a>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                    <FaTelegramPlane /> Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default FormLogin;
