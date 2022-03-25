import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
// 
import Splash from './src/Screens/Splash';
import Onboarding from './src/Screens/Onboarding';
import SignIn from './src/Screens/SignIn';
import SignUp from './src/Screens/SignUp';
import Home from './src/Screens/Home';
import Sales from './src/Screens/Sales';
import Products from './src/Screens/Products';
import LandingPage from './src/Screens/LandingPage';
import Profile from './src/Screens/Profile';
import Settings from './src/Screens/Settings';
import TermsAndConditions from './src/assets/components/TermsAndConditions';

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
          marginHorizontal: -1,
          width: 'auto',
          backgroundColor: '#ceb89e',
          marginTop: 5,
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#fff',
        tabBarPressColor: '#000',
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Sales' component={Sales} />
      <Tab.Screen name='Products' component={Products} />
    </Tab.Navigator>
  )
}

const App = ({navigation, route}) => {
  // 
  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: '400',
        }}
        text2Style={{
          fontSize: 13,
          color: 'green'
        }}
      />
    ),
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17,
        }}
        text2Style={{
          fontSize: 13,
          color: 'red'
        }}
      />
    ),
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };

  // 
  const [artist, setArtist] = useState('');
  const [User, setUser] = useState(null);
  const [artistName, setArtistName] = useState(null);

  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist=>{
      // const artistUid = auth()?.currentUser?.uid;

          if(userExist) {
             setArtist(userExist);

             firestore().collection("artists").where("artistUid", "==", userExist.uid).onSnapshot((snapShot) => {
              const users = snapShot.docs.map((document) => document.data().photoUrl);
              const uName = snapShot.docs.map((document) => document.data().artistName);
              // console.log(cartItems + "  this the number of item added to cart")
              setUser(users);
              setArtistName(uName);
            });
          
        }
          else {
            setUser("");
        }
    });

    return () => {
      unregister()
    }
}, [])

const artistUid = auth()?.currentUser?.uid;
  return (
    <>

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Splash'
      >
      {artist? 
        <>
       
        <Stack.Screen 
          name='LandingPage' 
          component={TabNavigator}
          options={({navigation}) => ({
            headerBackVisible: false,
            headerShadowVisible: false,
            headerTitleStyle: {
              color: '#fff',
              fontWeight: 'bold',
              
            },
            headerStyle: {
              backgroundColor: '#ceb89e'
            },
        
            title: 'Gallery 360 Africa',
            headerRight: () => (
              <View style={{flexDirection: 'row', width: 45, justifyContent: 'space-between', }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {artistUid: artistUid, artistName: artistName, photoUrl: User})}>
                  <Image 
                    source={{uri: `${User}`}} 
                    style={{width: 30, height:30, borderRadius:30, backgroundColor:"lightgrey" }}
                  />
                </TouchableOpacity>
              </View>
                )       
              })}
            />
      
        <Stack.Screen options={{headerShown: false, }} name='Home' component={Home} />
        <Stack.Screen options={{headerShown: false}} name='Sales' component={Sales} />
        <Stack.Screen options={{headerShown: false}} name='Products' component={Products} />
        <Stack.Screen options={{headerShown: true, headerBackVisible: true,}} name='Profile' component={Profile} />
        <Stack.Screen options={{headerShown: true}} name='Settings' component={Settings} />
        <Stack.Screen options={{headerShown: true, title: 'Terms & Conditions' }} name='TermsAndConditions' component={TermsAndConditions} />
       </>
        :
        <>
          <Stack.Screen options={{headerShown: false}} name='Splash' component={Splash} />
          <Stack.Screen options={{headerShown: false}} name='Onboarding' component={Onboarding} />
          <Stack.Screen options={{headerShown: false}} name='SignUp' component={SignUp} />
        </>
      }
      </Stack.Navigator>
    </NavigationContainer>
    <Toast config={toastConfig} />
  </>
  );
  
}

export default App;