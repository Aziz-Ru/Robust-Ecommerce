"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { loginAction } from "./actions/actions";
import { Button } from "./ui/button";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();
  return (
    <div className="w-[460px] border p-6 rounded">
      <form
        className=""
        ref={ref}
        action={async (e) => {
          setIsLoading(true);
          const res = await loginAction(e);
          if (res) {
            ref.current?.reset();
            router.push("/");
          } else {
            setError("Invalid email or password");
          }
          setIsLoading(false);
        }}
      >
        <h1 className="uppercase text-2xl font-bold text-center">
          WelCome Admin
        </h1>
        <p className="text-center text-red-500">{error}</p>
        <div className="p-1">
          <label className="text-xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border p-2 rounded mt-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="p-1">
          <label className="text-xl font-bold" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            min={6}
            required
            className="w-full border p-2 rounded mt-2"
            placeholder="Enter your email"
          />
        </div>

        <div className="p-1">
          <Button disabled={isLoading} className="w-full p-4 text-xl">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
