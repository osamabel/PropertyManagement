'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const router = useRouter(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      window.dispatchEvent(new CustomEvent('loginSuccess'));
      router.push('/dashboard/Properties');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center gap-[50px] relative overflow-hidden">
      <img className='absolute w-[80%] right-[-20%] opacity-[.07] z-[1]' src='/logo.svg' alt='logo'/>
      <div className='flex flex-col gap-[40px] items-center'>
        <img src='/logo.svg' alt='logo'/>
        <div>
          InfinitiveByte for Properties
        </div>
      </div>
      <div className='h-[400px] w-[300px] z-[20]'>
        <form className='flex flex-col h-full w-full justify-between items-center' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-[5px] items-center w-full'>

            <h2 className='mb-[30px] text-[20px]'>Login</h2>
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
            <button className='w-full bg-[#9300C8] p-[10px]' type="submit">Login</button>
            <div className='w-full flex items-center justify-between'>
              <p>don't have an account?</p>
              <a className='text-[#9300C8] font-[600]' href="/Signup">Signup</a>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
