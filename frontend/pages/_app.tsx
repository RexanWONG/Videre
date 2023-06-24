import type {AppProps} from 'next/app';
import {UseState, useEffect} from 'react';

import '../styles/globals.css'

const MyApp = ({Component, pageProps} : AppProps) => {
  
  return(
    <div>
      Navbar
      Sidebar
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
