import './../App.css';
import './../assets/css/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import { FaPowerOff, FaUser,FaSignOutAlt,FaCog } from "react-icons/fa";
import {
  selectCount,
  activeMenu,
  increment,
} from './../store/reducers/todoReducer';
import { useDispatch, useSelector} from 'react-redux';


function Header() {
    const menu = sessionStorage.getItem("username") ? ( [
        {
            "menu_title": "G.06 Verification",
            "link_href": "/verification",
            "dropdown" : []
        }, {
            "menu_title": "G.07 Ins.Bill Voucher",
            "link_href": "/voucher",
            "dropdown" : []
        }, {
            "menu_title": "G.08 Ins. Bill Payment",
            "link_href": "/billpay",
            "dropdown" : []
        }, 
        {
          "menu_title": "G.10 Ins. Bill Paid",
          "link_href": "/billpaid",
          "dropdown" : []
        }, {
          "menu_title": "G.11 Ins. Bill Paid Voucher",
          "link_href": "/billpaidvoucher",
          "dropdown" : []
        },
        {
          "menu_title" : "Penutupan Asuransi",
          "link_href" : "#",
          "dropdown" : [
            {
              "menu_title": "G.05 Ins.Closing Billing Confirmation!",
              "link_href": "/BillConfirm",
              "dropdown" : []
            }, 
            {
                "menu_title": "G.06 Verification",
                "link_href": "/verification",
                "dropdown" : []
            }, {
                "menu_title": "G.07 Ins.Bill Voucher",
                "link_href": "/voucher",
                "dropdown" : []
            }, {
                "menu_title": "G.08 Ins. Bill Payment",
                "link_href": "/billpay",
                "dropdown" : []
            }, {
              "menu_title": "G.10 Ins. Bill Paid",
              "link_href": "/billpaid",
              "dropdown" : []
            }, {
              "menu_title": "G.11 Ins. Bill Paid Voucher",
              "link_href": "/billpaidvoucher",
              "dropdown" : []
            }
          ] 
        }
    ] ) :  ([])

    const profile_image = "https://cdn-icons-png.flaticon.com/512/149/149071.png";


    return ( 
      <div className="App">
        <Menus menu={menu} />
      </div>
    );
}

const Menus = (props) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const activeMn = useSelector(activeMenu);
  var countz = count > 0 ? count : localStorage.getItem('count');


  return (
    <div>
      <nav className="navbar navbar-expand-lg shadow-md p-3">
          <div className="container-fluid">

              <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse " id="navbarTogglerDemo01">

                  <h2>Insurance</h2>
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {
                          props.menu.map((e, index) => {
                              if(e.dropdown.length == 0){
                                return (<Li_menu keyUnique={index} title={e.menu_title} link={e.link_href}  />)
                              }else{
                                  return (
                                  <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                      {e.menu_title}  
                                    </a>
                                    <ul className="dropdown-menu textdd"  aria-labelledby="navbarDropdown">
                                      {
                                        e.dropdown.map((d,i)=>{
                                          return (
                                              <li><a href={d.link_href} className="dropdown-item" >{d.menu_title}</a></li>
                                          )
                                        })
                                      }
                                    </ul>
                                  </li>
                                  )
                              }
                          })
                      }
                      
                  </ul>
                    {
                      sessionStorage.getItem("username") == null ?  "" : 
                      <form className="d-flex profiledd">
                        <li className="nav-item dropdown">
                          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={process.env.PUBLIC_URL + '/assets/img/avatar7.jpg'} className="img-thumbnail rounded" alt="img"/> Hai, Dimas S
                          </a>
                          <ul className="dropdown-menu dropdown-menu-end" style={{"marginTop":"15px"}} aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" ><FaUser/>Profile</a></li>
                            <li><a className="dropdown-item" ><FaCog /> Setting</a></li>
                            <li><a className="dropdown-item" data-bs-toggle="modal" href="#exampleModalToggle"><FaSignOutAlt />Logout</a></li>
                          </ul>
                        </li>
                      </form>
                    }

              </div>
          </div>
      </nav>

    
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header header-form">
              <h5 className="modal-title" id="exampleModalToggleLabel2">Confirmation</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure want to Logout ?
            </div>
            <div className="modal-footer">
              <a href='./logout'>
                <button className="btn btn-danger" >Logout</button>
              </a>
              <button className="btn btn-light" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const dropdown_profile = () => {
    return (
      <form className="d-flex profiledd">
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={process.env.PUBLIC_URL + '/assets/img/avatar7.jpg'} className="img-thumbnail rounded" alt="img"/> Hai, Dimas S
          </a>
          <ul className="dropdown-menu dropdown-menu-end" style={{"marginTop":"15px"}} aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" ><FaUser/>Profile</a></li>
            <li><a className="dropdown-item" ><FaCog /> Setting</a></li>
            <li><a className="dropdown-item" data-bs-toggle="modal" href="#exampleModalToggle"><FaSignOutAlt />Logout</a></li>
          </ul>
        </li>
      </form>
    )
}

const Li_menu = (props) => {
    const activation = (e) => {
      alert(console.log(e.target.id));
    }
    var menuSess = localStorage.getItem('menuSess');
    var isActive = (menuSess == props.title) ? "active" : "";
    
    return (
        <li className="nav-item" tabIndex={props.title} key={'li' + props.keyUnique}>
            <a
                className={"nav-link "+  isActive}
                key={'tes' + props.keyUnique}
                tabIndex={'Link' + props.title}
                aria-current="page"
                href={props.link}
                id={'btn_'+props.keyUnique}
                onClick={()=>localStorage.setItem('menuSess',props.title)}
                >{props.title}</a>
        </li>
    );
}

export default Header;
