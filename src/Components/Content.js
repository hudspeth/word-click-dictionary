import React, { useState, useEffect, useRef } from "react";
import Tooltip from "./Tooltip";

export default function Content() {
  const paragraphRef = useRef(null);
  const loadingSpinner = useRef(null);
  const currentHighlight = useRef(null);
  const prevHighlight = useRef(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [highlight, setHighlight] = useState(null);
  const [definition, setDefinition] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const paragraph = `Dark Souls, you only need to hear the title for gamers to recoil in fear or become delighted, it’s the marmite of modern games, but what makes it such a masterpiece of the modern age? Is it the franchises infamous difficulty? Is it the obscure, cryptic way of storytelling that the series uses to portray some of the most fascinating lore in RPGs to date? The back to basics roots of its gameplay? Or its fresh take on online play?`;

  let spanArr = [];

  const spanWords = text => {
    return text.replace(/\w+/g, `<span>$&</span>`);
  };

  const reset = () => {
    setIsFetching(false);
    setError(null);
  };

  const highlightText = span => {
    currentHighlight.current = span;
    currentHighlight.current.className = "highlight";
  };

  function handleClose() {
    setAnchorEl(null);
  }

  const popoverAndFetch = (e, text, index) => {
    setAnchorEl(e.currentTarget);
    setHighlight(index);
    highlightText(spanArr[index]);
    fetchDef(text);
  };

  const fetchDef = async text => {
    text = text.toLowerCase();
    setIsFetching(true);
    const result = await fetch(
      `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${text}&lang=en`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          setIsFetching(false);
          return setError(`Request rejected with status ${res.status}`);
        }
      })
      .catch(error => {
        setIsFetching(false);
        return setError(`Request failed because of: ${error.message}`);
      });
    if (!result) return;
    reset();
    setDefinition(result[0]);
  };

  useEffect(() => {
    if (prevHighlight.current) {
      prevHighlight.current.classList.remove("highlight");
    }
    prevHighlight.current = currentHighlight.current;
  }, [highlight, anchorEl]);

  useEffect(() => {
    if (isFetching) {
      loadingSpinner.current.style.display = "inline";
    }
  }, [isFetching]);

  useEffect(() => {
    paragraphRef.current.innerHTML = spanWords(paragraph);
    let spans = paragraphRef.current.getElementsByTagName("span");
    spanArr = spans;
    spans = Object.values(spans);
    spans.forEach((span, index) => {
      span.addEventListener("click", e =>
        popoverAndFetch(e, span.innerText, index)
      );
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div id="text-content" ref={paragraphRef} />
      </div>

      {(definition || error) && !isFetching ? (
        <Tooltip
          anchorEl={anchorEl}
          handleClose={handleClose}
          definition={definition}
          error={error}
        />
      ) : null}
      {isFetching ? <div ref={loadingSpinner} id="cover-spin" /> : null}
    </div>
  );
}
