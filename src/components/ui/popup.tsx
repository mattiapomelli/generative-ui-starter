import { useEffect, useRef } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PopupProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClose?: () => void;
  className?: string;
  onMouseLeave?: () => void;
}

export function Popup({ children, onMouseLeave, onClose, className, ...props }: PopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseUp = (event: MouseEvent) => {
      event.stopPropagation();

      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose?.();
      }
    };

    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onClose]);

  return (
    <Card
      {...props}
      ref={ref}
      className={cn(
        "max-h-[400px] w-[380px] overflow-y-auto rounded-xl bg-background py-3 text-sm",
        className,
      )}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Card>
  );
}
