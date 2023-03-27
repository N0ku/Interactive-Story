import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {
    const [connected, setConnected] = useState(false);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    console.log(token);

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
            <h1>Home page</h1>
            {connected ?
                <button className="disconnect-button" style={{ backgroundColor: 'white' }} onClick={disconnect}>Déconnexion</button>
                :
                <button className="connect-button" style={{ backgroundColor: 'white' }} onClick={() => navigate('/connexion')}>Connexion</button>
            }
        </div>
    )
}
export default Home;
