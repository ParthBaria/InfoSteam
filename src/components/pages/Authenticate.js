import React, { useState } from 'react'
import FormRenderer from '../UI/FormRenderer';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import LoadingIndicator from '../UI/LoadingIndicator';

const fieldConfig = [
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
];
const Authenticate = () => {
    const navigate = useNavigate();
    const { loginWithEmail } = useAuthContext();

    const [isLoading, setIsloading] = useState(false);

    const handleLogin = async (data) => {
        setIsloading(true);
        try {
            await loginWithEmail(data.email, data.password);
            console.log("you are logged");
            
            navigate('/favorites/1');
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setIsloading(false);
        }

    }


    return <>
        {isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><LoadingIndicator /></div >}
        <FormRenderer fields={fieldConfig} onSubmit={handleLogin} login={true} />;
    </>
}

export default Authenticate