// import React from 'react';
// import Home from '../containers/Page/home';
// import Head from 'next/head';
// import Page from '../hocs/mainPage';

// export default Page(() => (
//   <>
//       <Head>
//           <title>Home</title>
//       </Head>
//       <Home />
//   </>
// ));

import React from 'react';
import Head from 'next/head';
import Booking from '../containers/Page/booking';
import Page from '../hocs/bookingPage';

export default Page(() => (
    <>
        <Head>
            <title>Booking</title>
        </Head>
        <Booking/>
    </>
))