import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const handleSignin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //const token = localStorage.getItem("authToken");
  //   if (token) {
  //     return (
  //       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  //         <h1 className="text-2xl font-bold mb-4">You are already logged in.</h1>
  //         <p className="text-gray-700">Redirecting to your dashboard...</p>
  //       </div>
  //     );
  //   } else {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-green-100">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="border-black border-l-3 border-b-3">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <Button
                      type="submit"
                      variant="green"
                      className="border-black border-l-2 border-2 "
                    >
                      Login
                    </Button>
                    <Button variant="outline" type="button">
                      Login with Google
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account? <a href="#">Sign up</a>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
//}
