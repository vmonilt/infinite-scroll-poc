import React, { useState } from "react";
import "./style/style.css";

const Quiz = ({ items }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [lastAnswers, setLastAnswers] = useState([]);

  const handleOptionClick = (option) => {
    // Only allow the user to answer the question once
    if (selectedOption === "") {
      setSelectedOption(option);
      const answers = [...lastAnswers];
      answers[currentQuestion] = option;
      setLastAnswers(answers);
    }
  };

  const handleNextClick = () => {
    // Move to the next question
    if (currentQuestion < items.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(lastAnswers[currentQuestion + 1] || "");
    }
  };

  const handlePrevClick = () => {
    // Move to the previous question
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(lastAnswers[currentQuestion - 1] || "");
    }
  };

  const isOptionCorrect = (option) => {
    // Check if the selected option is the correct answer
    return option === items[currentQuestion].answer;
  };

  return (
    <>
    <div className="quiz-container">
      <div className="progress-quiz">{currentQuestion + 1}/{items.length}</div>
      <div className="question">{items[currentQuestion].question}</div>
      {items[currentQuestion].options.map((option, index) => (
        <div
          key={index}
          className={`option ${
          lastAnswers[currentQuestion] === option
          ? isOptionCorrect(option)
            ? "correct selected"
            : "incorrect selected"
          : ""
        }`}
          onClick={() => handleOptionClick(option)}
          >
          {option}
        </div>
        ))}
      <div className="button-container">
        <button
          className="btn"
          onClick={handlePrevClick}
          disabled={currentQuestion === 0}
          >
          Prev
        </button>
        <button
          className="btn"
          onClick={handleNextClick}
          disabled={currentQuestion === items.length - 1}
          >
          Next
        </button>
      </div>
      {currentQuestion === items.length - 1 && (
        <div className="score">
          You got {lastAnswers.filter((answer, index) => answer === items[index].answer).length} out of {items.length} questions correct!
        </div>
        )}
    </div>
    </>);
};

export default Quiz;
