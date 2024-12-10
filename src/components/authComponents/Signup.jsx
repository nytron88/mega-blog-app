import React, { useState } from "react";
import authService from "../../appwrite/auth";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { Button, Input, Loader } from "../index";

function Signup() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    try {
      setError("");
      const session = await authService.signup(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login({ userData }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-gray-800 rounded-xl shadow-lg shadow-purple-500/10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="mt-2 text-gray-400">
            Join us and start reading and writing amazing blogs
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(submit)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              type="text"
              className="text-gray-100"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              placeholder="johndoe@example.com"
              type="email"
              className="text-gray-100"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              className="text-gray-100"
              {...register("password", {
                required: true,
              })}
            />
          </div>

          <div>
            <Button className="w-full" type="submit">
              Create Account
            </Button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-center">
              <p className="text-red-500 text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="text-center text-gray-400">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-purple-500 hover:text-purple-400 transition-colors duration-200">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;