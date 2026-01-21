import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"
import {Spinner} from "@/components/ui/spinner.tsx";
import {Input} from "@/components/ui/input.tsx";

export function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export function LoadingInput() {
  return (
      <Input className={"animate-pulse bg-muted-foreground/20"}/>
  );
}

export function LoadingOverlay() {
    return (
        <div className="absolute inset-0 bg-black/45 z-60 flex items-center justify-center">
            <Spinner />
        </div>
    );
}

export function LoadingScreen() {
  return (
      <div className={"bg-background h-screen w-screen grid place-content-center"}>
          <Spinner/>
      </div>
  );
}
