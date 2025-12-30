import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("font-poppins text-foreground", {
  variants: {
    size: {
      h1: "text-4xl md:text-5xl leading-tight tracking-tight",
      h2: "text-3xl md:text-4xl leading-tight tracking-tight",
      h3: "text-2xl md:text-3xl leading-snug",
      h4: "text-xl md:text-2xl leading-snug",
      h5: "text-lg md:text-xl leading-snug",
      h6: "text-base md:text-lg leading-normal",
      p: "text-base leading-relaxed",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
  },
  defaultVariants: {
    size: "p",
    weight: "regular",
    align: "left",
  },
});

type TextTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

type TextProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: TextTag;
  };

function Text({
  className,
  size = "p",
  weight,
  align,
  as,
  ...props
}: TextProps) {
  const tag: TextTag = as ?? (size !== "p" ? (size as TextTag) : "p");
  const Tag = tag as React.ElementType;

  return (
    <Tag
      className={cn(textVariants({ size, weight, align, className }))}
      {...props}
    />
  );
}

export { Text, textVariants };
