import FormLogin from "./FormLogin";

const check = () => {
    // const navigate = useNavigate();
    console.log(sessionStorage.getItem("username"));
    if(sessionStorage.getItem("username")==null){
        // sessionStorage.clear();
        // window.location.href='/FormLogin';
    }
}



export default check();
