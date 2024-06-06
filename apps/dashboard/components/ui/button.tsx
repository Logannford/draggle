import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { IonSparkles } from './icons/sparkle';
import { m as motion } from 'framer-motion';

import { cn } from '@/utils/index';

const buttonVariants = cva(
  'relative w-full inline-flex items-center font-inter justify-center whitespace-nowrap duration-300 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-2 border-electric-violet-300 hover:bg-electric-violet-500 shadow-sm hover:shadow-md',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-electric-violet-500 hover:bg-electric-violet-600 text-white border-2 border-electric-violet-300 rounded-xl hover:rounded-lg',
        tertiary:
          'bg-white hover:bg-white hover:text-black duration-300 text-black rounded-xl hover:rounded-lg',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        none: '!rounded-none'
      },
      size: {
        default: 'h-10 px-4',
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  special?: boolean;
  hoverEffect?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      special,
      hoverEffect = true,
      rounded,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <div className={special ? 'relative w-full' : ''}>
        {/** Conditionally make the button have a spring hover effect */}
        {hoverEffect ? (
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <Comp
              className={cn(
                buttonVariants({ variant, size, className, rounded })
              )}
              ref={ref}
              {...props}
            />
            {special ? (
              <IonSparkles className="absolute -top-2.5 right-2 size-6 text-yellow-400 " />
            ) : (
              ''
            )}
          </motion.div>
        ) : (
          <Comp
            className={cn(
              buttonVariants({ variant, size, className, rounded })
            )}
            ref={ref}
            {...props}
          />
        )}
      </div>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
