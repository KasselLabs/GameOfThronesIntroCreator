import React from 'react';

const renderLogoWord = (word, index, array) => {
  const arrayLength = array.length;
  const { length } = word;

  const isFirstWord = 0 === index;
  const isLastWord = index === arrayLength - 1;
  const isWordLengthGreaterThan3 = length > 3;
  const shouldCaptilizeWord = isFirstWord || isLastWord || isWordLengthGreaterThan3;
  if (shouldCaptilizeWord) {
    const capital = word[0];
    const restOfWord = word.slice(1);
    return [
      (
        <span key={`0${index}`} className="capitilize">{capital}</span>
      ),
      (
        <span key={`1${index}`} className="rest-of-word">{restOfWord}</span>
      ),
    ];
  }

  // if (!isWordLengthGreaterThan3) {
  return (
    <span key={`2${index}`} className="small-text">{word}</span>
  );
};

export const renderLogoText = (text) => {
  let textParts = [];
  const words = text.split(' ');
  for (let i = 0; i < words.length; i += 1) {
    const wordRendered = renderLogoWord(words[i], i, words);
    textParts = textParts.concat(wordRendered);
    const isNotLastWord = i !== words.length - 1;

    if (isNotLastWord) {
      textParts = textParts.concat(<span key={`s${i}`}>{' '}</span>);
    }
  }

  const fontSize = 2.5 - (0.08 * (text.length - 15));

  return (
    <div className="rendered-logo" style={{ fontSize: `${fontSize}em` }}>
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
