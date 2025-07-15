function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const percentage = (points / maxPoints) * 100;

  let emogis;
  if (percentage === 100) emogis = "🏆";
  if (percentage < 100 && percentage >= 80) emogis = "🥇";
  if (percentage < 80 && percentage >= 50) emogis = "🥉";
  if (percentage < 50 && percentage > 0) emogis = "🥈";
  if (percentage === 0) emogis = "🤦‍♂️";

  return (
    <>
      <p className="result">
        {emogis} You scored {points} out of {maxPoints} ({Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
