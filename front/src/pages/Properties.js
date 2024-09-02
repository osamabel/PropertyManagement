import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CirclePlus, CreditCard, Pencil, Phone, User } from 'lucide-react';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/properties', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProperties(response.data);
        console.log("P:",response.data )
      } catch (err) {
        setError('Failed to fetch properties');
        console.error(err);
      }
    };

    fetchProperties();
  }, []);
console.log("PP", properties)
  return (
    properties && 
    <div className='w-full h-full flex z-[30] gap-[10px]'>
      {error && <p className="error">{error}</p>}
      <div className='flex flex-col gap-[7px] w-[300px]'>
        {properties.map((property, index) => (
          <div onClick={()=>setSelected(index)} key={property.id} className={`w-full ${selected === index ? "bg-white text-black" : "border-[1px] text-white"}   flex items-center gap-[5px] p-[10px] cursor-pointer`}>
            <img src='/avatarAppartment.svg' alt=''/>
            {property.name}
          </div>
        ))}
      </div>
      <div className='w-full max-h-full flex flex-col justify-between bg-white overflow-hidden text-black' >
        <div className='flex h-full '>
          <div className='flex-1 flex flex-col items-center justify-end'>
            <div><img src='/roof.svg' alt=''/></div>
            {
            properties[selected] && Array.from({ length: properties[selected].units }).map((_, unitIndex) => {
                const tenant = properties[selected].tenants.find(t => t.section === unitIndex + 1);
                const propertyId = properties[selected].id; 
                return (
                  <div key={unitIndex} className='hover:my-[10px] t-500 cursor-pointer relative flex items-center justify-center'>
                    {tenant ? (
                      <div className='absolute right-[-70%] top-[50%] translate-y-[-50%] bg-[#f3f3f3] rounded-[6px] p-[10px] flex flex-col gap-[10px] z-[40]'>
                        <div className='flex gap-2'>
                          <User/>
                          <p>{tenant.name}</p>
                        </div>
                        <div className='flex gap-2'>
                          <Phone/>
                          <p>{tenant.phone}</p>
                        </div>
                        <div className='flex gap-2'>
                          <CreditCard/>
                          <div className='flex items-center gap-[10px]'>{tenant.payments.length ? tenant.payments.map((p, index)=>(

                              <div className=''>{p.datePaid}
                              </div>
                            ))
                            : "no payments yet"}</div>
                        </div>
                      </div>
                    ) : (
                      <div className='absolute w-[90%] h-[100%] flex'>
                         <a className='text-green-800 flex items-center gap-[5px] justify-center w-full bg-white/70 font-[600] rounded-[5px] p-[10px]' 
                          href={`/AddTenant?propertyId=${propertyId}`}
                          >
                          <CirclePlus/>
                        </a>
                      </div>
                    )}
                    <img src='/unit.svg' alt={`Unit ${unitIndex + 1}`} />
                  </div>
                );
              })}

            <div><img src='/base.svg' alt=''/></div>
          </div>
          <div className='flex-1 flex flex-col items-center w-full justify-between py-[20px]'>
            <div className='flex justify-between items-center w-full h-[60px] px-[10px]'>
              <h1 className='font-[600] text-[50px] text-wrap leading-[40px]'>{properties[selected] && properties[selected].name}</h1>
              <a className='' href="/Tenants">
                <Pencil/>
              </a>
            </div>
            <ul className='list-disc  text-[20px] font-[600] '>
              <li>{properties[selected] && properties[selected].type}</li>
              <li>{properties[selected] && properties[selected].units} units</li>
              <li>{properties[selected] && properties[selected].address}</li>
              <li>{properties[selected] && properties[selected].rentalCost} Dollars</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
