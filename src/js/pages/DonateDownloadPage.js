import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import Loader from '../download/Loader';
import { paymentPageUrl } from '../api/config';
import DownloadPageContainer from '../download/DownloadPageContainer';
import ContactButton from '../common/ContactButton';
import TermsOfServiceAcceptance from '../common/TermsOfServiceAcceptance';
import EmailRequestField from '../download/EmailRequestField';
import DonationOptions from '../DonationOptions';

const DonateDownloadPage = ({ match }) => {
  const { params } = match;
  const { openingKey } = params;
  const iframeRef = useRef(null);

  const updatePaymentAmount = useCallback((amount) => {
    if (!iframeRef.current) {
      return;
    }

    iframeRef.current.contentWindow.postMessage({ action: 'setAmount', payload: amount }, '*');
  }, []);

  return (
    <DownloadPageContainer title="DONATE AND DOWNLOAD">
      <p>
        Great choice! You can donate the amount for the following options:
      </p>
      <DonationOptions
        updatePaymentAmount={updatePaymentAmount}
      />
      <div className="compose-iframe">
        <div className="center center-content">
          <Loader />
        </div>
        <iframe
          ref={iframeRef}
          className="stripe"
          id="stripeDonateIframe"
          title="Stripe Payment Form"
          src={`${paymentPageUrl}?embed=true&app=game-of-thrones&code=${openingKey}&amount=2000`}
          allowpaymentrequest="true"
        />
      </div>
      <p>
        You will receive the confirmation and the video
        on the email you put in the form above.
        Please, confirm your email below.
      </p>
      <ContactButton />
      <TermsOfServiceAcceptance />
      <EmailRequestField donate />
    </DownloadPageContainer>
  );
};

DonateDownloadPage.propTypes = {
  match: PropTypes.object,
};

export default DonateDownloadPage;
