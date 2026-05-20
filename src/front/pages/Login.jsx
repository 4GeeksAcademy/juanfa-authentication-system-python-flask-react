import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import {useState} from "react";
import { Link, useNavigate } from "react-router-dom";


export const Login = () => {

    const { store, dispatch } = useGlobalReducer();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
       if (email == "" || password == ""){
            alert("Please fill in all fields");
            return;
        } 

        try {
         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                        email: email,
                        password: password
                    })
            });

            const data = await response.json();

            if (!response.ok) {
                alert("Error: " + (data.msg || "Invalid credentials"));
            }else{
                dispatch({
                    type: "login",
                    payload: {
                        token: data.token,
                        user: data.user
                    }
                });
                alert("Logged in successfully!");
                setEmail("");
                setPassword("")
                navigate("/private");
            }
        } catch (error) {
            console.error("Connection error:", error);
            alert("The server is not responding.");
        }
    };

    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h1 className="mb-4">Login</h1>
                    
                    {/* Email Input */}
                    <input 
                        type="email" 
                        className="form-control mb-3"
                        placeholder="Enter your email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    {/* Password Input */}
                    <input 
                        type="password" 
                        className="form-control mb-3"
                        placeholder="Enter your password." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />

                    
                    <button 
                        className="btn btn-primary w-100" 
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>

                    <div className="mt-3">
                        <Link to="/signup">¿Don't have an account yet?? Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );

};
