import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}

export function ContentSection({ 
  title, 
  description, 
  children, 
  className = "",
  centered = true 
}: ContentSectionProps) {
  return (
    <section className={`w-full py-24 md:py-40 bg-gray-950 ${className}`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={centered ? "text-center" : ""}>
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-red-400 mb-8">
            {title}
          </h2>
          {description && (
            <p className="mx-auto max-w-[900px] text-blue-200 md:text-xl lg:text-2xl leading-relaxed opacity-90 mb-16">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
