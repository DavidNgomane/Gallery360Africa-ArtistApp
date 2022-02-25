import React from 'react'
import { ImageBackground, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Onboarding = () => {
  return (
    <View>
     <ImageBackground
      source={BgImage}
      resizeMode='stretch'
      style={styles.OnboardingContainer}
     >
       <View style={styles.TopContainer}>
          <Image 
            source={Onboardinglogo}
            style={styles.OnboardingLogo}
          />
       </View>

       <View style={styles.BottomContainer}>
        <TouchableOpacity style={styles.SignInbtn}>
          <Text style={styles.SignIntxt}> Sign In </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.SignUpbtn}>
          <Text style={styles.SignUptxt}> Sign Up </Text>
        </TouchableOpacity>
          
       </View>

     </ImageBackground>
    </View>
  )
}

const BgImage = require('../assets/BgImages//OnboardingBg.png');
const Onboardinglogo = require('../assets/logo/OnboardingLogo.png')

const styles = StyleSheet.create({
  OnboardingContainer:{
    height: '100%',
    width: '100%',
  },
  TopContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
  },
  BottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
    
  },
  OnboardingLogo: {
   bottom: 50
  },
  SignInbtn: {
    alignSelf: 'center',
    //borderWidth: 1,
    width: 340,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#CEB89E',
    padding: 10,
    marginBottom: 15
  },
  SignIntxt: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
  },
  SignUpbtn: {
    alignSelf: 'center',
    borderWidth: 1,
    width: 340,
    height: 50,
    borderRadius: 20,
    padding: 10,
    borderColor: '#CEB89E'
  },
  SignUptxt: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#CEB89E',
    fontSize: 22,
  }
  
})


export default Onboarding;