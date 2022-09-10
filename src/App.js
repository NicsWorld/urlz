import "./App.scss";
import React, { useEffect, useState } from "react";
import Chance from "chance";
import { ReactComponent as TakenSvg } from "./taken.svg";
import { ReactComponent as FreeSvg } from "./free.svg";
import { ReactComponent as CopySvg } from "./copy3.svg";
import { ReactComponent as InfoSvg } from "./info.svg";
import Modal from "./Modal";

const chance = new Chance();
const CUSTOM_REGEX = /[A-Za-z0-9\-]+/;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [activeControl, setActiveControl] = useState("letters");
  const [lettersValue, setLettersValue] = useState(5);
  const [wordsValue, setWordsValue] = useState(2);
  const [customValue, setCustomValue] = useState("");
  const [demoValue, setDemoValue] = useState("");
  const [customIcon, setCustomIcon] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [showCopied, setShowCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blurClass, setBlurClass] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (showCopied) {
        setShowCopied(false);
      }
    }, 2000);
  }, [showCopied]);

  const testInput = (e) => {
    if (!CUSTOM_REGEX.test(e.key)) {
      e.preventDefault();
    }
  };

  function verifyCustom(custom) {
    if (custom.length) {
      fetch(`http://localhost:8000/custom/verify/${custom}`, {
        method: "GET"
      })
        .then((response) => response.text())
        .then((data) => setIcon(data));
    } else {
      setIcon("taken");
    }
  }

  const setIcon = (string) => {
    if (string === "free") {
      setCustomIcon("free");
    } else {
      setCustomIcon("taken");
    }
  };

  function handleClick() {
    let optionValue;
    if (activeControl === "letters") {
      optionValue = lettersValue;
    }
    if (activeControl === "words") {
      optionValue = wordsValue;
    }
    if (activeControl === "custom") {
      verifyCustom(customValue);
    }
    // prettier-ignore
    const options = {
    "type": activeControl,
    "value": parseInt(optionValue),
    "url": inputValue,
    "customVal": customValue
  };

    fetch(`http://localhost:8000/encode`, {
      method: "POST",
      body: JSON.stringify(options)
    })
      .then((response) => response.text())
      .then((data) => setFinalUrl(`http://localhost:8000/${data}`));
  }

  useEffect(() => {
    if (activeControl === "letters") {
      const demoValueStr = chance.string({
        length: lettersValue,
        pool: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      });
      setDemoValue(demoValueStr);
    }
    if (activeControl === "words") {
      const wordArr = [
        "classic",
        "clean",
        "clear",
        "clever",
        "climbing",
        "close",
        "closing",
        "coherent",
        "comic",
        "gladly",
        "globally",
        "gradually",
        "gratefully",
        "greatly",
        "grossly",
        "happily",
        "hardly",
        "heartily",
        "heavily",
        "hideously",
        "highly",
        "honestly",
        "hopefully",
        "hopelessly",
        "horribly",
        "zebra",
        "alpaca",
        "amoeba",
        "baboon",
        "badger",
        "beagle",
        "bedbug",
        "beetle",
        "bengal",
        "bobcat",
        "caiman",
        "cattle",
        "cicada",
        "collie",
        "condor",
        "cougar",
        "coyote"
      ];
      const stringForDemo = chance.pickset(wordArr, wordsValue);
      const demoValueStr = stringForDemo.join("-");
      setDemoValue(demoValueStr);
    }
    if (activeControl === "custom") {
      setDemoValue(customValue);
      // return `localhost:3000/${customValue}`;
    }
  }, [activeControl, lettersValue, wordsValue, customValue]);

  const handleControlClick = (clickedItem) => {
    const controls = document.getElementsByClassName("control");
    const controlsArr = [...controls];
    const clickedControl = document.getElementById(clickedItem);

    controlsArr.forEach((item) => {
      if (clickedItem != item.id) {
        if (item.classList.contains("active")) {
          item.classList.remove("active");
        }
        item.classList.add("inactive");
      }
    });
    setActiveControl(clickedItem);
    clickedControl.classList.add("active");
    clickedControl.classList.remove("inactive");
  };

  const ControlDemo = React.memo(() => {
    return (
      <>
        <div className="control-demo">
          <label className="control-label">Controls</label>
          <span className="demo">
            <span>ex: </span>localhost:8000/{demoValue}
          </span>
        </div>
      </>
    );
  });

  return (
    <div className="App">
      <header className={"header"}>
        <div
          className="info"
          onClick={() => {
            setBlurClass("blur");
            setIsModalOpen(true);
          }}
        >
          <InfoSvg />
        </div>
        <div className={`group ${blurClass}`}>
          <label htmlFor="url">Enter a url to.....shorten? </label>
          <input
            className="field"
            type="text"
            name="url"
            placeholder="https://www.google.com"
            onChange={(e) => setInputValue(e.target.value)}
            // placeholder="https://www.google.com/search?q=google+cat+in+a+hat+photo&rlz=1C1CHBF_enUS985US985&oq=google+cat+in+a+hat+photo&aqs=chrome..69i57j69i64.6799j0j1&sourceid=chrome&ie=UTF-8"
          />
          <button
            disabled={customIcon === "taken"}
            className="shortenButton"
            onClick={handleClick}
          >
            Go
          </button>
          <ControlDemo />
          <div className="controls">
            <div name="control-options">
              <span
                id="letters"
                onClick={() => handleControlClick("letters")}
                className="control active"
              >
                Letters
              </span>
              <span
                id="words"
                onClick={() => handleControlClick("words")}
                className="control inactive"
              >
                Words
              </span>
              <span
                id="custom"
                onClick={() => handleControlClick("custom")}
                className="control inactive"
              >
                Custom
              </span>
            </div>

            <div className="control-details">
              {activeControl === "letters" && (
                <span>
                  {" "}
                  <input
                    type="range"
                    min={"5"}
                    max={"10"}
                    onChange={(e) => setLettersValue(e.target.value)}
                    value={lettersValue}
                  ></input>
                  <span>{lettersValue}</span>
                </span>
              )}
              {activeControl === "words" && (
                <span>
                  {" "}
                  <input
                    type="range"
                    min={"2"}
                    max={"5"}
                    onChange={(e) => setWordsValue(e.target.value)}
                    value={wordsValue}
                  ></input>
                  <span>{wordsValue}</span>
                </span>
              )}
              {activeControl === "custom" && (
                <span className="customRow">
                  {" "}
                  <input
                    type="text"
                    autoFocus
                    onKeyDown={(e) => testInput(e)}
                    className="customInput"
                    placeholder="my-cool-url"
                    onChange={(e) => {
                      verifyCustom(e.target.value);
                      setCustomValue(e.target.value);
                    }}
                    value={customValue}
                  ></input>
                  {customIcon === "free" && (
                    <span className="free">
                      <FreeSvg />
                    </span>
                  )}
                  {customIcon === "taken" && (
                    <span className="taken">
                      <TakenSvg />
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        {finalUrl.length > 0 && (
          <div className={`finalGroup ${blurClass}`}>
            <input
              className="finalUrl"
              type="text"
              name="url2"
              disabled
              value={finalUrl}
              onChange={() => {}}
            />
            <button
              onClick={() => {
                setShowCopied(true);
                navigator.clipboard.writeText(finalUrl);
              }}
            >
              <CopySvg />
            </button>
            {showCopied && (
              <div className="copied">
                Copied! <FreeSvg />
              </div>
            )}
          </div>
        )}
        {isModalOpen && (
          <Modal
            onClose={() => {
              setBlurClass("");
              setIsModalOpen(false);
            }}
          />
        )}
      </header>
    </div>
  );
}

export default App;
