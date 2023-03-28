import logo from './logo.svg';
import './App.css';
import download from './img/dl.png';

import insta from './img/insta2.png';
import twitter from './img/twitter.png';
import github from './img/git3.png';


function App() {
  return (
    <div className="App">
      <body>

        <div className="Buttons">
          <button class="neon-box-1">JOUER</button>
          <button class="neon-box-1">PARAMETRES</button>
          <button class="neon-box-1">CONNEXION</button>
        </div>
        
        <div className="Button-dl">
           <img className="Logo-dl" src={download} alt="Logo Téléchargement"></img>
        </div>

        <div className="Buttons-social-network">
          <a href="https://trello.com/invite/b/Z5Uj1Wo2/ATTI86f7a114fc65e46f804484c4a18b71a57255ED39/interactive-story" target="_blank" rel="noreferrer"><img className="Logo-twitter" src={twitter} alt="Logo Twitter"></img></a>
          <a href="https://github.com/N0ku/Interactive-Story" target="_blank" rel="noreferrer"><img className="Logo-git" src={github} alt="Logo GitHub"></img></a>
          <a href="https://google.com" target="_blank" rel="noreferrer"><img className="Logo-insta" src={insta} alt="Logo Instagram"></img></a> 
        </div>
      </body>
      
    </div>
  );
}

export default App;
