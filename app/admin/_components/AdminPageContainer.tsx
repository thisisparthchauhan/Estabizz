import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function AdminPageContainer({ children, className }: Props) {
  return (
    <div
      className={`w-full max-w-[1440px] mx-auto px-4 sm:px-5 md:px-6 xl:px-8 py-6 lg:py-8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
