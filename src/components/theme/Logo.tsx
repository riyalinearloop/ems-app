import Link from "next/link";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={cn("inline-block", className)}>
      {/* You can replace this with your actual logo image */}
      {/* If you have a logo image at /images/Logo.svg, use this:
      <img
        src="/images/Logo.svg"
        alt="HealthO Logo"
        className="w-auto h-auto"
      />
      */}
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-[175px] h-[50px] bg-blue-600 rounded-lg">
          <span className="text-white font-bold text-xl">HealthO</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
