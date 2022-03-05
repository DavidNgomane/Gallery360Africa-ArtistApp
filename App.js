import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Splash from './src/Screens/Splash';
import Onboarding from './src/Screens/Onboarding';
import SignIn from './src/Screens/SignIn';
import SignUp from './src/Screens/SignUp';
import Home from './src/Screens/Home';
import Sales from './src/Screens/Sales';
import Products from './src/Screens/Products';
import LandingPage from './src/Screens/LandingPage';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        showPageIndicator: false,
        tabBarPressColor: '#000',
        swipeEnabled: false,
        tabBarStyle: {
          height: 50,
          minHeight: 0,
          //borderRadius: 20,
          marginHorizontal: -1,
          width: 'auto',
          backgroundColor: '#fff',
          headerShadowVisible: false,
          margin: 5,
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#ceb89e',
        tabBarPressColor: '#000',
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Sales' component={Sales} />
      <Tab.Screen name='Products' component={Products} />
    </Tab.Navigator>
  )
}

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LandingPage'
      >
        <Stack.Screen options={{headerShown: false}} name='Splash' component={Splash} />
        <Stack.Screen options={{headerShown: false}} name='Onboarding' component={Onboarding} />
        <Stack.Screen options={{headerShown: false}} name='SignIn' component={SignIn} />
        <Stack.Screen options={{headerShown: false}} name='SignUp' component={SignUp} />
        <Stack.Screen 
          name='LandingPage' 
          component={TabNavigator}
          options={({navigation}) => ({
            // headerLeft: () => {return null;},
            // headerBackVisible: false,
            headerTitleStyle: {
              color: '#ceb89e',
              fontWeight: 'bold'
            },
            title: 'Gallery 360 Africa',
            headerRight: () => (
              <View style={{flexDirection: 'row', width: 45, justifyContent: 'space-between', }}>
                <TouchableOpacity>
                  <Image source={require('../Gallery360Africa-ArtistApp/src/assets/images/Ellipse.png')}/>
                </TouchableOpacity>
              </View>
                )       
              })}
            />

        <Stack.Screen options={{headerShown: false, }} name='Home' component={Home} />
        <Stack.Screen options={{headerShown: false}} name='Sales' component={Sales} />
        <Stack.Screen options={{headerShown: false}} name='Products' component={Products} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;