import './App.css';
import React, { useState } from 'react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // This will be used to keep track of the current screen
  const [showResultModal, setShowResultModal] = useState(false); // This will be used to show/hide the result modal
  const [resultMessage, setResultMessage] = useState(''); // This will be used to display the result message
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // This will be used to keep track of the current question index
  const [selectedOption, setSelectedOption] = useState(''); // This will be used to keep track of the selected option

  const questions = [
    {
      question: "You just got your first credit card and deposited $100. Congratulations! What is the first thing you do with this money?",
      options: [
        "a. Spend it on a new pair of shoes that cost $150 that you have been eyeing for a while.",
        "b. Put all the money in your savings account and forget about it.",
        "c. Use the money to pay off your credit card bill."
      ],
      correctAnswer: "optionC"
    },
    {
      question: "You just received your credit card statement with a minimum payment due. What should you do?",
      options: [
        "a. Pay the full statement balance to avoid interest charges.",
        "b. Ignore the statement; you'll deal with it later.",
        "c. Pay the minimum amount due to avoid late fees."
      ],
      correctAnswer: "optionA"
    },
    {
      question: "What factor is NOT considered when calculating your credit score?",
      options: [
        "a. Your payment history",
        "b. Your income level",
        "c. The length of your credit history"
      ],
      correctAnswer: "optionB"
    },
  ];

  // This function will be called when the user clicks on the "Start Game" button
  const startGame = () => {
    setCurrentScreen('questionScreen');
  };
  
  // This function will be called when the user clicks on the "Start Game" button
  const showResult = () => {
    const selectedAnswer = selectedOption;

    console.log(selectedAnswer);

    // If no answer is selected, show an error message
    if (!selectedAnswer) {
      setShowResultModal(true);
      setResultMessage('Please select an answer.');
      return;
    }

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;

    // make the submit button invisible
    document.querySelector('.button-class').style.visibility = 'hidden';

    // Show the result modal
    setShowResultModal(true);
    setResultMessage(isCorrect ? 'Your answer is correct!' : 'Sorry, your answer is incorrect.');

    if (isCorrect) {
      // Move to the next question if the answer is correct
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // Check if there are more questions
      if (currentQuestionIndex < questions.length - 1) {
        // Reset result modal and move to the next question
        setShowResultModal(true);
      } else {
        // If there are no more questions, end the game
        setCurrentScreen('home');
      }
    }
  };

  // This function will be called when the user clicks on the "Close" button in the result modal
  const closeResultModal = () => {
    setShowResultModal(false);

    //make the submit button visible
    document.querySelector('.button-class').style.visibility = 'visible';
  
    // Check if the game is over
    if (currentQuestionIndex === questions.length) {
      setCurrentScreen('home');
    }
  };

  // This function will be called to open the home screen
  const openHomeScreen = () => (
    <div>
      <h1>Credit Card Simulator</h1> {/* This will display the title of the game */}
      <h2>This simulator is meant to help young adults with credit card management.</h2> {/* This will display a brief description of the game */}
      <br />
      <br />
      <button className="button-class" onClick={startGame}>Start Game </button> {/* This will display a button to start the game */}
    </div>
  );

  const openQuestionScreen = () => {
    const handleOptionClick = (selectedId) => {
      const options = document.querySelectorAll('.option-choice');
      options.forEach((option) => {
        if (option.id === selectedId) {
          option.style.backgroundColor = 'green';
        } else {
          option.style.backgroundColor = 'white';
        }
      });

      setSelectedOption(selectedId);
    };

    return (
      <div>
        <button className="back-button" onClick={() => setCurrentScreen('home')}>🏠</button>
        <h1>{questions[currentQuestionIndex].question}</h1>
        <br />
        <button className="option-choice" id="optionA" onClick={() => handleOptionClick('optionA')}>
          {questions[currentQuestionIndex].options[0]}
        </button>
        &nbsp;&nbsp;&nbsp;
        <button className="option-choice" id="optionB" onClick={() => handleOptionClick('optionB')}>
          {questions[currentQuestionIndex].options[1]}
        </button>
        <br />
        <br />
        <button className="option-choice" id="optionC" onClick={() => handleOptionClick('optionC')}>
          {questions[currentQuestionIndex].options[2]}
        </button>
        <br />
        <br />
        <button className="button-class" onClick={showResult}>Submit</button>
      </div>
    );
  };



  // This function will be called to open the result modal
  const openResultScreen = () => (
    <div className="result-modal">
      <div className="result-modal-content">
        <h1>Explanation</h1>
        <p>{resultMessage}</p>
        <button className="button-class" onClick={closeResultModal}> {/* This will display a button to close the result modal */}
          Close
        </button>
      </div>
    </div>
  );

  // This will be the main component that will be rendered by the App component
  return (
    <div className="App">
      <header className="App-header">
        {currentScreen === 'home' && openHomeScreen()} {/* This will display the home screen when the currentScreen state is set to 'home' */}
        {currentScreen === 'questionScreen' && openQuestionScreen()} {/* This will display the question screen when the currentScreen state is set to 'questionScreen' */}
        {showResultModal && openResultScreen()} {/* This will display the result modal when the showResultModal state is set to true */}
      </header>
    </div>
  );
}

export default App; // This will export the App component so that it can be used in other files