import React from 'react';
import type { NextPage } from 'next';
import { Banner, Card, Content } from '../components';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Videre™</title>
      </Head>
      <Banner />
      <Content />
      
    </div>
  );
};

export default Home;