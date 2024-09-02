import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    let pathTitle = location.pathname === '/' ? 'Home' : location.pathname.replace('/', '').replace(/-/g, ' ');
    pathTitle = pathTitle.charAt(0).toUpperCase() + pathTitle.slice(1); // Capitalize the first letter
    document.title = pathTitle;
    setTitle(pathTitle);
  }, [location]);

  return (
    <div className='h-[70px] w-full flex items-center justify-between px-[10px]'>
      <h1 className='text-[20px]'>{title}</h1>
      <div></div>
    </div>
  );
}

export default Header;
