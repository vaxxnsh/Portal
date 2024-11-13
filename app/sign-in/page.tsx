"use client";
import React, { useState } from 'react';

const SignupPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation check
    if ( !email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    // Add your signup logic here
    console.log({
      email,
      password,
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#0f172b]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#0f172b]">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
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
