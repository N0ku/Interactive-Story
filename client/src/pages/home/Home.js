import download from './../../assets/img/dl.png';

import insta from './../../assets/img/insta2.png';
import twitter from './../../assets/img/twitter.png';
import github from './../../assets/img/git3.png';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import './Home.scss'

function Home() {
    const [connected, setConnected] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            setConnected(true);
        }
    }, [token]);

    function disconnect() {
        setConnected(false);
        localStorage.clear();
    }

    return (
        <div>

            <div className="Buttons">
                <button className="neon-box-1" onClick={() => navigate('/game')}>JOUER</button>
                <button className="neon-box-1">PARAMETRES</button>
                {connected ?
                    <button className="neon-box-1" onClick={disconnect}>DECONNEXION</button>
                    :
                    <button className="neon-box-1" onClick={() => navigate('/connexion')}>CONNEXION</button>
                }
            </div>

            <div className="Button-dl">
                <img className="Logo-dl" src={download} alt="Logo Téléchargement"></img>
            </div>

            <div className="Buttons-social-network">
                <a href="https://trello.com/invite/b/Z5Uj1Wo2/ATTI86f7a114fc65e46f804484c4a18b71a57255ED39/interactive-story" target="_blank" rel="noreferrer"><img className="Logo-twitter" src={twitter} alt="Logo Twitter"></img></a>
                <a href="https://github.com/N0ku/Interactive-Story" target="_blank" rel="noreferrer"><img className="Logo-git" src={github} alt="Logo GitHub"></img></a>
                <a href="https://google.com" target="_blank" rel="noreferrer"><img className="Logo-insta" src={insta} alt="Logo Instagram"></img></a>
            </div>

        </div>
    )
}
export default Home;
