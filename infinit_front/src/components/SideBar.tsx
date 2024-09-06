"use client"
import React from 'react'
import { CirclePlus, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation';



function SideBar() {
  const logout = () => {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('token');
      router.push('/');
    }
  }
  
  return (
    <div className='w-[300px] h-screen bg-primary flex flex-col items-center justify-between px-[10px] py-[20px]' >
      <div>
        <img className='w-[70px]' src='/logo.svg' alt="logo"/>
      </div>
      <div className='w-full flex flex-col gap-[50px]'>

      <div className='w-full flex flex-col gap-[10px] '>
        <a className='text-primary w-full bg-white font-[600] text-center rounded-[5px] p-[10px]' href="/dashboard/Properties">Properties</a>
        <a className='text-primary w-full bg-white font-[600] text-center rounded-[5px] p-[10px]' href="/dashboard/Tenants">Tenants</a>
        <a className='text-primary w-full bg-white font-[600] text-center rounded-[5px] p-[10px]' href="/dashboard/Payments">Payments</a>
      </div>

      <div className='w-full flex flex-col gap-[10px] '>
        <a className='text-primary flex items-center gap-[5px] justify-center w-full bg-white font-[600] rounded-[5px] p-[10px]' href="/dashboard/AddPropertie">
          <CirclePlus/>
          <span>Add a new property</span>
        </a>
        {/* <a className='text-primary flex items-center gap-[5px] justify-center w-full bg-white font-[600] rounded-[5px] p-[10px]' href="/AddTenant">
          <CirclePlus/>
          <span>Add a new Tenant</span>
        </a> */}
      </div>

      </div>
      <div className='w-full'>
        <div onClick={logout}  className='text-primary flex items-center gap-[5px] justify-center w-full bg-white font-[600] rounded-[5px] p-[10px]'>
          <LogOut/>
          <span>Logout</span>
        </div>
      </div>
    </div>
  )
}

export default SideBar