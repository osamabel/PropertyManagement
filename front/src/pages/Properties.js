import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');

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

  return (
    <div className='w-full h-full'>
      <h1>Welcome to the Properties</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.name} - {property.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Properties;
