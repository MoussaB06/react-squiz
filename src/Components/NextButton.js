export default function NextButton({ index, dispatch, answer, numQuestions }) {
  if (answer === null) return;
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "finish" });
        }}
      >
        Finish
      </button>
    );
}
