import * as React from "react"
import { cn } from "@/lib/utils"

// Option 1: Remove the interface and use the type directly
type InputProps = React.InputHTMLAttributes<HTMLInputElement>

// Option 2: Keep the interface but use type instead
// export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

// Option 3: Add additional props to the interface if needed
// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   // Add custom props here if needed in the future
//   // For example:
//   // wrapperClassName?: string;
// }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }