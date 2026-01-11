import { useState } from "react";
import {Link,useNavigate} from "react-router-dom";

function Register() {

  const [email, setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [userName,setUserName] = useState("")

  const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();
  console.log("Button clicked")

  try {
    const response = await fetch("https://localhost:7094/api/Users/Register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name:userName, email:email, password:password })
    });

    if (response.ok) {
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;
      alert(data.message)
      navigate("/login")
    } else {
      console.log("Failed");
    }
  } catch (error) {
    console.log(error);
  }
};



  return (
    <div>
      <div className="flex justify-center items-center h-screen px-4">
        <form className="flex flex-col w-full max-w-[240px] p-3 font-poppins shadow-md">
          <h1 className="text-[#03001c] text-xl font-semibold">Create Account</h1>
          <p className="font-poppins text-[10px] text-[#666666] mt-0">
            Please Enter your details
          </p>
          <label className="text-[hsl(267,57%,14%)] font-light font-poppins mt-2">
            user name
          </label>
          <input
            className="h-[33px] w-full max-w-[240px] border text-xs border-[#03001c] rounded 
             pl-2 font-poppins font-light placeholder:text-xs"
             placeholder="Enter your user name"
             value={userName}
             onChange={(e)=> setUserName(e.target.value)}
          />
          <label className="text-[hsl(267,57%,14%)] font-light font-poppins mt-2">
            Email
          </label>
          <input
            className="h-[33px] w-full max-w-[240px] border text-xs border-[#03001c] rounded 
             pl-2 font-poppins font-light placeholder:text-xs"
             placeholder="Enter your mail"
             value={email}
             onChange={(e)=> setEmail(e.target.value)}
          />
          <label className="text-[hsl(267,57%,14%)] font-poppins font-light mt-2">
            Password
          </label>
          <input
            className="h-[33px] w-full max-w-[240px] border text-xs border-[#03001c] rounded 
             pl-2 font-poppins font-extralight placeholder:text-xs"
             placeholder="Enter your password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
          />
          <p className="font-poppins text-[10px] text-[#666666] ml-1 mt-1">
            Already have an account? <a href="#" className="text-[#03001c] hover:text-[#02000f] cursor-pointer"><Link to={"/"}>Sign In</Link></a> 
          </p>
          <button
            className="h-[33px] w-full max-w-[240px] border border-[#666666] rounded 
             bg-[#03001C] text-white font-poppins font-semibold mt-3"
             onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
