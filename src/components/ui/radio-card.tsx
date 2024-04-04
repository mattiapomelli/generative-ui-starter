import { ReactNode } from "react";

import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroupItem, RadioGroupItemProps } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioCardProps extends RadioGroupItemProps {
  value: string;
  icon: ReactNode;
  label: string;
  checked?: boolean;
  className?: string;
}

export function RadioCard({ value, icon, checked, label, className, ...props }: RadioCardProps) {
  return (
    <FormItem>
      <FormControl>
        <div>
          <RadioGroupItem value={value} id={value} className="peer sr-only" {...props} />
          <FormLabel
            htmlFor={value}
            className={cn(
              "relative flex cursor-pointer flex-col items-center justify-between gap-3 rounded-md border-2 border-muted bg-popover px-2 py-4 hover:bg-secondary-focus hover:text-secondary-foreground",
              {
                "bg-secondary-focus border-accent": checked,
              },
              className,
            )}
          >
            {icon}
            {label}
          </FormLabel>
        </div>
      </FormControl>
    </FormItem>
  );
}
