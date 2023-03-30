import axios from 'axios';

function example() {
    async function getProtectedResource(token) {
        try {
            const response = await axios.get('http://localhost:5050/protected-resource', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async function getLoginUser() {
        const token = localStorage.getItem('token');
        const user = await getProtectedResource(token);

        console.log(user);
        return user;
    }

    getLoginUser();

    return (
        <div></div>
    );
}

export default example;