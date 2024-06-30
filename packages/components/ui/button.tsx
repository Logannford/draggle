import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { IonSparkles } from '@/components/ui/icons/sparkle';

import { cn } from '@/utils/index';

const buttonVariants = cva(
  'relative w-full inline-flex items-center font-inter justify-center whitespace-nowrap duration-300 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-white font-satoshi',
  {
    variants: {
      variant: {
        default:
          'bg-electric-violet-500 hover:bg-electric-violet-600 text-white border-2 border-electric-violet-300',
          destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
          outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
          secondary:
          'border-2 border-electric-violet-300 hover:bg-electric-violet-500 shadow-sm hover:shadow-md',
        tertiary:
          'bg-white hover:bg-white hover:text-black duration-300 text-black rounded-xl hover:rounded-lg',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-white',
        none: '!rounded-none'
      },
      size: {
        default: 'h-10',
        sm: 'h-8 rounded-md px-3 py-1',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10'
      },
      padding: {
        none: '!p-0'
      },
      rounded: {
        default: 'rounded-2xl hover:rounded-xl',
        sm: 'rounded-md'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorElementProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps
  extends VariantProps<typeof buttonVariants> {
  href?: string;
  asChild?: boolean;
  special?: boolean;
  arrow?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonProps & (ButtonElementProps | AnchorElementProps)
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      special,
      rounded,
      href,
      arrow,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : href ? 'a' : 'button';
    return (
      <div 
        className={cn(
          special && 'w-full',
          'relative'
        )}
      >
          <Comp
            className={cn(
              arrow && 'px-10 overflow-hidden relative group',
              buttonVariants({ variant, size, className, rounded })
            )}
            ref={ref}
            href={href}
            {...(props as any)}
          >
            {props.children}
            {arrow ? (
              <div className="overflow-hidden absolute right-4">
                <ArrowRightIcon 
                  className="
                    size-5 ml-2 -translate-x-4 oveflow-hidden opacity-0
                    transition-transform duration-300 group-hover:translate-x-0
                    group-hover:opacity-100
                  " 
                />
              </div>
            ) : null}
          </Comp>
          {special ? (
            <IonSparkles className="absolute -top-2.5 right-2 size-6 text-yellow-400 " />
          ) : null}
      </div>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
