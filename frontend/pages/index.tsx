import React from 'react';
import type {NextPage} from 'next';
import {Banner,Card} from '../components';

const Home : NextPage = () => {
  return (
    <div className='flex flex-col '>
    <Banner />
    </div>
  );
}

export default Home;
