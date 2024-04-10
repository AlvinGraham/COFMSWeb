import Swal from 'sweetalert2';

export default function FutureFeature() {
  Swal.fire({
    title: `Unimplemented Future Feature`,
    text: 'This Feature is currently under development',
    icon: 'info',
    color: 'white',
    background: 'black',
    showConfirmButton: true,
    confirmButtonText: 'OK',
    confirmButtonColor: 'green',
  });
  return;
}
