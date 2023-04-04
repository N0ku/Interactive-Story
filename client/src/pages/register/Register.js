import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
       toast.error("Merci de remplir tous les champs !!");
      return;
    }

    if (!email.match(validRegex)) {
       toast.error("Merci de saisir une adresse mail valide.");
      return;
    }
    
    if (password.length < 6) {
       toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
       toast.error("Les deux mots de passe ne sont pas identiques.");
      return;
    }

    const newUser = {
      email,
      username,
      password,
    };

    try {
      await axios.post("http://localhost:5050/users", newUser);
      toast.success("Votre compte a été créé avec succès !");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      navigate("/inscription");
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Email already exists") {
          toast.error("Ce mail existe déjà !");
        } else if (errorMessage === "Username already exists") {
          toast.error("Cet username est déjà pris !");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
            Inscription
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                type="mail"
                id="email"
                className="w-full max-w-md p-2 my-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Entrez votre adresse mail.."
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="pseudo"
                className="block text-sm font-semibold text-gray-800"
              >
                Pseudo
              </label>
              <input
                type="text"
                id="username"
                className="w-full max-w-md p-2 my-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Entrez votre pseudo.."
                value={username}
                onChange={handleUsernameChange}
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                className="w-full max-w-md p-2 my-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Entrez votre mot de passe.."
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="confirmpassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirmation mot de passe
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full max-w-md p-2 my-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Confirmer votre mot de passe.."
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Enregistrer
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p>
              Déjà un compte ? Se connecter{" "}
              <Link style={{ color: "blue" }} to="/connexion">
                ici
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
