import React from 'react';
import { ImageBackground, View, Image, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';


const SignIn = ({navigation}) => {

 
  return (
    <KeyboardAvoidingView behavior='position'>
      <ImageBackground
        source={BgImage}
        resizeMode='stretch'
        style={styles.SignUpContainer}
      >
    <View style={styles.TopContainer}>
      <Image 
        source={SignInLogo}
        style={styles.SignUpLogo}
      />
    </View>

    <View style={styles.BottomContainer}>
      <Text style={styles.WelcomeText}>Sign Up</Text>
      <Text style={styles.SubText}>create your new account</Text>

      <TextInput
        style={styles.textField}
        value=""  
        //onChangeText={(text) => setRecipientName(text)}
        placeholder="Full Name"
        placeholderTextColor="#fff"
      />

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
      
      <TouchableOpacity style={styles.SignUpbtn} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.SignUptxt}> Sign Up </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', paddingTop: 10, justifyContent: 'center'}}>
        <Text style={{color: '#fff', fontSize: 16, textAlign: 'center'}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={{color: '#000', fontSize: 16, textDecorationLine: "underline", textAlign: 'center'}}>SignIn</Text>
              </TouchableOpacity>
      </View>  

    </View>

     </ImageBackground>
     </KeyboardAvoidingView>
  )
}

const BgImage = require('../assets/BgImages/SignUp.png');
const SignInLogo = require('../assets/logo/SignUpLogo.png')

const styles = StyleSheet.create({
  SignUpContainer: {
    height: '100%',
    width: '100%',
  },
  SignUpLogo: {
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
    bottom: 10,
    margin: 5
  },
  WelcomeText: {
    fontSize: 45,
    color: '#000',
    padding: 5,
    top: 45,
    right: 75,
    marginBottom: 10
  },
  SubText: {
    padding: 10,
    top: 20,
    fontSize: 14,
    right: 73,
    color: '#fff',
    marginBottom: 15
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
  SignUpbtn: {
    alignSelf: 'center',
    width: 300,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#CEB89E',
    padding: 10,
    margin: 20
  },
  SignUptxt: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    
  },
})
export default SignIn;