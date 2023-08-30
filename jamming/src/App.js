import React from 'react';
import { TokenProvider } from './TokenContext';
import Authorize from './Authorize';

const App = () => {
  return (
    <TokenProvider>
      <Authorize />
    </TokenProvider>
  );
};

export default App;
