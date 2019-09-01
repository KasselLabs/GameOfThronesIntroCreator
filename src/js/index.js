import bowser from 'bowser';

import '../styles/index.styl';
import { documentReady } from './extras/utils';
import renderApp from './renderApp';
import './extras/googleanalytics';
import Swal from './extras/swal';

window.appName = 'game-of-thrones';

(function _() {
  if ('development' === process.env.NODE_ENV) {
    _startApplication();
    return;
  }

  Raven.config(process.env.RAVEN).install();
  Raven.context(() => {
    _startApplication();
  });
}());

function _startApplication() {
  documentReady(() => {
    renderApp();
  });

  window.onresize = () => {
    renderApp();
  };
}

const browser = bowser.getParser(window.navigator.userAgent);

const iosLocalStorageKey = `${window.appName}-IOSModal`;
const alreadyShow = localStorage.getItem(iosLocalStorageKey);

if (browser.is('ios') && !alreadyShow) {
  Swal('IOS DEVICE', `This Website may not work properly on iOS devices, the texts on the video may not be shown.
    For better experience try it on a desktop computer or another device.
    Sorry for the inconvenience. We are trying to fix it soon.
  `);
  localStorage.setItem(iosLocalStorageKey, 'showed');
}
