import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";

const initialState = {
  questions: [],
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,

  // 'loading', 'error','ready','active', 'finished'
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "dataActive":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
      };

    case "highscoreUpdate":
      return { ...state, highscore: action.payload };

    case "restart":
      return {
        ...state,
        index: 0,
        answer: null,
        points: 0,
        highscore: 0,
        questions: action.payload,
        status: "ready",
      };

    default:
      throw new Error("Error a sahbi!");
  }
}

export default function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  useEffect(() => {
    if (status === "finished" && points > highscore)
      dispatch({ type: "highscoreUpdate", payload: points });
  }, [status, points, highscore]);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={questions.length}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
            questions={questions}
          />
        )}
      </Main>
    </div>
  );
}
