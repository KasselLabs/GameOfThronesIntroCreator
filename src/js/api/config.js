export const defaultKey = 'DefaultOpening';

export const errorImageUrl = 'http://giphygifs.s3.amazonaws.com/media/49ACYBjhvSklW/giphy.gif';
export const errorImageAlt = 'A GIF with Catelyn Stark from Game of Thrones screaming in sorrow.';

export const youtubeVideoId = '6mqHIN6Xf7k';
// export const youtubeVideoId = 'wpImt0KILE4'; // got opening with texts

export const firebases = {
  GoT: process.env.FIREBASE_INITIAL,
};

export const defaultFirebase = firebases.GoT;
export const defaultFirebasePrefix = 'GoT';

export const queueApiUrl = process.env.QUEUE_API;
console.log(queueApiUrl, process.env);

if (!defaultFirebase) {
  throw new Error('Firebase URL can\'t be empty');
}

export const TIME_FACTOR = 1;
export const START_AT = 0;
export const ANIMATION_START_DELAY = 0;

export const { APPLICATION_MODE } = process.env;

export const MODES = {
  DEFAULT: 'default', // youtube video
  LOCAL: 'local', // local video file with clappr player
  RENDERER: 'renderer', // no video, use fake player to play animation
};

export const IS_DEFAULT_MODE = MODES.DEFAULT === APPLICATION_MODE;
export const IS_LOCAL_MODE = MODES.LOCAL === APPLICATION_MODE;
export const IS_RENDERER_MODE = MODES.RENDERER === APPLICATION_MODE;

if (IS_DEFAULT_MODE && !queueApiUrl) {
  throw new Error('Queue API URL can\'t be empty');
}

if (!IS_DEFAULT_MODE) {
  console.log('Application mode loaded: ', APPLICATION_MODE);
}

export const paymentPageUrl = process.env.PAYMENT_PAGE_URL;
