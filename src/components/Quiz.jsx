import { useContext, useEffect } from "react";
import Question from "./Questions";
import { QuizContext } from "../contexts/QuizContext";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  const apiURL =
    "https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986";

  useEffect(() => {

    if(quizState.questions.length>0)
    {
      return ;
    }
    console.log("on Initialize");
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        dispatch({type:"LOADED_QUESTIONS",payload:data.results});
      });
  }, []);

  return (
    <div className="quiz">
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congrats</div>
          <div className="results-info"></div>
          <div>You have completed the Quiz</div>
          <div>
            You've got {quizState.correctAnswersCount} of{" "}
            {quizState.questions.length}
          </div>
          <div
            className="next-button"
            onClick={() => dispatch({ type: "RESTART" })}
          >
            Restart
          </div>
        </div>
      )}

      {!quizState.showResults && quizState.questions.length > 0 && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          <div
            className="next-button"
            onClick={() => dispatch({ type: "NEXT_QUESTION" })}
          >
            Next Question
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
