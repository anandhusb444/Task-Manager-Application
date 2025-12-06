import {Link} from "react-router-dom";

function Register() {
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
          />
          <label className="text-[hsl(267,57%,14%)] font-light font-poppins mt-2">
            Email
          </label>
          <input
            className="h-[33px] w-full max-w-[240px] border text-xs border-[#03001c] rounded 
             pl-2 font-poppins font-light placeholder:text-xs"
             placeholder="Enter your mail"
          />
          <label className="text-[hsl(267,57%,14%)] font-poppins font-light mt-2">
            Password
          </label>
          <input
            className="h-[33px] w-full max-w-[240px] border text-xs border-[#03001c] rounded 
             pl-2 font-poppins font-extralight placeholder:text-xs"
             placeholder="Enter your password"
          />
          <p className="font-poppins text-[10px] text-[#666666] ml-1 mt-1">
            Already have an account? <a href="#" className="text-[#03001c] hover:text-[#02000f] cursor-pointer"><Link to={"/Login"}>Sign In</Link></a> 
          </p>
          <button
            className="h-[33px] w-full max-w-[240px] border border-[#666666] rounded 
             bg-[#03001C] text-white font-poppins font-semibold mt-3"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
