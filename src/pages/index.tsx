// pages/index.tsx
import Head from 'next/head';
import OrderState from '../components/OrderState';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Bar Order Management</title>
        <meta name="description" content="Bar Order Management System" />
      </Head>
      <main className="container mx-auto p-4">
        <OrderState />
      </main>
    </div>
  );
};

export default Home;
