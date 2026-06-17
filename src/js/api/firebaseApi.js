import {
  firebases,
  defaultFirebase,
  defaultFirebasePrefix,
  introsApiUrl,
} from './config';
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

// In the unified intros store, GoT openings are keyed by the FULL app code
// (`GoT<id>`) — that's how they were migrated, unified onto the render-queue
// rows — so the read uses the code verbatim (no prefix strip / leading dash).
const _fetchFromIntros = async (fullCode) => {
  const response = await Http(introsApiUrl).get(`/openings/${fullCode}.json`);
  return response.data || null; // intros returns literal null (HTTP 200) when absent
};

const _fetchFromFirebase = async (rawkey) => {
  const { baseURL, key } = _parseFirebasekey(rawkey);
  const response = await Http(baseURL).get(_generateUrlWithKey(key));
  return response.data || null;
};

export const fetchKey = async (initialKey) => {
  const openingFromCache = openingsCache[initialKey];
  if (openingFromCache) {
    return openingFromCache;
  }

  const rawkey = _parseSpecialKeys(initialKey);

  Raven.captureBreadcrumb({
    message: 'Loading intro.',
    category: 'info',
    data: { initialKey, source: introsApiUrl ? 'intros' : 'firebase' },
  });

  // Prefer the unified store; fall back to Firebase on miss/error so a not-yet-
  // mirrored opening (or a transient intros failure) still resolves.
  let opening = null;
  if (introsApiUrl) {
    try {
      opening = await _fetchFromIntros(rawkey);
    } catch (error) {
      Raven.captureException(error);
    }
  }
  if (!opening) {
    opening = await _fetchFromFirebase(rawkey);
  }

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

  // Mirror the opening into the unified intros store under the SAME app code,
  // so reads (which prefer intros) stay current during the migration. Firebase
  // remains the id-minter and source of truth until the cutover, so a mirror
  // failure must never break the user's save. intros openings are create-only;
  // it resolves the `.sv` timestamp server-side, same as Firebase.
  if (introsApiUrl) {
    try {
      await Http(introsApiUrl).put(`/openings/${key}.json`, opening);
    } catch (error) {
      Raven.captureException(error);
    }
  }

  return key;
};
