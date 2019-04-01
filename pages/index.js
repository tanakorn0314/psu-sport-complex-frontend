import React from 'react';
import Home from '../containers/Page/home';
import Head from 'next/head';
import Page from '../hocs/mainPage';

export default Page(() => (
  <>
      <Head>
          <title>Home</title>
      </Head>
      <Home />
  </>
));