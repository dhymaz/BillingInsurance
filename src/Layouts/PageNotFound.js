import './../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className='container'>
            <div className='card'>
                <div className='row pt-4 pb-4'>
                    <img
                        className='rounded mx-auto d-block'
                        alt="page not found"
                        src={process.env.PUBLIC_URL + '/assets/img/img_404.jpg'}
                        style={{
                            width: '50%'
                        }}/>
                    <div className='row d-flex justify-content-center'>
                        <button onClick={() => navigate(-1)}
                            className='btn btn-dark-blue btn-md mb-3 mt-3' 
                            style={{
                                width: '200px'
                            }} >
                            <FaRegArrowAltCircleLeft />  
                            <small>&nbsp;Go Back</small>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
