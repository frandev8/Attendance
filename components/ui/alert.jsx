import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "tw-relative tw-w-full tw-rounded-lg tw-border tw-border-slate-200 tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-slate-950 dark:tw-border-slate-800 dark:[&>svg]:tw-text-slate-50",
  {
    variants: {
      variant: {
        default: "tw-bg-white tw-text-slate-950 dark:tw-bg-slate-950 dark:tw-text-slate-50",
        destructive:
          "tw-border-red-500/50 tw-text-red-500 dark:tw-border-red-500 [&>svg]:tw-text-red-500 dark:tw-border-red-900/50 dark:tw-text-red-900 dark:dark:tw-border-red-900 dark:[&>svg]:tw-text-red-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props} />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", className)}
    {...props} />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("tw-text-sm [&_p]:tw-leading-relaxed", className)}
    {...props} />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
