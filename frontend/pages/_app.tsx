import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Navbar, Sidebar } from '../components';
import '../styles/globals.css';
import { MetaMaskSDK } from '@metamask/sdk';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const options = {
      dappMetadata: { name: "My Dapp", url: "https://mydapp.com" },
      injectProvider: true
    };

    const MMSDK = new MetaMaskSDK(options);
    const ethereum = MMSDK.getProvider();

    const checkAuthentication = async () => {
      if (ethereum && ethereum.isConnected()) {
        try {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          setIsAuthenticated(accounts.length > 0);
        } catch (error) {
          console.error('Error checking authentication:', error);
        }
      }
    };

    checkAuthentication();
  }, []);

  return (
    <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
      <Navbar />
      <div className='flex gap-6 md:gap-20 '>
        <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar isAuthenticated={isAuthenticated} />
        </div>
        <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;