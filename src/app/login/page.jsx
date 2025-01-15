"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res.ok) {
      router.push("/");
      toast.success("Logged in successfully");
    } else if (res.status === 400) {
      setPending(false);
      setError("Invalid credentials");
    }
    else {
        setError("Something went wrong");
    }
  }
  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      Login Page
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use Email or Social Media to log in to your account
          </CardDescription>
          </CardHeader>
          {error && (
            <div className="bg-destructive-15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
              <TriangleAlert />
              <p>{error}</p>
            </div>
          )}
          <CardContent className="px-2 sm:px-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                disabled={pending}
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                disabled={pending}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-full" size="lg" disabled={pending}>
                Continue
              </Button>
            </form>
            <Separator />
            <div className="flex my-2 justify-evenly mx-auto items-center">
              <Button
                disabled={false}
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
              >
                <FcGoogle className="size-8 left-2.5 top-2.5" />
              </Button>
              <Button
                disabled={false}
                onClick={() => {}}
                variant="outline"
                size="lg"
                className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
              >
                <FaGithub className="size-8 left-2.5 top-2.5" />
              </Button>
            </div>
            <p className="text-center text-sm mt-2 text-muted-foreground">
              Don't have an account?
              <Link
                href="sign-up"
                className="text-sky-700 ml-4 hover:underline cursor-pointer"
              >
                Sign Up
              </Link>
            </p>
          </CardContent>
      </Card>
    </div>
  );
};
export default Login;
