import { useState } from "react";
import { useForm } from "react-hook-form";
import { changeUserPassword } from "../Api/auth/authService";
import Input from "./Input";
import { logout } from "../app/authSlice";
import { useDispatch } from "react-redux";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();
  const [error, setError] = useState("");
  const { newPassword, confirmPassword } = watch();

  const dispatch = useDispatch();

  
  

  // Function to check if passwords match
  const checkMatch = () => {
    return newPassword === confirmPassword ? "Submit" : "Passwords don't match";
  };

  const changePassword = async (data) => {
    if (
      (data.newPassword === data.confirmPassword &&
        data.oldPassword != undefined) ||
      data.oldPassword != null
    ) {
      setError("");
      try {
        const response = await changeUserPassword(data);
        if (response) dispatch(logout());
        
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container w-1/4 bg-white shadow-md rounded-lg p-6 mx-auto my-16">
      <div className="header bg-red-600 text-white font-sans text-lg text-center py-3 rounded-t-lg">
        Change Password
      </div>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      {/* {success && (
        <p className="text-green-600 mt-8 text-center">Changed Successfully</p>
      )} */}
      <form onSubmit={handleSubmit(changePassword)} className="mt-8">
        <div className="form mt-8">
          <Input
            label="Old Password"
            type="password"
            placeholder="Old Password"
            className="w-full p-3 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("oldPassword", {
              required: true,
            })}
          />
          <Input
            label="New Password"
            type="password"
            placeholder="New Password"
            className="w-full p-3 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("newPassword", {
              required: true,
            })}
          />
          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            {...register("confirmPassword", {
              required: true,
            })}
          />
        </div>
        
        <button
          className={`footer text-white mt-3 font-sans w-full text-center py-3 rounded-b-lg ${
            newPassword === confirmPassword ? "bg-red-600" : "bg-green-500"
          }`}
          type="submit"
          disabled={newPassword !== confirmPassword}
        >
          {checkMatch()}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
