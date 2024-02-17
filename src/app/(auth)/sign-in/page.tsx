import SignInForm from "@/components/forms/auth/sign-in-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px]">
      <div className="mb-10">
        <h1 className="mt-8 text-2xl lg:text-3xl font-medium">Welcome back</h1>
        <h2 className="text-sm text-muted-foreground">
          Sign in to your account
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <Button variant="outline" size="lg" className="gap-2">
          <FaGithub size={16} className="h-5 w-5" /> Continue with Github
        </Button>
        <Button variant="outline" size="lg" className="gap-2">
          <FcGoogle size={16} className="h-5 w-5" /> Continue with Google
        </Button>

        <Separator />

        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
