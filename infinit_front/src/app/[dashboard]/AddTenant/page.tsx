"use client"
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const propertyId = searchParams.get('propertyId');
    const sectionId = searchParams.get('sectionId');
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [section, setSection] = useState(sectionId || "");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess(false);
  
      if (!propertyId) {
        setError("No property ID found.");
        return;
      }
  
      try {
        await axios.post(
          `http://localhost:3001/properties/${propertyId}/tenants`,
          {
            name,
            email,
            phone,
            section,
          },
          {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`,},
          }
        );
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setSection("");
      } catch (err) {
        console.log(">>>" ,err)
        setError("Failed to add tenant. Please try again.");
      }
    };
  

    
    return (
        <div className="w-full h-full flex flex-col z-[30] gap-[40px] bg-white p-[10px] rounded-[6px] text-black">
          <h2 className="text-2xl font-bold mb-4">Tenant Info</h2>
          <form
            className="h-full flex flex-col justify-between"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="section"
                >
                  Section
                </label>
                <input
                    disabled
                  type="text"
                  id="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
    
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {success && (
                <p className="text-green-500 mb-4">Tenant added successfully!</p>
              )}
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Add Tenant
            </button>
          </form>
        </div>
      );
}

export default page