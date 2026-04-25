import DOMPurify from 'dompurify';
import Swal from './swal';
import { errorImageUrl, errorImageAlt } from '../api/config';

const sanitizeHTML = text => DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });

const showErrorAlert = ({ text, ...config }) => (
  Swal({
    titleText: 'ERROR',
    showCancelButton: true,
    cancelButtonText: 'OK',
    cancelButtonAriaLabel: 'OK',
    confirmButtonText: 'HOME PAGE',
    confirmButtonAriaLabel: 'HOME PAGE',
    imageUrl: errorImageUrl,
    imageAlt: errorImageAlt,
    html: `${sanitizeHTML(text)} <br/> Sorry for the inconvenience! We have been notified.`,
    ...config,
  }).then((result) => {
    if (result.value) {
      window.location.href = '/';
    }
    return result;
  })
);

export default showErrorAlert;
