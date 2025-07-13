export default function StartScreen({ numQuestions, dispatch }) {
  function handleClick() {
    dispatch({ type: "dataActive" });
  }
  return (
    <div className="start">
      <h2>Welcome to The react Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleClick}>
        Let's start!
      </button>
    </div>
  );
}
