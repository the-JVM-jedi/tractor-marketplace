'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DealerDetailsPage() {
  const router = useRouter();
//   const { id } = router.query; // Dynamic id from URL
  const id = 1;
  const [dealer, setDealer] = useState(null);

  useEffect(() => {
    if (id) {
      // Replace this with your data-fetching logic (API call, etc.)
      const dealers = [
        {
          id: '1',
          name: 'CMC (New Holland Dealer)',
          phone: '722283433',
          address: 'Lusaka Rd, Nairobi',
          region: 'Nairobi',
        },
        {
          id: '2',
          name: 'Mascor (John Deere)',
          phone: '254 207 602 298',
          address: 'Uganda Rd, Eldoret',
          region: 'Eldoret',
        },
        // Add more dealers here
      ];

      const selectedDealer = dealers.find((dealer) => dealer.id === id);
      setDealer(selectedDealer);
    }
  }, [id]);

  if (!dealer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dealer-details mt-200">
      <h2>{dealer.name}</h2>
      <p><strong>Phone:</strong> {dealer.phone}</p>
      <p><strong>Address:</strong> {dealer.address}</p>
      <p><strong>Region:</strong> {dealer.region}</p>
      <h3>Services Offered</h3>
      <ul>
        <li>Sales</li>
        <li>Repairs</li>
        <li>Maintenance</li>
      </ul>
      <h3>Request Service</h3>
      <button onClick={() => alert('Service request feature coming soon!')}>
        Request Service
      </button>
    </div>
  );
};


