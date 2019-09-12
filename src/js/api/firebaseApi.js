import { firebases, defaultFirebase, defaultFirebasePrefix } from './config';
import Http from './Http';

const SERVER_TIMESTAMP = { '.sv': 'timestamp' };

export const _parseFirebasekey = (key) => {
  const result = {
    baseURL: defaultFirebase,
  };

  // is creating a new opening
  if (!key) {
    return result;
  }

  const prefix = key.slice(0, 3);
  const firebaseUrl = firebases[prefix];

  if (!firebaseUrl) {
    throw new Error(`Firebase url for prefix not set: ${prefix}`);
  }

  result.baseURL = firebaseUrl;
  result.key = key.substr(3);

  return result;
};

export const _parseSpecialKeys = (key) => {
  switch (key) {
    case 'DefaultOpening':
      return 'GoTLobFELbLcKngC-pONqI';
    // TODO other season
    default:
      return key;
  }
};

const openingsCache = {};

export const _generateUrlWithKey = key => `/openings/-${key}.json`;


export const fetchKey = async (initialKey) => {
  const openingFromCache = openingsCache[initialKey];
  if (openingFromCache) {
    // Raven.captureBreadcrumb({
    //   message: 'Getting intro from cache.',
    //   category: 'info',
    //   data: openingFromCache,
    // });
    return openingFromCache;
  }

  const rawkey = _parseSpecialKeys(initialKey);
  const { baseURL, key } = _parseFirebasekey(rawkey);
  const http = Http(baseURL);

  const url = _generateUrlWithKey(key);

  Raven.captureBreadcrumb({
    message: 'Loading intro from Firebase.',
    category: 'info',
    data: { initialKey },
  });
  const response = await http.get(url);
  const opening = response.data;
  // const opening = {
  //   created: 1528165309973,
  //   texts: {
  //     text0: 'Sean Bean',
  //     text1: 'Mark Addy',
  //     text2: 'Nikolai Coster - Waldau',
  //     text3: 'Michelle Fairley',
  //     text4: 'Lena Headey',
  //     text5: 'Emilia Clarke',
  //     text6: 'Iain Glen',
  //     text7: 'Harry Lloyd\nKit Harington',
  //     text8: 'Sophie Turner\nMaisie Williams\nRichard Madden',
  //     text9: 'Alfie Allen\nIsaac Hempstead Wright\nJack Gleeson\nRory McCann',
  //     text10: 'and\nPeter Dinklage',
  //     text11: 'Nina Gold\nRobert Sterne',
  //     text12: 'Costume Designer\nMichele Clapton',
  //     text13: 'music by\nRamin Djawadi',
  //     text14: 'editor\nOral Norrie Ottey',
  //     text15: 'production designer\nGemma Jackson',
  //     text16: 'director of photography\nAlik Sakharov',
  //     text17: 'co-executive producer\nGeorge r.r. Martin',
  //     text18: 'co-executive producers\nVince Gerardis\nRalph Vicinanza',
  //     text19: 'co-executive producer\nGuymon Casady',
  //     text20: 'co-executive producer\nCarolyn Strauss',
  //     text21: 'producer\nMark Huffam',
  //     text22: 'producer\nFrank Doelger',
  //     text23: 'executive producers\nDavid Benioff\nD.B. Weiss',
  //     text24: 'created by\nDavid Benioff & D.B. Weiss',
  //     text25: 'based on\nA Song Of Ice And Fire\nby george r.r. martin',
  //     text26: 'Game of Thrones',
  //     text27: 'written by\nDavid Benioff & D.B. Weiss',
  //     text28: 'directed by\nTim Van Patten',
  //   },
  // };

  if (!opening) {
    const error = new Error(`Opening not found: ${initialKey}`);
    Raven.captureException(error);
    return opening;
  }
  // Remove created for when the opening is compared to the form it should ignore this property.
  delete opening.created;
  openingsCache[initialKey] = opening;
  return opening;
};


export const saveOpening = async (opening) => {
  const http = Http(defaultFirebase);

  opening.created = SERVER_TIMESTAMP;

  const response = await http.post('/openings.json', opening);
  const key = `${defaultFirebasePrefix}${response.data.name.substr(1)}`;
  return key;
};
