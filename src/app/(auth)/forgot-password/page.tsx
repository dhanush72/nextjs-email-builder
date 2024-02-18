import ForgotPasswordForm from '@/components/forms/auth/forgot-password';
import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <div className="flex w-[330px] flex-1 flex-col justify-center">
      <div className="mb-10">
        <h1 className="mt-8 text-2xl font-medium lg:text-3xl">
          Reset Your Password
        </h1>
        <h2 className="text-sm text-muted-foreground">
          Type in your email and we&apos;ll send you a link to reset your
          password
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
