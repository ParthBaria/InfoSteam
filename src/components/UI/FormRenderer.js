import React, { useState } from 'react';
import './FormRenderer.css';
import { useAuthContext } from '../context/AuthContext';

function FormRenderer(props) {
    const { login } = useAuthContext();
    const [formData, setFormData] = useState({});

    const handleChange = (e, name) => {
        setFormData({ ...formData, [name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(formData);
    };

    return (
        <div className="form_wrapper">
            <h2 className="form_heading">
                <span id="logo_i">i</span>nfo<span id="logo_s">S</span>tream
            </h2>

            <form className="infostream_form" onSubmit={handleSubmit}>
                {props.fields.map((field, index) => (
                    <div className="form_group" key={index}>
                        <label className="form_label" htmlFor={field.name}>
                            {field.label}
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type}
                            className="form_input"
                            placeholder={field.placeholder || ''}
                            value={formData[field.name] || ''}
                            onChange={(e) => handleChange(e, field.name)}
                            required={field.required}
                        />
                    </div>
                ))}
                <button className="form_submit_btn" type="submit">{props.login ? "Log In" : "Register"}</button>
            </form>

            {props.login && (
                <>
                    <div className="or_separator">OR</div>

                    <button className="google_login_btn" onClick={login}>
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google Logo"
                            className="google_logo"
                        />
                        Login with Google
                    </button>


                </>
            )}
            <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
                Don’t have an account? <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => window.location.href = `${props.login?"/register":"/login"}`}>{props.login ? "Register here" : "LogIn here"}</span >
            </p>
        </div>
    );
}

export default FormRenderer;
