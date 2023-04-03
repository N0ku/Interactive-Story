import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function authenticateUser(identifier, password) {
    const response = await axios.post("http://localhost:5050/authenticate", {
      identifier,
      password,
    });
    return response.data;
  }

  async function verifyIfAlreadyExist(identifier) {
    try {
      const response = await axios.get("http://localhost:5050/users");
      const users = response.data;
      return users.some(
        (user) => user.email === identifier || user.username === identifier
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function loginUser(e) {
    e.preventDefault();
    const identifier = e.target.elements.identifier.value.trim();
    const password = e.target.elements.password.value.trim();

    if (await verifyIfAlreadyExist(identifier)) {
      const token = await authenticateUser(identifier, password);
      localStorage.setItem("token", token.token);
      navigate("/");
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
          Connexion
        </h1>
        <form className="mt-6" onSubmit={loginUser}>
          <div className="mb-2">
            <label
              htmlFor="identifier"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="identifier"
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              id="password"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <Link to="#" className="text-xs text-purple-600 hover:underline">
            Mot de passe oublié?
          </Link>
          <div className="mt-6">
            <button
              type="submit"
              className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Connexion
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Vous n'avez pas de compte?{" "}
          <Link
            to="/inscription"
            className="font-medium text-purple-600 hover:underline"
          >
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
