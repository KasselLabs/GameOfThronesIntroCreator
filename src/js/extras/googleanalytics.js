window.dataLayer = window.dataLayer || [];
function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}
const gtagKey = 'UA-116931857-7';

if ('production' === process.env.NODE_ENV) {
  gtag('js', new Date());
}

const sendGAPageView = () => {
  if ('production' === process.env.NODE_ENV) {
    gtag('config', gtagKey, {
      page_path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    });
  }
};

export default sendGAPageView;
