import React, { useState } from "react";
import { Lock } from "lucide-react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.password || !formData.confirmPassword) {
      return
    }

    if (formData.password !== formData.confirmPassword) {
      return
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Reset Password
        </h1>

        <p className="text-sm text-gray-500 mb-6">
          Create a new password for your account.
        </p>

        <div className="space-y-4">
          <Input
            icon={Lock}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="New password"
            required
          />

          <Input
            icon={Lock}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          Reset Password
        </Button>

      </div>
    </div>
  );
};

export default ResetPassword;
