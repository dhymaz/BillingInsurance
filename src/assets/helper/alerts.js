import Swal from 'sweetalert2';
import { NotificationManager} from 'react-notifications';

const alerts  =  {
    originalAlert : (text) => {
        alert('worked!');
    },
    sweetAlert : (title = 'error' , text = 'your sweet alert is error', confirmButton = 'cool',icon = 'error',isTrue = true) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            confirmButtonText: confirmButton,
            showConfirmButton : isTrue,
            allowOutsideClick: isTrue,
            allowEscapeKey: isTrue
        })
    },
    notification : (text,classType = 'info') => {
        // NotificationManager.info(text);
        switch (classType) {
            case 'success':
              NotificationManager.success(text, 'Success', 3000);
              break;
            case 'warning':
              NotificationManager.warning(text, 'Warning', 3000);
              break;
            case 'error':
              NotificationManager.error(text, 'Error', 3000);
                break;
            default :   
                NotificationManager.info(text,'Info',3000,'',true);
        }
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

