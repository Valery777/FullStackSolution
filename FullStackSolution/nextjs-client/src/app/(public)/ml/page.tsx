import React, { Suspense } from 'react';

import type { Metadata } from 'next';
import ML from './ML';
//import Chat from './Chat';
import HousingPredictPrice from './HousingPredictPrice';
//import StyleTransformer from './StyleTransformer';
export const metadata: Metadata = {
    title: 'ML',

}
export default function ml() {
  return (
      <Suspense>
          <ML />
          {/*<h1>.NET 8 + React AI Demo</h1>
          <Chat />*/}
        
          <HousingPredictPrice />
      </Suspense>
      
  );
};

 