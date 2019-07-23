import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

const MySwal = Swal.mixin({
  customClass: 'kassel-app-sweetalert',
});

export default MySwal;
