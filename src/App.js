import './App.css';
import React, { useState } from 'react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('home'); // Keeps track of the current screen
  const [showResultModal, setShowResultModal] = useState(false); // Show/hide the result modal
  const [isGameOver, setIsGameOver] = useState(false); // Check if the game is over
  const [resultMessage, setResultMessage] = useState(""); // Display the result message
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Kep track of the current question index
  const [selectedOption, setSelectedOption] = useState(''); // Keep track of the selected option

  const optionToIndex = {
    "optionA": 0,
    "optionB": 1,
    "optionC": 2
  };

  // A list of questions for the game with options and correct answers
  const questions = [
    {
      question: "Your credit card has a rewards system! You can earn 2% cashback at gas stations and restaurants, and 1% cashback on all other purchases. As a new credit card owner, you are being offered a dollar-for-dollar cashback match at the end of your first year! You decide to…",
      options: [
        "a. Max out your credit limit each month for the first year. Gotta max out those rewards!",
        "b. Continue using your credit card on one small purchase each month. The cashback is a nice perk, but it wasn’t the main reason you got a credit card.",
        "c. Go out to eat a little more often and use your credit card each time. A little more spending doesn’t hurt."
      ],
      correctAnswer: "optionB",
      reasons: [
        "Maxing out your rewards sounds nice, but maxing your credit limit will negatively impact your credit history!",
        "Think of the bonus cashback rewards as a “thank you” for being a credit card user. It’s important to keep using your credit card responsibly.",
        "If you spend within your means and pay your bill in full on time, you should be okay. Be mindful of any potential bad habits!"
      ]

    },
    {
      question: "You need to start building your credit history, but you worry about not being responsible enough for a credit card. What’s another way you can build credit?",
      options: [
        "a. Ask your parent/guardian to be an authorized user on their credit card. They’re pretty good about using them, too.",
        "b. You don’t need to build your credit history because you’re a CS major. You’re going to make six figures and won’t ever need to borrow money!",
        "c. Your friend offered to make you an authorized user on her credit card, so you bring it up with her again. Sometimes she’s late on her payments but is good with it otherwise."
      ],
      correctAnswer: "optionA",
      reasons: [
        "Being an authorized user means you don’t necessarily need to use a credit card yourself. A responsible parent/guardian can also teach you about best practices for when you get a credit card in the future.",
        "Even if you’re rich, you shouldn’t ignore building your credit history. Without a credit score, how else can you get a loan for your future startup?",
        "You can be an authorized user on your friend’s credit card if you meet other eligibility requirements, but be cautious. Their spending habits can negatively impact your credit now, too."
      ]
    },
    {
      question: "Your credit card’s APR is 18%. What does that mean?",
      options: [
        "a. You pay your credit card bill in full, so you don’t have to worry about that!",
        "b. A credit card is free money. The fine print doesn’t matter.",
        "c. APR stands for Annual Percentage Rate. The percentage is what credit card companies use to determine how much interest you may owe."
      ],
      correctAnswer: "optionC",
      reasons: [
        "Good job! However, you should take some time to learn what APR is and how it works. There might be a time when you can’t pay your full balance for whatever reason.",
        "Credit cards are another type of loan, which is money you borrow. If you believe otherwise, you should reconsider if you’re responsible enough for a credit card.",
        "Understanding what APR is and how it applies to your outstanding balance is part of using a credit card responsibly. As the name implies, interest rates are shown as a yearly rate."
      ]
    },
  ];

  // This function will be called when the user clicks on the "Start Game" button
  const startGame = () => {
    setCurrentQuestionIndex(0);
    setCurrentScreen('questionScreen');
    document.querySelector('.button-class').style.visibility = 'visible';
  };
  
  // This function will be called when the user clicks on the "Start Game" button
  const showResult = () => {
    const selectedAnswer = selectedOption;

    // If no answer is selected, show an error message
    if (!selectedAnswer) {
      setShowResultModal(true);
      setResultMessage("Please select an answer.");
      return;
    }

    // Check if the selected answer is correct
    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;

    // Make the submit button invisible
    document.querySelector('.button-class').style.visibility = 'hidden';

    // Show the result modal
    setShowResultModal(true);

    let index = 0;
    if(selectedAnswer === "optionA"){
      index = 0;
    } else if(selectedAnswer === "optionB"){
      index = 1;
    } else if(selectedAnswer === "optionC"){
      index = 2;
    }

    setResultMessage(questions[currentQuestionIndex].reasons[optionToIndex[selectedAnswer]]);

    if (isCorrect) {
      // Move to the next question if the answer is correct
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

      // Check if there are more questions
      if (currentQuestionIndex < questions.length - 1) {
        // Reset result modal and move to the next question
        setShowResultModal(true);
      } else {
        // If there are no more questions, end the game
        setShowResultModal(true);
        setCurrentScreen('endGameScreen');
      }
    }
  };

  // This function will be called when the user clicks on the "Close" button in the result modal
  const closeResultModal = () => {
    setShowResultModal(false);

    // Make the submit button visible
    document.querySelector('.button-class').style.visibility = 'visible';

    // Check if the game is over
    if (currentQuestionIndex === questions.length) {
      setIsGameOver(true);
      setCurrentScreen('endGameScreen');
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
        <h2>{questions[currentQuestionIndex].question}</h2>
        <br />
        <button className="option-choice" id="optionA" onClick={() => handleOptionClick('optionA')}>
          {questions[currentQuestionIndex].options[0]}
        </button>
        <br />
        <br />
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

  const openEndGameScreen = () => (
    <div>
      <div>
      <h1>Game Over</h1>
      <p>Congratulations! You have completed the game.</p>
      <button className="button-class" onClick={() => setCurrentScreen('home')}>
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
        {showResultModal && !isGameOver && openResultScreen()} {/* Display the result modal if it's not the end game */}
        { currentScreen === 'endGameScreen' && isGameOver && openEndGameScreen()} {/*Display the end game screen if the game is over*/}
      </header>
    </div>
  );
}

export default App; // This will export the App component so that it can be used in other files