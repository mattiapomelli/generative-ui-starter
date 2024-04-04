import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  onlyIcon?: boolean;
  className?: string;
}

export function Logo({ onlyIcon = false, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg height="24" width="24">
        <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="3" fill="yellow" />
      </svg>
      {!onlyIcon && <span className="mt-1 font-heading font-bold">{siteConfig.name}</span>}
    </div>
  );
}
