const firebaseOpeningEncode = (opening) => {
  const encodedOpening = {};

  encodedOpening.texts = opening.texts.reduce((texts, current, index) => {
    const key = `text${index}`;
    return {
      ...texts,
      [key]: current,
    };
  }, {});

  return encodedOpening;
};

export default firebaseOpeningEncode;
