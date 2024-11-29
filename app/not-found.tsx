import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F8F9FB] to-[#E9ECEF] text-[#1A1D1F]">
      <div className="text-center">
        {/* Animated 404 */}
        <h1 className="text-[10rem] font-bold text-[#1A1D1F] mb-4 animate-bounce">
          404
        </h1>

        {/* Error message */}
        <p className="text-2xl font-semibold text-[#6F767E] mb-6">
          Oops! Page not found
        </p>

        {/* Subtext */}
        <p className="max-w-lg mx-auto text-[#6F767E] mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        {/* Button with subtle animation */}
        <Button
          asChild
          className="bg-[#1A1D1F] text-white hover:bg-[#1A1D1F]/90 rounded-lg px-6 h-12 text-base shadow-md transform hover:scale-105 transition-all"
        >
          <Link href="/" className="flex items-center gap-2">
            Go to Homepage
            <MoveRight className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      {/* Decorative element */}
      <div className="absolute top-16 left-1/3 w-72 h-72 bg-[#1A1D1F]/10 rounded-full blur-3xl opacity-70 -z-10"></div>
      <div className="absolute bottom-16 right-1/4 w-96 h-96 bg-[#6F767E]/10 rounded-full blur-3xl opacity-50 -z-10"></div>
    </div>
  );
}
