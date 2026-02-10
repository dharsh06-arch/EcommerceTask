import React, { useEffect, useState } from "react";
import img1 from "../../assets/signin.jpg";
import Input from "../../components/Input/Input";
import { Lock, Mail } from "lucide-react";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/AuthReducer";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const auth = useSelector((state)=>state.auth.isauth)
    const role = useSelector((state) => state.auth.role)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 useEffect(() => {
  if (auth && role === "client") {
    navigate("/home", { replace: true });
  }
  if (auth && role === "admin") {
    navigate("/dashboard", { replace: true });
  }
}, [auth, role, navigate]);


  const client_username = "ammu"
  const client_password = "12345678"
  const admin_username = "ammu"
  const admin_password = "1234"

  const handleSubmit = () => {
    if(formData.username == client_username && formData.password == client_password ){
      dispatch(login({role: "client"}))
      navigate('/home')
    }if(formData.username == admin_username && formData.password == admin_password ){
     dispatch(login({ role: "admin" }));
      navigate('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl  overflow-hidden max-w-4xl w-full">
        
        <div className="hidden md:h-[500px] md:block">
          <img
            src={img1}
            alt="Signin"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Account Login
          </h2>
          <p className="text-gray-500 mb-8">
            Please enter your credentials to login
          </p>

          <div className="space-y-5">
            <Input
              icon={Mail}
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username address"
              type="username"
            />

            <Input
              icon={Lock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />
          </div>
          <p className="hover:underline transition-all ease-in-out duration-300 hover:text-gray-500 cursor-pointer"
          onClick={()=>navigate('/forgot-password')}>forgot password?</p>

          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don't have an account? 
            <Link to={'/signup'} className="text-black ml-1 font-semibold cursor-pointer hover:underline" >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
