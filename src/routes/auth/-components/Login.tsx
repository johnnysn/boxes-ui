import React, { useState } from "react";
import { useLogin } from "../../../lib/hooks/useLogin";
import { Link } from "@tanstack/react-router";

export default function Login() {
  const { mutate: login, isPending, isError } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    login({ email, password });
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        className="flex flex-col gap-3 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            placeholder="Input your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputPass">Password</label>
          <input
            type="password"
            name="password"
            id="inputPass"
            placeholder="Input your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full mt-2 bg-sec text-white py-2 px-4 rounded-md hover:bg-sec-li focus:outline-none focus:ring-2 focus:ring-sec focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>

        <Link
          to="/signup"
          disabled={isPending}
          className="w-full mt-2 bg-tertiary text-black py-2 px-4 rounded-md hover:bg-tertiary-li focus:outline-none focus:ring-2 focus:ring-tertiary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-center"
        >
          Create Account
        </Link>

        {isError && (
          <span className="text-red-600">Coult not authenticate!</span>
        )}
      </form>
    </div>
  );
}
