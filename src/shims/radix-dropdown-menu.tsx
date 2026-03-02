"use client";

import * as React from "react";

type RootProps = {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

type TriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
};

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
};

const DropdownMenuContext = React.createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

function useDropdownMenuContext() {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) {
    return { open: false, setOpen: () => undefined };
  }
  return ctx;
}

export function Root({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: RootProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internalOpen;

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) setInternalOpen(nextOpen);
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DropdownMenuContext.Provider value={{ open: actualOpen, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

export function Portal({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(
  ({ asChild, children, onClick, ...props }, ref) => {
    const { open, setOpen } = useDropdownMenuContext();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (!e.defaultPrevented) setOpen(!open);
    };

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children as React.ReactElement<
          React.ButtonHTMLAttributes<HTMLButtonElement>
        >,
        {
          onClick: handleClick,
          ref,
        },
      );
    }

    return (
      <button ref={ref} type="button" onClick={handleClick} {...props}>
        {children}
      </button>
    );
  },
);
Trigger.displayName = "DropdownMenuTrigger";

export const Content = React.forwardRef<HTMLDivElement, ContentProps>(
  ({ children, ...props }, ref) => {
    const { open } = useDropdownMenuContext();
    if (!open) return null;
    return (
      <div ref={ref} role="menu" {...props}>
        {children}
      </div>
    );
  },
);
Content.displayName = "DropdownMenuContent";

export function Group({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export const Item = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  const { setOpen } = useDropdownMenuContext();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    props.onClick?.(e);
    if (!e.defaultPrevented) setOpen(false);
  };
  return (
    <div ref={ref} role="menuitem" tabIndex={0} {...props} onClick={handleClick}>
      {children}
    </div>
  );
});
Item.displayName = "DropdownMenuItem";

export const CheckboxItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { checked?: boolean }
>(({ children, ...props }, ref) => {
  return (
    <Item ref={ref} {...props}>
      {children}
    </Item>
  );
});
CheckboxItem.displayName = "DropdownMenuCheckboxItem";

export function ItemIndicator({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export function RadioGroup({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export const RadioItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <Item ref={ref} {...props}>
      {children}
    </Item>
  );
});
RadioItem.displayName = "DropdownMenuRadioItem";

export function Label({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>{children}</div>;
}

export function Separator(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="separator" {...props} />;
}

export function Sub({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}

export const SubTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
SubTrigger.displayName = "DropdownMenuSubTrigger";

export const SubContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
SubContent.displayName = "DropdownMenuSubContent";
