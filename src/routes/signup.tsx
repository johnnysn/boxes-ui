import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type React from "react";
import { signup, type SignupData } from "../lib/services/user-services";

export const Route = createFileRoute("/signup")({
  component: Signup,
});

function Signup() {
  const navigate = useNavigate();
  const { isPending, isError, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: SignupData) => {
      return await signup(body);
    },
    onSuccess: (data) => {
      console.log(data.email + " is now with us!");
      // TODO show toast to the user

      navigate({
        to: "/auth",
      });
    },
    onError: (error) => {
      console.error(error);
      // TODO show toast to the user
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const body = {
      name: ("" + formData.get("name")).trim(),
      email: ("" + formData.get("email")).trim(),
      password: ("" + formData.get("password")).trim(),
      passwordRepeat: ("" + formData.get("passwordRepeat")).trim(),
      invitationCode: ("" + formData.get("invitationCode")).trim(),
    };

    if (body.password !== body.passwordRepeat) {
      // TODO error toast
      return;
    }

    mutate(body);
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Create Account</h1>
      <form
        className="flex flex-col gap-3 w-full max-w-2xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="inputName">Name</label>
          <input
            type="text"
            name="name"
            id="inputName"
            placeholder="Input your name"
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            name="email"
            id="inputEmail"
            placeholder="Input your email"
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
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputPassRep">Password Confirm</label>
          <input
            type="password"
            name="passwordRepeat"
            id="inputPassRep"
            placeholder="Repeat your password"
            disabled={isPending}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sec focus:border-sec transition-colors disabled:bg-gray-50"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="inputInvi">Invitation Code</label>
          <input
            type="text"
            name="invitationCode"
            id="inputInvi"
            placeholder="Input your invitation code"
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

        {isError && (
          <span className="text-red-600">Coult not create account!</span>
        )}
      </form>
    </div>
  );
}
