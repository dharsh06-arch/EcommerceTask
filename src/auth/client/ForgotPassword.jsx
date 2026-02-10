import React, { useState } from "react";
import { Mail } from "lucide-react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Forgot Password
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email address and we'll send you a 4-digit OTP to reset your password.
        </p>

        <Input
          icon={Mail}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <Button className="w-full" onClick={handleSubmit}>
          Send OTP
        </Button>

       
      </div>
    </div>
  );
};

export default ForgotPassword;
