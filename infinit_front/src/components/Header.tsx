"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

function Header() {
  const pathname = usePathname();
  const [title, setTitle] = useState('');

  useEffect(() => {
    let pathTitle = pathname === '/' ? 'Home' : pathname.replace('/', '').replace(/-/g, ' ');
    pathTitle = pathTitle.charAt(0).toUpperCase() + pathTitle.slice(1); 
    
    document.title = pathTitle; 
    setTitle(pathTitle);
  }, [pathname]); 

  return (
    <div className='h-[70px] w-full flex items-center justify-between px-[10px]'>
      <h1 className='text-[20px]'>{title}</h1>
      <div></div>
    </div>
  );
}

export default Header;
