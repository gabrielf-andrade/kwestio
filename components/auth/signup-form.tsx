"use client";

import LogoLink from "@/components/shared/logo-link";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { signUpFormSchema } from "@/schemas/auth.schema";
import { BetterAuthActionError } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUpForm() {
  const router = useRouter();
  const [error, setError] = useState<BetterAuthActionError | null>(null);

  const signUpform = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const isSubmitting = signUpform.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setError(null);

    const { name, email, password } = values;

    const { error } = await signUp.email({
      name,
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
    <Card className="w-full max-w-sm gap-4 bg-primary-foreground dark:bg-background border-none shadow-none">
      <CardHeader className={cn("flex flex-col", !error && "mb-8")}>
        <div className="flex items-center justify-between w-full">
          <LogoLink size="md" />
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <CircleAlert className="size-4" />
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <Form {...signUpform}>
          <form onSubmit={signUpform.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={signUpform.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Your name" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={signUpform.control}
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
              control={signUpform.control}
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
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between text-sm gap-2 mx-auto">
          <p>Already have an account?</p>
          <Link href="/auth/signin" className="underline text-sm">
            Sign In
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
