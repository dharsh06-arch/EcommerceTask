import React, { useEffect, useState } from "react";
import img1 from "../../assets/signin.jpg";
import Input from "../../components/Input/Input";
import { Lock, Mail, PhoneCall, User } from "lucide-react";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/AuthReducer";
import { useDispatch, useSelector } from "react-redux";

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const auth = useSelector((state)=>state.auth.isauth)
 const [formData, setFormData] = useState({
  user: "",
  mobileno: "",
  email: "",
  password: "",
  c_password: "",
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(()=>{
    if(auth){
      navigate('/home',{replace:true})
    }
  })

  const email = "dharshu3764@gmail.com"
  const password = "12345678"

  const handleSubmit = () => {
    if(formData.email == email && formData.password == password ){
      dispatch(login())
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="md:h-[550px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl  overflow-hidden max-w-6xl w-full">
        
        <div className="hidden md:h-[550px]  md:block">
          <img
            src={img1}
            alt="Signup"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Signup
          </h2>
       <div className="grid mt-2 grid-cols-2 gap-2">
  <Input
    icon={User}
    name="user"
    value={formData.user}
    onChange={handleChange}
    placeholder="Username"
    type="text"
  />

  <Input
    icon={PhoneCall}
    name="mobileno"
    value={formData.mobileno}
    onChange={handleChange}
    placeholder="Mobile number"
    type="text"
  />

  <Input
    wrapperClassName="col-span-2"
    icon={Mail}
    name="email"
    value={formData.email}
    onChange={handleChange}
    placeholder="Email address"
    type="email"
  />
</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
             <Input
              icon={Lock}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
            />
             <Input
              icon={Lock}
              name="c_password"
              value={formData.c_password}
              onChange={handleChange}
              placeholder="ConfirmPassword"
              type="password"
            />
          </div>

          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit}>
              signup
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
         Already have an account?
            <Link to={'/signup'} className="text-black ml-1 font-semibold cursor-pointer hover:underline" >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
