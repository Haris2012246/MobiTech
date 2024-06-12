import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import BottomTabNavigation from './BottomTabNavigation';

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
      <BottomTabNavigation />
    </NavigationContainer>
  );
};

export default AppNavigation;