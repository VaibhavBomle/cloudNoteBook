import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const host = "http://localhost:3001";
    const [credential,setCredential] = useState({email:"",password:""});
    let navigate = useNavigate();
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Get all Notes
        console.log("handleSubmit");
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({email:credential.email,password:credential.password})
        });
        const json = await response.json();
        console.log("login Response ",json);
        if(json.success){
            // Redirect to home page
            localStorage.setItem("token",json.authToken);
            navigate("/home")
        }else{
            alert("Invalid Credential")
        }

    }

    return (
        <div className = "container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value = {credential.email} onChange = {onChange} name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="email" value = {credential.password} onChange = {onChange} name="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
