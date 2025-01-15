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

const SignIn = () => {
return (
    <div className="h-full flex items-center justify-center bg-[#1b0918]">
        Login Page
        <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
            <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
                <CardDescription className="text-sm text-center text-accent-foreground">
                    Use Email or Social Media to log in to your account
                </CardDescription>
                <CardContent className="px-2 sm:px-6">
                    <form action="" className="space-y-3">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            disabled={false}
                            value={""}
                            required
                            onChange={() => {}}
                        />
                        <Input
                            type="password"
                            placeholder="Enter your password"
                            disabled={false}
                            value={""}
                            required
                            onChange={() => {}}
                        />
                        <Button className="w-full" size="lg" disabled={false}>
                            Login
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
            </CardHeader>
        </Card>
    </div>
);
};
export default SignIn;
