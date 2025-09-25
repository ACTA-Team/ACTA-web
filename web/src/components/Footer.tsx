;
import Image from "next/image";

export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-2">
          <Image 
            src="/Acta-logo.png" 
            alt="Acta Logo" 
            width={24} 
            height={24} 
            className="w-6 h-6"
          />
          <span className="text-xl font-bold">Acta</span>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © 2025 Acta. The new infrastructure for digital trust.
        </div>
      </div>
    </div>
  );
}