export default function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + +(answer !== null)} />
      <p>
        Question
        <strong className="sm-margin">
          {index + 1} / {numQuestions}
        </strong>
      </p>
      <p>
        <strong>
          {points} / {maxPoints}
        </strong>
      </p>
    </header>
  );
}
