import axios from 'axios';

function Login() {

    function getUsers() {
        axios.get('http://localhost:5050/users')
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>

        </div>
    );
}

export default Login;