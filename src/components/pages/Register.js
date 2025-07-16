import React, { useState } from "react";
import FormRenderer from "../UI/FormRenderer";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";
import LoadingIndicator from "../UI/LoadingIndicator";
function Register() {
    const navigate = useNavigate();
    const { registerWithEmail } = useAuthContext();
    const [isLoading, setIsloading] = useState(false);
    const handleRegister = async (data) => {
        setIsloading(true)
        try {
            await registerWithEmail(data.email, data.password);
            navigate('/favorites/1');
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setIsloading(false)

        }
    };

    return (
        <>
            {isLoading && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><LoadingIndicator /> </div >}

            <FormRenderer
                fields={[
                    {
                        name: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "Enter your email",
                        required: true,
                    },
                    {
                        name: "password",
                        label: "Password",
                        type: "password",
                        placeholder: "Create a password",
                        required: true,
                    },
                ]}
                onSubmit={handleRegister}

                login={false}
            />
        </>

    );
}

export default Register;
