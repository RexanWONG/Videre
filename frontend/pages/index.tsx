import React from 'react';
import type { NextPage } from 'next';
import { Banner, Card, Content } from '../components';
import Head from 'next/head';
import Logo from '../assets/videre-logo.png';

const Home: NextPage = () => {
  const faviconUrl = Logo.src;
  
  return (
    <div className="flex flex-col">
      <Head>
        <title>Videre™</title>
        <link rel="icon" href={faviconUrl} />
      </Head>
      <Banner />
      <Content />
    </div>
  );
};

export default Home;