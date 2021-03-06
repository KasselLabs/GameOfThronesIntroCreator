// import videoSource from '../../../../RecorderAssets/game-of-thrones-1080p.mp4';
// import videoSource from '../../../../RecorderAssets/game-of-thrones-1080p-original.mp4';

export const defaultKey = 'DefaultOpening';

export const errorImageUrl = 'http://giphygifs.s3.amazonaws.com/media/49ACYBjhvSklW/giphy.gif';
export const errorImageAlt = 'A GIF with Catelyn Stark from Game of Thrones screaming in sorrow.';

export const youtubeVideoId = 'vyTd1-VGYdU';
// export const youtubeVideoId = 'wpImt0KILE4'; // got opening with texts
export const themeName = 'Game of Thrones';

export const embeddedVideoSource = 'https://kassellabs.us-east-1.linodeobjects.com/renderer-assets/game-of-thrones/game-of-thrones-1080p.mp4';
// export const embeddedVideoSource = videoSource;

export const firebases = {
  GoT: process.env.FIREBASE_INITIAL,
};

export const defaultFirebase = firebases.GoT;
export const defaultFirebasePrefix = 'GoT';

export const queueApiUrl = process.env.QUEUE_API;

if (!defaultFirebase) {
  throw new Error('Firebase URL can\'t be empty');
}

export const LOGO_INDEX = 26;
export const MAX_CHARACTERS = 150;
export const MAX_LOGO_CHARACTERS = 40;

export const TIME_FACTOR = 1;
export const VIDEO_START_AT = 0;
export const VIDEO_END_AT = 97.73;
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
