'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
} from 'motion/react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SheetContextType = {
  isOpen: boolean;
};

const SheetContext = React.createContext<SheetContextType | undefined>(
  undefined
);

const useSheet = (): SheetContextType => {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a Sheet');
  }
  return context;
};

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

function Sheet({ children, ...props }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(
    props?.open ?? props?.defaultOpen ?? false
  );

  React.useEffect(() => {
    if (props?.open !== undefined) {
      setIsOpen(props.open);
    }
  }, [props?.open]);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props]
  );

  return (
    <SheetContext.Provider value={{ isOpen }}>
      <SheetPrimitive.Root
        data-slot="sheet"
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </SheetPrimitive.Root>
    </SheetContext.Provider>
  );
}

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;

function SheetPortal(props: SheetPortalProps) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

type SheetOverlayProps = React.ComponentProps<typeof SheetPrimitive.Overlay>;

function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay
      className={cn('fixed inset-0 z-50 bg-black/80', className)}
      data-slot="sheet-overlay"
      {...props}
    />
  );
}

const sheetVariants = cva('fixed z-50 gap-4 bg-background p-6 shadow-lg', {
  variants: {
    side: {
      top: 'inset-x-0 top-0 border-b',
      bottom: 'inset-x-0 bottom-0 border-t',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
    },
  },
  defaultVariants: {
    side: 'right',
  },
});

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants> &
  HTMLMotionProps<'div'> & {
    transition?: Transition;
    overlay?: boolean;
  };

function SheetContent({
  side = 'right',
  className,
  transition = { type: 'spring', stiffness: 150, damping: 25 },
  overlay = true,
  children,
  ...props
}: SheetContentProps) {
  const { isOpen } = useSheet();

  return (
    <AnimatePresence>
      {isOpen && (
        <SheetPortal data-slot="sheet-portal" forceMount>
          {overlay && (
            <SheetOverlay asChild forceMount>
              <motion.div
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                data-slot="sheet-overlay"
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                key="sheet-overlay"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </SheetOverlay>
          )}
          <SheetPrimitive.Content asChild forceMount {...props}>
            <motion.div
              animate={{ x: 0, y: 0, opacity: 1 }}
              className={cn(sheetVariants({ side }), className)}
              data-slot="sheet-content"
              exit={
                side === 'right'
                  ? { x: '100%', opacity: 0 }
                  : side === 'left'
                    ? { x: '-100%', opacity: 0 }
                    : side === 'top'
                      ? { y: '-100%', opacity: 0 }
                      : { y: '100%', opacity: 0 }
              }
              initial={
                side === 'right'
                  ? { x: '100%', opacity: 0 }
                  : side === 'left'
                    ? { x: '-100%', opacity: 0 }
                    : side === 'top'
                      ? { y: '-100%', opacity: 0 }
                      : { y: '100%', opacity: 0 }
              }
              key="sheet-content"
              transition={transition}
              {...props}
            >
              {children}
              <SheetPrimitive.Close
                className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                data-slot="sheet-close"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </SheetPrimitive.Close>
            </motion.div>
          </SheetPrimitive.Content>
        </SheetPortal>
      )}
    </AnimatePresence>
  );
}

type SheetHeaderProps = React.ComponentProps<'div'>;

function SheetHeader({ className, ...props }: SheetHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className
      )}
      data-slot="sheet-header"
      {...props}
    />
  );
}

type SheetFooterProps = React.ComponentProps<'div'>;

function SheetFooter({ className, ...props }: SheetFooterProps) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
        className
      )}
      data-slot="sheet-footer"
      {...props}
    />
  );
}

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

function SheetTitle({ className, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      className={cn('font-semibold text-foreground text-lg', className)}
      data-slot="sheet-title"
      {...props}
    />
  );
}

type SheetDescriptionProps = React.ComponentProps<
  typeof SheetPrimitive.Description
>;

function SheetDescription({ className, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      data-slot="sheet-description"
      {...props}
    />
  );
}

export {
  useSheet,
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  type SheetProps,
  type SheetPortalProps,
  type SheetOverlayProps,
  type SheetTriggerProps,
  type SheetCloseProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
};
