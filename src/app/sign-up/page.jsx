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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const[form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const[pending, setPending] = useState(false);
  const[error, setError] = useState(null);
  const router = useRouter();

  const handleProvider = async (provider) => {
    await signIn(provider, {
      callbackUrl: "/",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const user = await res.json();
      if(res.ok) {
        setPending(false);
        toast.success(user.message);
        router.push("/login");
        console.log(user);
      } else if(res.status === 400) {
        setPending(false);
        setError(user.message);
      } else if(res.status === 500) {
        setPending(false);
        setError(user.message);
      }
    } catch (error) {
      console.error(error);
    }
    setPending(false);
  }
  return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
      
      SignUp Page
      <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
        <CardHeader>
          <CardTitle className="text-center">Sign-Up</CardTitle>
          <CardDescription className="text-sm text-center text-accent-foreground">
            Use Email or Social Media to create an account
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
                type="text"
                placeholder="Enter your name"
                disabled={pending}
                value={form.name}
                required
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
              <Input
                type="email"
                placeholder="Enter your email"
                disabled={pending}
                value={form.email}
                required
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
              <Input
                type="password"
                placeholder="Enter your password"
                disabled={pending}
                value={form.password}
                required
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
              <Input
                type="password"
                placeholder="Confirm your password"
                disabled={pending}
                value={form.confirmPassword}
                required
                onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
              />
              <Button className="w-full" size="lg" disabled={false}>
                continue
              </Button>
            </form>
            <Separator />
            <div className="flex my-2 justify-evenly mx-auto items-center">
              <Button
                disabled={false}
                onClick={(e) => handleProvider("google")}
                variant="outline"
                size="lg"
                className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
              >
                <FcGoogle className="size-8 left-2.5 top-2.5" />
              </Button>
              <Button
                disabled={false}
                onClick={(e) => handleProvider("github")}
                variant="outline"
                size="lg"
                className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
              >
                <FaGithub className="size-8 left-2.5 top-2.5" />
              </Button>
            </div>
            <p className="text-center text-sm mt-2 text-muted-foreground">
              Already have an account?
              <Link
                href="login"
                className="text-sky-700 ml-4 hover:underline cursor-pointer"
              >
                Sign In
              </Link>
            </p>
          </CardContent>
      </Card>
    </div>
  );
};
export default SignUp;
