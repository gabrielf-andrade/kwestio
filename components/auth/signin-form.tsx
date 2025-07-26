"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/schemas/auth.schema";

import LogoLink from "@/components/shared/logo-link";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { BetterAuthActionError } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState<BetterAuthActionError | null>(null);

  const signInform = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isSubmitting = signInform.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    setError(null);

    const { email, password } = values;

    const { error } = await signIn.email({
      email,
      password,
    });

    if (error) {
      setError(
        produce(error, (draft) => {
          draft.message = draft.message || "Something went wrong.";
        })
      );
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <Card className="w-full max-w-sm gap-4 bg-primary-foreground dark:bg-background border-none shadow-none ">
      <CardHeader className={cn("flex flex-col", !error && "mb-8")}>
        <div className="flex items-center justify-between w-full">
          <LogoLink size="md" />
          <CardTitle className="text-xl text-center">Sign In</CardTitle>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-8">
            <CircleAlert className="size-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <Form {...signInform}>
          <form onSubmit={signInform.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={signInform.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="johndoe@example.com" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signInform.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing In..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between text-sm gap-2 mx-auto">
          <p>Don&apos;t have an account yet?</p>
          <Link href="/auth/signup" className="underline text-sm">
            Sign Up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
