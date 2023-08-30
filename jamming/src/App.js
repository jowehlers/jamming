import React from 'react';
import { TokenProvider } from './components/Authorization/TokenContext';
import Authorize from './components/Authorization/Authorize';

const App = () => {
  return (
    <TokenProvider>
      <Authorize />
    </TokenProvider>
  );
};

export default App;
