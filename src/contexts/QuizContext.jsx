import { act, createContext, useReducer } from "react";
import Quiz from "../components/Quiz";
import { normalizeQuestions, shuffleAnswers } from "../helpers";

const initialState = {
  currentQuestionIndex: 0,
  questions:[],
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
};

const reducer = (state, action) => {


  switch (action.type) {
    case "NEXT_QUESTION": {
      const showResults =
        state.currentQuestionIndex === state.questions.length - 1;

      const currentQuestionIndex = showResults
        ? state.currentQuestionIndex
        : state.currentQuestionIndex + 1;

      const answers = showResults
        ? []
        : shuffleAnswers(state.questions[currentQuestionIndex]);

      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }
   case "RESTART": {
  return {
    ...initialState,
    questions: state.questions, 
    answers: shuffleAnswers(state.questions[0]), 
  };
}
    case "LOADED_QUESTIONS": {
  const normalizedQuestions = normalizeQuestions(action.payload);

  if (normalizedQuestions.length === 0) {
    return state; // don't change state if invalid data
  }

  return {
    ...state,
    questions: normalizedQuestions,
    answers: shuffleAnswers(normalizedQuestions[0]),
  };
}

    case "SELECT_ANSWER": {
      const correctAnswersCount =
        action.payload ===
        state.questions[state.currentQuestionIndex].correctAnswer
          ? state.correctAnswersCount + 1
          : state.correctAnswersCount;
      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }
    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
 
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
