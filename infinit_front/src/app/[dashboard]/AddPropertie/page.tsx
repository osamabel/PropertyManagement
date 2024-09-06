"use client"
import axios from 'axios';
import React, { useState } from 'react'

function page() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [type, setType] = useState("");
    const [units, setUnits] = useState("");
    const [rentalCost, setRentalCost] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");
      setSuccess(false);

  
      try {
        await axios.post(
          `http://localhost:3001/properties`,
          {
            name,
            address,
            type,
            units,
            rentalCost
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setSuccess(true);
        setName("");
        setAddress("");
        setType("");
        setUnits("");
        setRentalCost("");
      } catch (err) {
        console.log(">>>" ,err)
        setError("Failed to add tenant. Please try again.");
      }
    };
  

    
    return (
        <div className="w-full h-full flex flex-col z-[30] gap-[40px] bg-white p-[10px] rounded-[6px] text-black">
          <h2 className="text-2xl font-bold mb-4">Property Info</h2>
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
                  htmlFor="address"
                >
                  address
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="Type"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
    
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="Units"
                >
                  Units
                </label>
                <input
                  type="text"
                  id="Units"
                  value={units}
                  onChange={(e) => setUnits(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="rentalCost"
                >
                  rentalCost
                </label>
                <input
                  type="text"
                  id="rentalCost"
                  value={rentalCost}
                  onChange={(e) => setRentalCost(e.target.value)}
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