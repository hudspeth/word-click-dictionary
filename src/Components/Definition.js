import React from "react";

export default function Definition(props) {
  const { meaning, phonetic, word } = props.definition;

  const getMeanings = meaning => {
    let meanings = [];
    for (let key in meaning) {
      meanings.push(
        <div className="part-of-speech" key={key}>
          Part of Speech [{key}]:
        </div>
      );
      meaning[key].forEach((item, index) => {
        meanings.push(
          <span key={item.definition + index}>
            <div className="definition">Definition: {item.definition}</div>
            {item.example ? (
              <span>
                <div className="example">Example: {item.example}</div>
                <hr />
              </span>
            ) : null}
          </span>
        );
      });
    }
    return meanings;
  };

  return (
    <div>
      <div>{word}</div>
      <div>{phonetic}</div>
      <div>{getMeanings(meaning)}</div>
    </div>
  );
}
