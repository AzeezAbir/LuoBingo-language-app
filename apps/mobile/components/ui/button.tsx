import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Platform, Pressable } from "react-native";
import * as React from "react";

const buttonVariants = cva(
  cn(
    "group shrink-0 flex-row items-center justify-center gap-2 rounded-xl border border-transparent bg-background",
    Platform.select({
      web: "whitespace-nowrap transition-all outline-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    }),
  ),
  {
    variants: {
      variant: {
        default:
          "bg-white border-white/20 border-2 border-b-[4px] active:border-b-transparent active:translate-y-1",
        primary:
          "bg-[#1CB0F6] border-[#1CB0F6]/50 border-b-[4px] active:border-b-transparent active:translate-y-1",
        secondary:
          "bg-[#58CC02] border-[#58CC02]/50 border-b-[4px] active:border-b-transparent active:translate-y-1",
        destructive:
          "bg-[#EA2B2B] border-[#EA2B2B]/50 border-b-[4px] active:border-b-transparent active:translate-y-1",
        outline:
          "border-2 border-[#1CB0F6]/50 active:border-b-transparent active:translate-y-1 bg-transparent",
        disabled: "bg-[#E5E5E5] dark:bg-[#37464F]",
        link: "bg-transparent",
        premium:
          "bg-[#1CB0F6] border-2 border-b-[4px] active:border-b-transparent active:translate-y-1", // Fallback for gradient
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

const buttonTextVariants = cva(
  cn(
    "font-sans text-sm font-bold tracking-wider",
    Platform.select({ web: "pointer-events-none transition-colors" }),
  ),
  {
    variants: {
      variant: {
        default: "text-black dark:text-bg-dark uppercase",
        primary: "text-white uppercase dark:text-bg-dark",
        secondary: "text-white uppercase dark:text-bg-dark",
        destructive: "text-white uppercase dark:text-bg-dark",
        outline: "text-[#1CB0F6] dark:text-[#1CB0F6]/80 uppercase",
        disabled: "text-[#AFAFAF] dark:text-[#52656D] uppercase",
        link: "text-[#1CB0F6] dark:text-[#1CB0F6]/80 underline uppercase",
        premium: "text-white uppercase",
        card: "text-black dark:text-card-foreground capitalize",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
        rounded: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>(({ className, variant, size, ...props }, ref) => {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
});
Button.displayName = "Button";

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
