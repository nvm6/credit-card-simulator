import './App.css';
import React, { useState } from 'react';


function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // This will be used to keep track of the current screen
  const [showResultModal, setShowResultModal] = useState(false); // This will be used to show/hide the result modal
  const [resultMessage, setResultMessage] = useState(''); // This will be used to display the result message

  // This function will be called when the user clicks on the "Start Game" button
  const startGame = () => {
    setCurrentScreen('questionScreen');
  };

  // This function will be called when the user clicks on the "Submit" button
  const showResult = () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked'); // This will get the selected answer

    // If no answer is selected, show an error message
    if (!selectedAnswer) {
      setShowResultModal(true);
      setResultMessage('Please select an answer.');
      return;
    }

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer.id === 'optionC';

    // Show the result modal
    setShowResultModal(true);
    setResultMessage(isCorrect ? 'Your answer is correct!' : 'Sorry, your answer is incorrect.');

    // setCurrentScreen('home');
  };

  // This function will be called when the user clicks on the "Close" button in the result modal
  const closeResultModal = () => {
    setShowResultModal(false);
    // setCurrentScreen('home');
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

  // This function will be called to open the question screen
  const openQuestionScreen = () => (
    <div>
      <h1>Question: You just got your first credit card and deposited $100. Congratulations! What is the first thing you do with this money?</h1> {/* This will display the question */}
      <br />
      <form>
        <label>
          <input type="radio" name="answer" id="optionA" /> {/* This will display the first option */}
          a. Spend it on a new pair of shoes that cost $150 that you have been eyeing for a while.
        </label>
        <br />
        <label>
          <input type="radio" name="answer" id="optionB" /> {/* This will display the second option */}
          b. Put all the money in your savings account and forget about it.
        </label>
        <br />
        <label>
          <input type="radio" name="answer" id="optionC" /> {/* This will display the third option */}
          c. Use the money to pay off your credit card bill.
        </label>
      </form>
      <br />
      <br />
      <button className="button-class" onClick={showResult}>Submit</button> {/* This will display a button to submit the answer */}
    </div>
  );

  // This function will be called to open the result modal
  const openResultScreen = () => (
    <div className="result-modal">
      <div className="result-modal-content">
        <h1>Result Screen</h1>
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