import { Star } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Image 
            src="/Acta-logo.png" 
            alt="Acta Logo" 
            width={24} 
            height={24} 
            className="w-6 h-6"
          />
          <span className="text-xl font-bold">Acta</span>
        </div>
        <div className="flex space-x-6 text-sm text-muted-foreground">
          <a href="/legal/terms" className="hover:text-foreground transition-colors">
            Terms of Service
          </a>
          <a href="/legal/privacy" className="hover:text-foreground transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            GitHub
          </a>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border/30 text-center text-sm text-muted-foreground">
        © 2025 Acta. The new infrastructure for digital trust.
      </div>
    </div>
  );
}