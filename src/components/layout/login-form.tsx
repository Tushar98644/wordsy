"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Loader } from "lucide-react";
import { authClient } from "@/config/auth/client";
import { toast } from "sonner";
import { GithubIcon } from "@/components/ui/github-icon";
import { GoogleIcon } from "@/components/ui/google-icon";

export const SignIn = () => {

  const handleSocialSignIn = (provider: "google" | "github") => {
    authClient.signIn.social({ provider }).catch((e: any) => {
      toast.error(e.error);
    });
  };

  const loading = false;

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-8 justify-center">
      <Card className="w-full md:max-w-md bg-background border-none mx-auto shadow-none animate-in fade-in duration-1000">
        <CardHeader className="my-4">
          <CardTitle className="text-2xl text-center my-1">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                autoFocus
                value={''}
                onChange={() => { }}
                type="email"
                placeholder="user@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                value={''}
                placeholder="********"
                onKeyDown={() => { }}
                onChange={() => { }}
                type="password"
                required
              />
            </div>
            <Button
              className="w-full"
              onClick={() => { }}
            >
              {loading ? (
                <Loader className="size-4 animate-spin ml-1" />
              ) : (<p>Sign In</p>)}
            </Button>
          </div>
          <>
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-accent"></div>
              <span className="px-4 text-sm text-muted-foreground">
                OR CONTINUE WITH
              </span>
              <div className="flex-1 h-px bg-accent"></div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => handleSocialSignIn("google")}
                className="flex-1 w-full"
              >
                <GoogleIcon className="size-4 fill-foreground" />
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialSignIn("github")}
                className="flex-1 w-full"
              >
                <GithubIcon className="size-4 fill-foreground" />
                GitHub
              </Button>
            </div>
          </>
          <div className="my-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?
            <Link href="/sign-up" className="underline-offset-4 text-primary">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}