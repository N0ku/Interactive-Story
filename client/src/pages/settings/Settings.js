import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Settings() {
    const navigate = useNavigate();
    return (
         
        <div className='settings-rules'>               
            <h2 className="settings-title">
                <span className="title-word title-word-1">Commandes </span>
                <span className="title-word title-word-2">De </span>
                <span className="title-word title-word-3">Jeu</span>
            </h2>
            <div className='settings-img'>
                <img src="https://www.stealth-gamer.com/pub/media/catalog/product/cache/eca94b57f8113e61f694498f4c6179b5/j/o/jonny1fr.png" alt="Touches de Jeu"></img>
            </div>
            <div className='settings-touch'>
                <div className='touch-1'>Z = AVANCER,</div>
                <div className='touch-2'>Q = GAUCHE, S = RECULER, D = DROITE,</div>
                <div className='touch-3'>ESPACE = SAUTER  </div> 
                
            </div>
            <button className="neon-box-1" onClick={() => navigate('/')}>RETOUR</button>
        </div>
        
      );
    }
  
export default Settings;