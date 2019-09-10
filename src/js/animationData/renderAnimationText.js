import React from 'react';

const isLetter = char => /[a-z]/i.test(char);

const isUpperCase = char => char.toUpperCase() === char && isLetter(char);

const isLowerCase = char => char.toLowerCase() === char && isLetter(char);

const wordHasUpperCase = word => word.split('').some(char => isUpperCase(char));

const renderWordPart = (wordPart, key, className) => (
  <span key={key} className={className}>{wordPart}</span>
);

const isSameCase = (a, b) =>
  (isUpperCase(a) && isUpperCase(b))
  || (isLowerCase(a) && isLowerCase(b))
  || !isLetter(a) || !isLetter(b);

const renderLogoWord = (word, index, array) => {
  const arrayLength = array.length;
  const { length } = word;

  const isFirstWord = 0 === index;
  const isLastWord = index === arrayLength - 1;
  const isWordLengthGreaterThan3 = length > 3;
  const hasUpperCase = wordHasUpperCase(word);
  const isSingleChar = 1 === length;

  if (
    !(isWordLengthGreaterThan3
      || hasUpperCase
      || isFirstWord
      || isLastWord)
  ) {
    return renderWordPart(word, `sw${index}`, 'small-text');
  }

  if (!hasUpperCase) {
    return renderWordPart(word, `rw${index}`, 'rest-of-word');
  }

  if (hasUpperCase && isSingleChar) {
    return renderWordPart(word, `cw${index}`, 'capitalize');
  }

  const UPPERCASE = 1;
  const LOWERCASE = 2;
  const firstCharIsUpperCase = isUpperCase(word[0]);

  let findingType = firstCharIsUpperCase ? UPPERCASE : LOWERCASE;
  let lastBreakCharAt = 0;
  let wordParts = [];
  const lastChar = word[length - 1];
  const isLastCharsSameCase = isSameCase(word[isSingleChar ? 0 : length - 2], lastChar);
  for (let i = 1; i < length; i += 1) {
    const char = word[i];
    const isLastChar = i === length - 1;
    const isFindingUpper = findingType === UPPERCASE;
    const isFindingLower = findingType === LOWERCASE;

    const matchUpper = findingType === UPPERCASE && isUpperCase(char);
    const matchLower = findingType === LOWERCASE && isLowerCase(char);

    if ((matchUpper || matchLower) && !isLastChar) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const breakAt = isLastChar && isLastCharsSameCase ? i + 1 : i;
    const wordPart = word.slice(lastBreakCharAt, breakAt);

    let wordRendered = null;
    if (isFindingUpper) {
      wordRendered = renderWordPart(wordPart, `wpc${index}-${i}`, 'capitalize');
      findingType = LOWERCASE;
    }

    if (isFindingLower) {
      wordRendered = renderWordPart(wordPart, `wpr${index}-${i}`, 'rest-of-word');
      findingType = UPPERCASE;
    }
    lastBreakCharAt = i;
    wordParts = wordParts.concat(wordRendered);
  }

  if (!isLastCharsSameCase) {
    let wordRendered = null;
    if (isUpperCase(lastChar)) {
      wordRendered = renderWordPart(lastChar, `wpc${index}l`, 'capitalize');
      findingType = LOWERCASE;
    }

    if (isLowerCase(lastChar)) {
      wordRendered = renderWordPart(lastChar, `wpr${index}l`, 'rest-of-word');
      findingType = UPPERCASE;
    }
    wordParts = wordParts.concat(wordRendered);
  }

  return wordParts;
};

export const renderLogoText = (text = '') => {
  let textParts = [];
  const words = text.split(' ');
  for (let i = 0; i < words.length; i += 1) {
    const wordRendered = renderLogoWord(words[i], i, words);
    textParts = textParts.concat(wordRendered);
    const isNotLastWord = i !== words.length - 1;

    if (isNotLastWord) {
      textParts = textParts.concat(renderWordPart(' ', `s${i}`));
    }
  }
  const minFontSize = 1.7;
  const fontSizeByLength = 2.5 - (0.08 * (text.length - 15));
  const fontSizeMinOrCalculated = fontSizeByLength > minFontSize
    ? fontSizeByLength : minFontSize;

  return (
    <div className="rendered-logo" style={{ fontSize: `${fontSizeMinOrCalculated}em` }}>
      {textParts}
    </div>
  );
};

const renderAnimationText = (text, index) => {
  if (26 !== index) {
    return (
      <div>
        {text}
      </div>
    );
  }
  return renderLogoText(text);
};

export default renderAnimationText;
