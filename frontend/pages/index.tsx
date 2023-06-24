import React from 'react';
import type {NextPage} from 'next';
import {Banner} from '../components';

const Home : NextPage = () => {
  return (
    <div className='flex flex-col gap-10 h-full'>
    <Banner />
    </div>
  );
}

export default Home;
