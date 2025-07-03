import React from 'react'
import FormRenderer from '../UI/FormRenderer';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const fieldConfig = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
];
const Authenticate = () => {
    const navigate=useNavigate();
    const { loginWithEmail } = useAuthContext();

    const handleLogin = async (data) => {
        console.log(data);
        try {
            await loginWithEmail(data.email, data.password);
            navigate('/favorites');
        } catch (err) {
            alert("Error: " + err.message);
        }

    }


    return <FormRenderer fields={fieldConfig} onSubmit={handleLogin} login={true} />;
}

export default Authenticate