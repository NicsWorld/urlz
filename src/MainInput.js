import { useState } from "react";

export default function MainInput() {
  const [inputValue, setInputValue] = useState("");
  return (
    <>
      <label htmlFor="url">Enter a url to.....shorten? </label>
      <input
        className="field"
        type="text"
        name="url"
        placeholder="https://www.google.com"
        onChange={(e) => setInputValue(e.target.value)}
        // placeholder="https://www.google.com/search?q=google+cat+in+a+hat+photo&rlz=1C1CHBF_enUS985US985&oq=google+cat+in+a+hat+photo&aqs=chrome..69i57j69i64.6799j0j1&sourceid=chrome&ie=UTF-8"
      />
      <button className="shortenButton" onClick={handleClick}>
        Go
      </button>
    </>
  );
}
