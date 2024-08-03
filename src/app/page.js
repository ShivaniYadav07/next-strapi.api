'use client'
import { useState } from "react";
const jwt = require('jsonwebtoken');

export default function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const message = "Testing, Testing..... It works🙂";
    const id = Math.trunc(Math.random() * 1000000);
    const data = { email, message };
    const account = { id };
    const secret = 'shivani12';
    const token = jwt.sign(account, secret.toString('utf-8'));
    
    try {
      const response = await fetch("http://localhost:1337/api/send-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);

      const strapiData = { data: { id, username: user, email, token } };
      const strapiResponse = await fetch("http://localhost:1337/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strapiData),
      });

      if (!strapiResponse.ok) {
        throw new Error(`HTTP error! status: ${strapiResponse.status}`);
      }

      const strapiResult = await strapiResponse.json();
      console.log(strapiResult);

      setEmail("");
      setUser("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <form className="main w-full max-w-md mx-auto shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-white-200 text-3xl font-bold mb-4">Login</h1>
        <label className="block mb-2 text-white-200" htmlFor="user">
          Username:
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="text-gray-900 w-full px-4 py-2 text-lg rounded"
          />
        </label>
        <br />
        <label className="block mb-2 text-white-200" htmlFor="name">
          Email:
          <input
            type="email"
            id="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-gray-900 w-full px-4 py-2 text-lg rounded"
          />
        </label>
        <br />
        <input
          type="submit"
          onClick={handlesubmit}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
}
