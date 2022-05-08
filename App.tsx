import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { BottomTab } from './app/screens/bottom-tab.navigator';


const App = () => {
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
};

export default App;
