import React,{ useState }  from 'react'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
  let navigate = useNavigate();
  const host = "http://localhost:3001";
  const [credential,setCredential] = useState({name:"",email:"",password:"",cpassword:""});
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const {name,email,password} = credential;

    console.log("handleSubmit");
    const response = await fetch(`${host}/api/auth/create-user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({name,email,password})
    });
    const json = await response.json();
    console.log("signup Response ",json);
   
    if(json.success){
      localStorage.setItem("token",json.authToken);
      navigate("/home")
      props.showAlert("Account created successfully","success")
    }else{
      props.showAlert("Internal server error","danger")
    }
    
  }

  return (
    <div className="container">
     <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange = {onChange} name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email"  onChange = {onChange} name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  onChange = {onChange} name="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword"  onChange = {onChange} name="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
  )
}

export default Signup
