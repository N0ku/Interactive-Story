import axios from 'axios';
import logo from './logo.svg';
import './App.css';


function App() {

  axios.get('http://localhost:5050/users')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  /*   axios.post('http://localhost:5050/users', {
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'password123'
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      }); */

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;