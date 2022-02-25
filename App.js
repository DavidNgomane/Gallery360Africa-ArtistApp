import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './src/Screens/Splash';
import Onboarding from './src/Screens/Onboarding';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
      >
        <Stack.Screen options={{headerShown: false}} name='Splash' component={Splash} />
        <Stack.Screen options={{headerShown: false}} name='Onboarding' component={Onboarding} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;