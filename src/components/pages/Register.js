import React from "react";
import FormRenderer from "../UI/FormRenderer";
import { useNavigate } from "react-router";
import { useAuthContext } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();
    const { registerWithEmail } = useAuthContext();
    const handleRegister = async (data) => {
        console.log(data);
        try {
            await registerWithEmail(data.email, data.password);
            navigate('/favorites');
        } catch (err) {
            alert("Error: " + err.message);
        }
    };

    return (
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
    );
}

export default Register;
