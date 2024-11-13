"use client";
import { useUserStore } from '@/store/userStore';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation check
    if (!fullName || !username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    const url = isAdmin ? "http://localhost:8080/admin/register" : "http://localhost:8080/user/register";
    
    try {
      const response = await axios.post(url, {
        fullName,
        username,
        email,
        password,
      });

      if(response.data.error) {
        alert("User alreaday exists");
        return;
      }
      // Update Zustand store with user data
      const setUser = useUserStore.getState().setUser;
      setUser({
        fullName: response.data.fullName,
        username: response.data.username,
        email: response.data.email,
        isAdmin,
      });

      // Set a cookie for authentication or session info
      Cookies.set("userToken", response.data.token, { expires: 7 }); // Set token or session data, expires in 7 days

      alert("Registration successful!");
      
    } catch (error) {
      // Handle errors from the server or network
      if (axios.isAxiosError(error) && error.response) {
        console.log("Error:", error.response.data);
        alert(`Registration failed: ${error.response.data.error || "Please try again."}`);
      } else {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }

    // Log form data for debugging
    console.log({
      fullName,
      username,
      email,
      password,
      isAdmin,
    });
};


  return (
    <div className="flex justify-center items-center h-screen bg-[#0f172b]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#0f172b]">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border-b border-[#0f172b] py-2">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full text-black outline-none"
            />
          </div>
          <div className="flex items-center border-b border-[#0f172b] py-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-black outline-none"
            />
          </div>
          <div className="flex items-center border-b border-[#0f172b] py-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black outline-none"
            />
          </div>
          <div className="flex items-center border-b border-[#0f172b] py-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="text-[#0f172b]"
            />
            <label className="text-[#0f172b] text-xl">Admin</label>
          </div>
          <button
            type="submit"
            className="bg-[#0f172b] text-white py-2 px-4 rounded-md hover:bg-[#1e293b] transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
