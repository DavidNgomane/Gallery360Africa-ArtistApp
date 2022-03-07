import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  ImageBackground,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function SignIn ({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if(email !== null && password !== null) {
       try {
       await auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          console.log(user);
          alert('User logged-in successfully!')
          // If server response message same as Data Matched
          if (user) navigation.replace("LandingPage");
        })
       } catch (error) {
        if (error.code === "auth/invalid-email")
        alert("Email is not valid");
        else if (error.code === "auth/user-not-found")
           alert("No User Found");
        else {
          alert(
            "Please check your email id or password"
          );
        }
       }
  }
}

  return (
    <>
    <View style={{flex: 1, backgroundColor: '#573E22'}}>
    <View style={styles.topBody}>
    <View>
      <Image source={require('../assets/logo/SignInLogo.png')} style={styles.logo}/>
      </View>
    </View>
      <View style={styles.footer}>
              <View  style={{marginLeft: 33, marginBottom: 15}}>
                  <Text style={{fontSize: 36, color: '#22180E'}}>Welcome Back !</Text>
                  <Text style={{color: '#FFFFFF'}}>LogIn to your account</Text>
              </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={email => setEmail(email)}
              value={email}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={password => setPassword(password)}
              value={password}
              underlineColorAndroid="#f000"
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              returnKeyType="next"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={onLogin}
            activeOpacity={0.5}>
           <LinearGradient start={{x: 1, y: 0}} end={{x: 1, y: 0}} colors={['#CEB89E', '#9F805C']} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        {/* <View >
           <Text style={{marginHorizontal: 65}}>
              Don't have an account?
              <TouchableOpacity style={{marginTop: 9}} onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{color: '#22180E'}}>
                {' '}
                Sign Un
                </Text>
              </TouchableOpacity>
           </Text>
        </View> */}
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
           {/* <Text style={{marginHorizontal: 65}}>
              Already have an account?
              <TouchableOpacity style={{marginTop: 9}} onPress={() => navigation.navigate('SignInScreen')}>
                <Text style={{color: '#22180E'}}>
                {' '}
                Sign In
                </Text>
              </TouchableOpacity>
           </Text> */}
           <Text style={{}}>
              Don't have an account?
           </Text>
           <Text>
           <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: '#22180E'}}>
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
           </Text>
        </View>
        </View>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  topBody: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 300
  },
  footer: {
    flex: 1,
    marginVertical: 25
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 17,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#BFA688',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 14,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 25,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 13,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#FFFFFF',
  },
      logo: {
      height: 250,
      width: 250,
      justifyContent: 'center',
      alignItems: 'center',
  },
});