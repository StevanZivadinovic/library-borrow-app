import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center'>
      <h2 className='text-2xl font-bold'>Not Found</h2>
      <p>Could not find requested resource!</p>
     <Button className="hover:bg-[var(--basic-cream)] cursor-pointer">
      <Link className='font-bold' href="/log-in">Return Login page..</Link>
      </Button>
    </div>
  )
}