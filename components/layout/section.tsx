import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
}

export function Section({ children, className = "", container = true }: SectionProps) {
  const content = container ? (
    <div className="container mx-auto px-4 md:px-8">
      {children}
    </div>
  ) : (
    children
  );

  return (
    <section className={className}>
      {content}
    </section>
  );
}
