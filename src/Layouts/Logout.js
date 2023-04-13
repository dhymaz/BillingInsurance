import  { useNavigate  } from 'react-router-dom'
const Logout = () => {
    const navigate = useNavigate();
    if(sessionStorage.getItem("username")!='' || sessionStorage.getItem("username") == undefined){
        sessionStorage.clear();
        window.location.href='/';
    }
}

export default Logout;