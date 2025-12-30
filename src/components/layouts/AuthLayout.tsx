"use client";

import React from "react";
import Link from "next/link";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import Logo from "@/components/theme/Logo";
import { Circle } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const getYear = () => {
    return new Date().getFullYear();
  };

  const recaptchaSiteKey =
    process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY || "";

  return (
    <div className="w-full relative min-h-screen flex flex-col items-center justify-center py-6 px-5 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl mx-auto relative flex flex-col items-center justify-center flex-1">
        {/* Logo Container */}

        {/* Form Container */}
        <div className="w-full max-w-lg mx-auto px-5 md:px-10 py-5 md:py-10 flex-1 flex items-center">
          <GoogleReCaptchaProvider
            reCaptchaKey={recaptchaSiteKey}
            scriptProps={{
              async: true,
              defer: true,
              appendTo: "head",
              nonce: undefined,
            }}
            useRecaptchaNet={false}
            useEnterprise={false}
          >
            {children}
          </GoogleReCaptchaProvider>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-8 pb-6 w-full">
          <p className="text-center text-xs md:text-sm text-muted-foreground mb-3">
            © {getYear()} HealthO Technology Inc. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-3 md:gap-4 text-xs md:text-sm">
            <Link
              href="/privacy-policy"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <Circle className="w-1.5 h-1.5 fill-primary text-primary" />
            <Link
              href="/terms-of-use"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
