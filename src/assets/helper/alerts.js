import Swal from 'sweetalert2'
import { NotificationManager} from 'react-notifications';

const alerts  =  {
    originalAlert : (text) => {
        alert('worked!');
    },
    sweetAlert : (title = 'error' , text = 'your sweet alert is error', confirmButton = 'cool',icon = 'error') => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: confirmButton
        })
    },
    notification : (text) => {
        NotificationManager.info(text);
    },
    originalConfirm : (text = 'this is default text from helper, you can customize!', url = 'please-set-url') => {
        var confirm = window.confirm(text);
        if(confirm){
            window.location.href = url;
        }else{
            return false;
        }
    }
} 

export default alerts;

