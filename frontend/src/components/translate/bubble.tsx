import "../../styles/bubble.css";

export default function Bubble() {
  return (
    <div>
      <div className="duo-bubble">
        <div className="word-wrapper">
          <span className="duo-word">Yo</span>
          <span className="duo-tooltip">I</span>
        </div>

        <div className="word-wrapper">
          <span className="duo-word">no</span>
          <span className="duo-tooltip">do not</span>
        </div>

        <div className="word-wrapper">
          <span className="duo-word">tengo</span>
          <span className="duo-tooltip">have</span>
        </div>

        <div className="word-wrapper">
          <span className="duo-word">mi</span>
          <span className="duo-tooltip">my</span>
        </div>

        <div className="word-wrapper">
          <span className="duo-word">pasaporte.</span>
          <span className="duo-tooltip">passport</span>
        </div>
      </div>
    </div>
  );
}
