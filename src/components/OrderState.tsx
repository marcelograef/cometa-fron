// components/OrderState.tsx
import React, { useEffect, useState } from 'react';

interface OrderItem {
  name: string;
  quantity: number;
  subtotal: number;
}

interface Round {
  created: string;
  items: OrderItem[];
}

interface Order {
  created: string;
  paid: boolean;
  subtotal: number;
  taxes: number;
  discounts: number;
  items: any[];
  rounds: Round[];
}

const OrderState: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetch('/api/order')
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error('Error fetching order:', error));
  }, []);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Order State
      </h1>
      <div
        className="bg-white p-6 rounded-lg shadow-md mb-6"
        role="region"
        aria-label="Order Details"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">
          Order Details
        </h2>
        <div className="mb-4">
          <p>
            <span className="font-bold text-gray-700">Created:</span>{' '}
            {order.created}
          </p>
          <p>
            <span className="font-bold text-gray-700">Paid:</span>{' '}
            <span className={order.paid ? 'text-green-600' : 'text-red-600'}>
              {order.paid ? 'Yes' : 'No'}
            </span>
          </p>
          <p>
            <span className="font-bold text-gray-700">Subtotal:</span> $
            {order.subtotal}
          </p>
          <p>
            <span className="font-bold text-gray-700">Taxes:</span> $
            {order.taxes}
          </p>
          <p>
            <span className="font-bold text-gray-700">Discounts:</span> $
            {order.discounts}
          </p>
        </div>
      </div>
      <div
        className="bg-white p-6 rounded-lg shadow-md"
        role="region"
        aria-label="Rounds"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-700">Rounds</h2>
        {order.rounds.map((round, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <h3 className="text-xl font-medium mb-2 text-gray-800">
              Round {index + 1}
            </h3>
            <p className="text-gray-600 mb-4">
              <span className="font-bold text-gray-700">Created:</span>{' '}
              {round.created}
            </p>
            <ul className="list-disc list-inside">
              {round.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-2">
                  <span className="font-semibold text-gray-800">
                    {item.name}
                  </span>{' '}
                  - Quantity: {item.quantity} - Subtotal: ${item.subtotal}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderState;
