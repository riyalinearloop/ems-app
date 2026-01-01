"use client";

import Link from "next/link";
import { Circle } from "lucide-react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

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
    <div className="w-full relative min-h-screen flex flex-col items-center justify-center py-4 sm:py-6 px-3 sm:px-4 md:px-5 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-7xl mx-auto relative flex flex-col items-center justify-center flex-1 min-h-0">
        {/* Form Container */}
        <div className="w-full max-w-lg mx-auto px-3 sm:px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-10 flex-1 flex items-center justify-center min-h-0">
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
        <div className="mt-auto pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 w-full">
          <p className="text-center text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-2 sm:mb-3 px-2">
            © {getYear()} HealthO Technology Inc. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm flex-wrap px-2">
            <Link
              href="/privacy-policy"
              className="text-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Circle className="w-1 h-1 sm:w-1.5 sm:h-1.5 fill-primary text-primary flex-shrink-0" />
            <Link
              href="/terms-of-use"
              className="text-foreground hover:text-primary transition-colors font-medium whitespace-nowrap"
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
