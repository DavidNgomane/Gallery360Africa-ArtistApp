import React from 'react';
import { ImageBackground, View, Image, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';


const SignIn = ({navigation}) => {

 
  return (
    <KeyboardAvoidingView behavior='position'>
      <ImageBackground
        source={BgImage}
        resizeMode='stretch'
        style={styles.SignInContainer}
      >
    <View style={styles.TopContainer}>
      <Image 
        source={SignInLogo}
        style={styles.SignInLogo}
      />
    </View>

    <View style={styles.BottomContainer}>
      <Text style={styles.WelcomeText}>Welcome Back !</Text>
      <Text style={styles.SubText}>Login to your account</Text>

      <TextInput
        style={styles.textField}
        value=""  
        //onChangeText={(text) => setRecipientName(text)}
        placeholder="Email"
        placeholderTextColor="#fff"
      />

      <TextInput
        style={styles.textField}
        value=""  
        //onChangeText={(text) => setRecipientName(text)}
        placeholder="Password"
        placeholderTextColor="#fff"
      />
      
      <TouchableOpacity style={styles.SignInbtn} onPress={() => navigation.navigate('LandingPage')}>
        <Text style={styles.SignIntxt}> Sign In </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', paddingTop: 10, justifyContent: 'center'}}>
        <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{color: '#000', fontSize: 16, textDecorationLine: "underline", textAlign: 'center'}}>SignUp</Text>
              </TouchableOpacity>
      </View>  

    </View>

     </ImageBackground>
     </KeyboardAvoidingView>
  )
}

const BgImage = require('../assets/BgImages/SignIn.png');
const SignInLogo = require('../assets/logo/SignInLogo.png')

const styles = StyleSheet.create({
  SignInContainer: {
    height: '100%',
    width: '100%',
  },
  SignInLogo: {
    height: 250,
    width: 250,
    bottom: -10
  },
  TopContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    margin: 5
  },
  WelcomeText: {
    fontSize: 45,
    color: '#000',
    padding: 5,
    top: 35
  },
  SubText: {
    padding: 10,
    top: 20,
    fontSize: 14,
    right: 80,
    color: '#fff',
  },
  textField: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#fff',
    height: 47,
    width: 300,
    alignSelf: 'center',
    color: '#000',
    paddingLeft: 15,
  },
  SignInbtn: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#CEB89E',
    padding: 10,
    margin: 20
  },
  SignIntxt: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    
  },
})
export default SignIn;