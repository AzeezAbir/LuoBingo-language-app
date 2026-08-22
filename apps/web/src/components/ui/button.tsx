import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center uppercase tracking-wider rounded-xl border border-transparent bg-clip-padding text-sm font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4 text-background font-bold dark:text-background/90 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white border-white/20 border-2 border-b-[4px] active:border-b-2",
        primary:
          "bg-[#1CB0F6] border-[#1CB0F6]/50 border-b-[4px] active:border-b-[0px] active:mt-[4px]",
        secondary:
          "bg-[#58CC02] border-[#58CC02]/50 border-b-[4px] active:border-b-[0px] active:mt-[4px]",
        destructive:
          "bg-[#EA2B2B] border-[#EA2B2B]/50 border-b-[4px] active:border-b-[0px] active:mt-[4px]",
        outline:
          "border-2 border-[#1CB0F6]/50 active:border-b-2 bg-transparent",
        disabled: "bg-[#52656D]",
        link: "bg-transparent",
        premium: "bg-[#1CB0F6] border-2 border-b-[4px] active:border-b-2", // Fallback for gradient
        card: "bg-white dark:bg-background border-2 border-[#37464F] active:border-[#1CB0F6]",
      },
      size: {
        default: "h-11 px-10 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full h-11 px-10 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  style,

  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      style={{
        textTransform: variant === "card" ? "capitalize" : "uppercase",
        ...style,
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
export default Button;
