import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { PropsWithChildren } from "react";

interface TooltipProps extends PropsWithChildren {
  tooltipcontent: string;
  disabled?: boolean;
}

export function Tooltip({ tooltipcontent, children, disabled }: TooltipProps) {
  if (disabled) {
    return (
      <span className="inline-flex items-center cursor-not-allowed opacity-60">
        {children}
      </span>
    );
  }

  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          <span className="cursor-pointer inline-flex items-center">
            {children}
          </span>
        </RadixTooltip.Trigger>

        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side="top"
            sideOffset={4}
            className={
              "rounded-md px-2 py-1 text-sm bg-black text-white shadow-lg"
            }
          >
            {tooltipcontent}
            <RadixTooltip.Arrow className="fill-black" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
