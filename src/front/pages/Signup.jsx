import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
 import {useState} from "react";
 import { Link } from "react-router-dom";
 
 
 export const Signup = () => {
     const {store, dispatch} = useGlobalReducer();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (email == "" || password == ""){
            alert("Please fill in all fields");
            return;
        }

    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
            body: JSON.stringify({
            email: email,
            password: password
          })
          
        });
        const data = await response.json(); 

        if (response.ok) {
            alert("User successfully created! You can now log in.");
            setEmail("");    
            setPassword(""); 
        } else {
            alert("Error: " + (data.msg || "Could not register"));
        }
    } catch (error) {
            console.error("Connection error:", error);
            alert("The server is not responding. Check if Flask is running.");
    }
};
 
     return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h1 className="mb-4">Sign up</h1>
                    
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
                        onClick={handleSignUp}
                    >
                        Send
                    </button>

                    <div className="mt-3">
                        <Link to="/login">¿Do you already have an account? Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
 };