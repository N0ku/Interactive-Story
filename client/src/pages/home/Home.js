import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Home.css';


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
        <div className="Home">
            <body>
                <div className="Buttons">
                    <button className="neon-box-1">JOUER</button>
                    <button className="neon-box-1" onClick={() => navigate('/parametres')}>PARAMETRES</button>
                    {connected ?
                    <button className="disconnect-button"  onClick={disconnect}>Déconnexion</button>
                    :
                    <button className="connect-button" onClick={() => navigate('/connexion')}>Connexion</button>
                    }
                </div>
            </body>
        </div>
    )
}
export default Home;
