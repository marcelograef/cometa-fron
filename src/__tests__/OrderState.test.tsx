// src/__tests__/OrderState.test.tsx
import React from 'react';
import { render, screen, waitFor, within, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderState from '../components/OrderState';

const mockOrder = {
  created: '2024-09-10 12:00:00',
  paid: false,
  subtotal: 100.0,
  taxes: 10.0,
  discounts: 5.0,
  items: [],
  rounds: [
    {
      created: '2024-09-10 12:00:30',
      items: [
        {
          name: 'Corona',
          quantity: 2,
          subtotal: 230.0,
        },
        {
          name: 'Club Colombia',
          quantity: 1,
          subtotal: 110.0,
        },
      ],
    },
    {
      created: '2024-09-10 12:20:31',
      items: [
        {
          name: 'Club Colombia',
          quantity: 1,
          subtotal: 110.0,
        },
        {
          name: 'Quilmes',
          quantity: 2,
          subtotal: 240.0,
        },
      ],
    },
    {
      created: '2024-09-10 12:43:21',
      items: [
        {
          name: 'Quilmes',
          quantity: 3,
          subtotal: 360.0,
        },
      ],
    },
  ],
};

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockOrder),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders loading state initially', () => {
  render(<OrderState />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders order details and rounds after data is fetched', async () => {
  await act(async () => {
    render(<OrderState />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Order State/i)).toBeInTheDocument();
  });

  const orderDetailsSection = screen.getByRole('region', {
    name: /order details/i,
  });
  const roundsSection = screen.getByRole('region', { name: /rounds/i });

  // Verify Order Details section
  expect(within(orderDetailsSection).getByText(/Created:/i)).toHaveTextContent(
    'Created: 2024-09-10 12:00:00'
  );
  expect(within(orderDetailsSection).getByText(/Paid:/i)).toHaveTextContent(
    'No'
  );
  expect(within(orderDetailsSection).getByText(/Subtotal:/i)).toHaveTextContent(
    '100'
  );
  expect(within(orderDetailsSection).getByText(/Taxes:/i)).toHaveTextContent(
    '10'
  );
  expect(
    within(orderDetailsSection).getByText(/Discounts:/i)
  ).toHaveTextContent('5');

  // Verify Round sections
  const round1 = within(roundsSection)
    .getByText(/Round 1/i)
    .closest('div');
  expect(within(round1!).getByText(/Created:/i)).toHaveTextContent(
    'Created: 2024-09-10 12:00:30'
  );
  expect(within(round1!).getByText(/Corona/i)).toBeInTheDocument();
  expect(within(round1!).getByText(/Quantity: 2/i)).toBeInTheDocument();
  expect(within(round1!).getByText(/Subtotal: \$230.00/i)).toBeInTheDocument();

  const round2 = within(roundsSection)
    .getByText(/Round 2/i)
    .closest('div');
  expect(within(round2!).getByText(/Created:/i)).toHaveTextContent(
    'Created: 2024-09-10 12:20:31'
  );

  const round3 = within(roundsSection)
    .getByText(/Round 3/i)
    .closest('div');
  expect(within(round3!).getByText(/Created:/i)).toHaveTextContent(
    'Created: 2024-09-10 12:43:21'
  );
});
