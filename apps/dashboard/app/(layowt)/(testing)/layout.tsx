import { redirect } from "next/navigation";

export default function Layout({ 
  children 
}: Readonly<{
  children: React.ReactNode;
}>){
  // redirect off this page on the production site
  if (process.env.NODE_ENV === 'production') {
    redirect('/')
  }

  return (
    <div className="h-screen flex justify-center items-center">
      {children}
    </div>
  )
}