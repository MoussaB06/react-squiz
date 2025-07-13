import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Error from "./Error";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],

  // 'loading', 'error','ready','active', 'finished'
  status: "loading",
  index: 0,
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

    default:
      throw new Error("Error a sahbi!");
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const { questions, status } = state;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && (
          <StartScreen dispatch={dispatch} numQuestions={questions.length} />
        )}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}
