import './../App.css';
import {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "datatables.net-dt/js/dataTables.dataTables"
import 'bootstrap/dist/js/bootstrap.js';
import * as Validator from 'validatorjs';
import './../assets/helper/alerts';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
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
        if (sessionStorage.getItem("username") == '' || sessionStorage.getItem("username") != undefined) {
            window.location.href = '/dashboard';
            console.log('ini dulu');
            // console.log('atau ini dulu');
        }
    }, []);

    const HandleSubmit = (event) => {
        event.preventDefault();
        const rules = {
            username: 'email|required',
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
                    sessionStorage.clear();
                    console.log(JSON.stringify(response.data));
                    sessionStorage.setItem("username", response.data.username);
                    window.location.href = '/';
                    // console.log(sessionStorage.getItem("mySess"));
                })
                .catch((error) => {
                    NotificationManager.error('Username and Password not match');
                    console.log(error)
                });

        }

    }

    return (
        <div className='App backgrounLogin'>
            <NotificationContainer/>
            <div className='container'>
                <div className='row'>
                    <div
                        className='col-lg-5 border position-absolute top-50 start-50 translate-middle card-login shadow p-3 mb-5 bg-body rounded'>
                        <h4>Login</h4>
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
                            <button type="submit" className="btn btn-warning">Submit</button>
                        </form>
                        <button
                        aria-label="Decrement value"
                        onClick={() => dispatch(decrement())}
                        >
                        -
                        </button>
                        <span >{count}</span>
                        <button
                        aria-label="Increment value"
                        onClick={() => dispatch(increment())}
                        >+</button>
                        <button className='btn btn-sm-info3' onClick={()=>dispatch(alertz())}>alert</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormLogin;
