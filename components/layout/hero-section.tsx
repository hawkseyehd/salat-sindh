import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  backgroundPattern?: boolean;
}

export function HeroSection({ 
  title, 
  description, 
  children, 
  className = "",
  backgroundPattern = true 
}: HeroSectionProps) {
  return (
    <section className={`w-full py-24 md:py-40 lg:py-56 bg-gradient-to-br from-blue-900 to-blue-950 text-white text-center relative overflow-hidden ${className}`}>
      {backgroundPattern && (
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      )}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl/none mb-8 text-red-400 drop-shadow-lg">
          {title}
        </h1>
        {description && (
          <p className="mx-auto max-w-[1000px] text-blue-200 md:text-xl lg:text-2xl mb-20 leading-relaxed opacity-90">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
