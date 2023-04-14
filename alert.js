
import {Toast, ToastModel} from '@syncfusion/ej2-notifications';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let toasts: ToastModel[] = [
  { title: 'Warning !', content: 'There was a problem with your network connection.', cssClass: 'e-toast-warning' },
  { title: 'Success !', content: 'Your message has been sent successfully.', cssClass: 'e-toast-success'},
  { title: 'Error !', content: 'A problem has been occurred while submitting your data.', cssClass: 'e-toast-danger' },
  { title: 'Information !', content: 'Please read the comments carefully.', cssClass: 'e-toast-info' }
];
let toastFlag: number = 0;
let toast: Toast = new Toast({
    position: { X: 'Right', Y: 'Bottom' }
});
toast.appendTo('#element');
toast.show(toasts[toastFlag]);
++toastFlag;

document.getElementById('show_toast').onclick = () => {
  toast.show(toasts[toastFlag]);
  ++toastFlag;
  if (toastFlag === (toasts.length)) {
      toastFlag = 0;
  }
}
