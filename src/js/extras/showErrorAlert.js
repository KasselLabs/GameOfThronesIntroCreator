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
    confirmButtonText: 'REPORT',
    confirmButtonAriaLabel: 'REPORT',
    imageUrl: errorImageUrl,
    imageAlt: errorImageAlt,
    html: `${sanitizeHTML(text)} <br/> Sorry for the inconvience! We have been notified,
 but you can click on the button below to fill out a report with more information.`,
    ...config,
  }).then((result) => {
    if (result.value) {
      Raven.lastEventId();
      Raven.showReportDialog();
    }
    return result;
  })
);

export default showErrorAlert;
