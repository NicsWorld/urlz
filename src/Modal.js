import bmfinal from "./bmfinal.png";

export default function Modal(props) {
  return (
    <dialog open={true} onClose={() => onClose()}>
      <div className="modalContainer">
        <img className="monster" src={bmfinal} />
        <p className="intro">
          Hi! This app allows you to enter a long url, and make it shorter. Or a
          short url, and make it longer, and a few other things.
        </p>
        <p className="disclaimer">
          This application is an experiment, and should not be relied on for any
          reason whatsoever.{" "}
        </p>

        <p className="disclaimer">
          Every url generated will be automatically deleted every 24 hours, but
          they can, and possibly will be deleted at any time.
        </p>

        <div className="buttonContainer">
          <button onClick={() => props.onClose()}>Okay</button>
        </div>
      </div>
    </dialog>
  );
}
