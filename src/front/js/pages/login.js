import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { actions } = useContext(Context);
    const navigate = useNavigate();  

    const handleLogin = async () => {
        const success = await actions.login({ email: email, password: password });
        if (success) {
            navigate('/profile');  
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form>
                <input 
                    name="email" 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} 
                    placeholder="email" 
                />
                <input 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChange={(e)=> setPassword(e.target.value)} 
                    placeholder="password" 
                />
                <button type="button" onClick={handleLogin}>
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;