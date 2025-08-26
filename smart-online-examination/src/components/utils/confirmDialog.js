import Swal from 'sweetalert2';

/**
 * Shows a simple confirmation dialog with Yes/No buttons.
 * @param {Function} onConfirm - Function to run if confirmed
 * @param {Object} options - Optional: title, text, etc.
 */
export function showConfirmDialog(onConfirm, options = {}) {
  Swal.fire({
    title: options.title || 'Are you sure?',
    text: options.text || 'Do you want to continue?',
    icon: options.icon || 'question',
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText || 'Yes',
    cancelButtonText: options.cancelButtonText || 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm?.();
    }
  });
}
