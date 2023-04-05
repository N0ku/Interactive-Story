import sourceVid from "../../assets/abandonne-115473.mp4"
import { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  const [connected, setConnected] = useState(false);
  const token = localStorage.getItem("token");
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
    <div className="home-content">
      <Link className="github-link" to="https://github.com/N0ku/Interactive-Story">GitHub</Link>
      <video autoPlay muted loop>
        <source src={sourceVid} type="video/mp4"/>
      </video>
      <div className="text-content">
      <h1>Interactive <br /> Story</h1>
      <div className="buttons">
        {connected ? (
          <>
            <button  onClick={() => navigate("/game")}>
              JOUER
            </button>
            <button  onClick={disconnect}>
              DECONNEXION
            </button>
          </>
        ) : (
          <>
            <button
              
              onClick={() => navigate("/inscription")}
            >
              INSCRIPTION
            </button>
            <button
              
              onClick={() => navigate("/connexion")}
            >
              CONNEXION
            </button>
          </>
        )}
      </div>
    </div>
      </div>
  );
}
export default Home;
