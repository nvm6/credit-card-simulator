import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h1> Credit Card Simulator</h1>
        <h2> This simulator is meant to help young adults with credit card management.</h2>

        <div>
          <label for="username">Username: </label>
          <input type="text" id="username" name="username" className="logInBox" ></input>
        </div>

        <br></br>

        <div>
          <label for="password" >Password: </label>
          <input type="text" id="password" name="password" className="logInBox"></input>
        </div>

        <br></br>
        <br></br>

        <button type="submit" className="logInButton">Log In</button>


      </header>
    </div>
  );
}

export default App;
