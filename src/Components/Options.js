export default function Options({ question }) {
  return (
    <div className="options">
      {question.options.map((option, i) => (
        <button className="btn btn-option" key={i}>
          {option}
        </button>
      ))}
    </div>
  );
}
