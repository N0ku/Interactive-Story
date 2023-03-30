import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();

    async function authenticateUser(identifier, password) {
        const response = await axios.post('http://localhost:5050/authenticate', {
            identifier,
            password,
        });
        return response.data;
    }


    async function loginUser() {
        let identifier = document.querySelector('#identifier').value;
        let password = document.querySelector('#password').value;

        if (await verifyIfAlreadyExist(identifier)) {
            let token = await authenticateUser(identifier, password); //set the token for the user
            localStorage.setItem("token", token.token);

            navigate('/')
        }
    }

    async function verifyIfAlreadyExist(identifier) {
        try {
            const response = await axios.get('http://localhost:5050/users');
            const users = response.data;
            return users.find((user) => user.email === identifier || user.username === identifier);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        
        <div className='login-form'>
            <input type="text" placeholder="Entrez votre mail/username.." className="user-inputs" id="identifier"></input>
            <input type="password" placeholder="Entrez votre mot de passe.." className="user-inputs" id="password"></input>
            <button className="login-connect-button" onClick={loginUser} >Connexion</button>
            <p className='login-link'>Pas encore de compte ?<Link style={{ color: 'pink' }} to='/inscription'> S'inscrire ICI</Link></p>
        </div>
    
    );
}

export default Login;