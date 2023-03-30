import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {

    async function validRegister() {
        let mail = document.querySelector('#email').value;
        let username = document.querySelector('#username').value;
        let mdp = document.querySelector('#password').value;
        let confirmMdp = document.querySelector('#confirm-password').value;

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mail && username && mdp && confirmMdp) {
            if (mail.match(validRegex) && mdp === confirmMdp) {
                if (!await verifyIfAlreadyExist(mail, username)) {
                    createUser(mail, username, mdp);
                }
                else {
                    const userExist = await verifyIfAlreadyExist(mail, username);
                    if (userExist.email === mail) {
                        alert("Ce mail existe déjà !");
                    }
                    else (
                        alert('Cet username est déjà prit !')
                    )
                }
            }
            else {
                alert("Les deux mdp ne sont pas identiques !")
            }
        }
        else {
            alert('Merci de remplir tous les champs !!')
        }
    }

    async function verifyIfAlreadyExist(mail, username) {
        try {
            const response = await axios.get('http://localhost:5050/users');
            const users = response.data;
            return users.find((user) => user.email === mail || user.username === username);
        } catch (error) {
            console.error(error);
        }
    }

    function createUser(mail, username, mdp) {
        axios.post('http://localhost:5050/users', {
            email: mail,
            username: username,
            password: mdp
        })
            .then(function (response) {
                console.log('User created:', response.data);
            })
            .catch(function (error) {
                console.error('Error creating user:', error);
            });
    }


    return (
        <div className='register-form'>
            <input type="mail" id="email" className="user-inputs" placeholder="Entrez votre adresse mail.."></input>
            <input type="text" id="username" className="user-inputs" placeholder="Entrez votre pseudo.."></input>
            <input type="password" id="password" className="user-inputs" placeholder="Entrez votre mot de passe.."></input>
            <input type="password" id="confirm-password" className="user-inputs" placeholder="Confirmer votre mot de passe.."></input>
            <button className="valid-register-button" onClick={validRegister}>Valider</button>
            <p className='register-link'>Déjà un compte ? <Link style={{ color: 'pink' }} to='/connexion'> Se connecter ici</Link></p>
        </div>
    );
}

export default Register;