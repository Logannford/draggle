'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AuthenticationButtonProps {
  content?: React.ReactNode
  buttonProps?: {
    href?: string
    className?: string
    prefetch?: boolean
    text?: string
  }
}

// Renaming the content function to avoid conflict
const renderContent = (text: string) => {
  return (
    <span>
      {text}
    </span>
  )
}

export default function AuthenticationButton({
  content,
  buttonProps = {} // Default value to avoid undefined error
}: AuthenticationButtonProps){
  const pathname = usePathname();

  const defaultButtonClasses = 
    "cursor-pointer bg-electric-violet hover:bg-electric-violet-600 duration-300 px-4 py-2 rounded-sm shadow-md shadow-electric-violet-700"
  
  const { 
    className, 
    href, 
    prefetch = true,
    text
  } = buttonProps

  return (
    <div className="z-20 text-white flex items-center text-sm gap-x-4 font-inter font-semibold">
      {content 
        ?? (pathname == '/login' 
          ? renderContent('Don\'t have an account?') 
          : renderContent('Already have an account?')
        )
      }
      <Link
        href={href ?? (pathname === '/login' ? '/sign-up' : '/login')}
        className={className ?? defaultButtonClasses}
        prefetch={prefetch}
      >
        {text ?? (pathname === '/login' ? 'Sign Up' : 'Login')}
      </Link>
    </div>
  )
}
