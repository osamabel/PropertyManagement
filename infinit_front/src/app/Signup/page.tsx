'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); 


const handleSubmit = async (e:any) => {
  e.preventDefault();
      try {
          await axios.post('http://localhost:3001/signup', {
          username,
          password,
          });
          router.push('/');
      } catch (err) {
          setError('Error');
      }
  };
  
  return (
    <div className="w-full h-screen flex flex-row-reverse items-center justify-center gap-[50px] relative overflow-hidden">
      <img className='absolute w-[80%] right-[-20%] opacity-[.07] z-[1]'  src='/logo.svg' alt='logo'/>
      <div className='flex flex-col gap-[40px] items-center'>
        <img src='/logo.svg' alt='logo'/>
        <div>
          InfinitiveByte for Properties
        </div>
      </div>
      <div className='h-[400px] w-[300px] z-[20]'>
        <form className='flex flex-col h-full w-full justify-between items-center' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-[5px] items-center w-full'>

            <h2 className='mb-[30px] text-[20px]'>Create account</h2>
            {error && <p className="error">{error}</p>}
            <input
              className='w-full bg-[#1B1B1B] p-[10px]'
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
            <input
              className='w-full bg-[#1B1B1B] p-[10px]'
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className='w-full flex flex-col gap-[10px]'>
            <button className='w-full bg-[#9300C8] p-[10px]' type="submit">Sign up</button>
            <div className='w-full flex items-center justify-between'>
              <p>you have an account?</p>
              <a className='text-[#9300C8] font-[600]' href="/">Login</a>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default page