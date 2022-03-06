import React, { useState, useEffect } from "react";
import { View, Text, Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, ActivityIndicator } from "react-native";
//import firestore from "@react-native-firebase/firestore";
import { globalStyles } from "../assets/styles/GlobalStyles";

// icons
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import * as ImagePicker from 'react-native-image-picker';

const ArtistProfile = ({route, navigation}) => {

    const [modalOpen, setModalOpen] = useState("");
    const [submit, setSubmit] = useState(false);
    const [userName, setUserName] = useState("")
  const [imageUri, setimageUri] = useState("");

    const openImageLibrary = async () =>{
        const options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
    
      await ImagePicker.launchImageLibrary(options, (response) => {
    
          const uri = response.assets.map(({uri}) => uri).toString();
          // console.log('tis is the one you need response', uri)
          //  setimageUri(uri);
          const imageName = uri.substring(uri.lastIndexOf('/'));
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    
      try {
        setSubmit(true);
        storage().ref(imageName).putFile(uploadUri)
        .then((snapshot) => {
          //You can check the image is now uploaded in the storage bucket
          console.log(`${imageName} has been successfully uploaded.`);
    
          storage().ref('/' + imageName).getDownloadURL().then((imageURL) => {
            console.log(`${imageURL} has been retrieved.`);
            
            setimageUri(imageURL);
          }).catch((e) => console.log('retrieving image error => ', e));
           
        })
        .catch((e) => console.log('uploading image error => ', e));
      setSubmit(false);
      
      }
      catch(e) {
        console.error(e);
      }
          alert("image uploaded");
              
            
           if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const uri = response.assets.map(({uri}) => uri).toString();
          }
        });
      };

//   const { artistUid, artistPhoto, artistName, artistDescription } = route.params;
//   // 
//   const[art, setArt] = useState(null)
//   const getArt = () => {
//     return firestore().collection('Market').where("ArtistUid", "==", artistUid).onSnapshot((snapshot) => {
//       const allArt = snapshot.docs.map(docSnap => docSnap.data());
//       setArt(allArt);
//     }) 
//   }
//   useEffect(() => {
//     getArt();
//   }, [])

  return (
   <View style={{height: '100%', width: '100%'}}>
      <View style={styles.TopContainer}>
          
      <Modal visible={modalOpen}>
                     <View style={styles.modalContainer}>
                       <View style={styles.closeBtnContaainer}>
                         <EvilIcons onPress={()=> setModalOpen(false) } name='close' size={35} color="white" />
                       </View>
                       <View style={styles.editprofileImgContainer}>
                            <Image source={`${artistPhoto}`} style={styles.uploadedImage} />
                            {!submit ? (
                            <AntDesign onPress={() => openImageLibrary()} style={styles.imgAddIcon} name="pluscircle" size={35} color="#E3E3E3" />
                            ) : (
                             <ActivityIndicator  style={{ alignSelf: "center", position:"absolute" }}
                            color="black"
                            size="small"/>)}
                      
                            </View>
                       <TextInput
                          placeholder='Edit Username'
                          onChangeText={(fullName) => setUserName(fullName)}
                          style={styles.editUserInput} />
                       <TouchableOpacity  style={styles.updateBtn}>
                         <Text style={styles.modalText}>Update</Text>
                       </TouchableOpacity>
                     </View>
                </Modal>

        <View style={styles.VideoContainer}>
          <Image 
            source={{uri: 'https://images.unsplash.com/photo-1614315394848-b3375bf3f39c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHZpZGVvfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60'}}
            style={{width: 325, height: 250, borderRadius: 15}}
          />
          </View>
      </View>

                <View style={styles.MiddleContainer}>
                  <View style={styles.listItem} >
                    <View style={{flexDirection: "row", width: '91%'}}>
                      <Image 
                        source={artistPhoto} 
                        style={styles.img2}
                      />
                      <View style={{width: '100%'}}>
                        <Text style={{ color: "#000000", marginLeft: 10, top: 6, fontSize: 20}}>Sibusiso</Text>
                        <Text style={{ color: "#ceb89e", marginLeft: 10, top: 3}}>Artist</Text>

                        <TouchableOpacity  onPress={() => setModalOpen(true)}>
                          <MaterialIcons 
                            name="edit-location" 
                            size={30} 
                            color={'#000'}
                            style={{alignSelf: 'flex-end', marginVertical: -25, marginHorizontal: 70, bottom: 3}}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={{width: '95%', padding: 5}}>
                        <Text style={{color: "#000000"}}>
                            Lorem ipsum dolor sit amet, consectetur 
                            adipiscing elit. Libero, in dignissim 
                            pretium tristique tincidunt ut pretium.
                        </Text>
                    </View>
                  </View>
                </View>

                {/* <View style={styles.BottomContainer}>
                  <Text style={styles.moreText}>More Works</Text>

                    <FlatList 
                      horizontal={true}
                      data={art}
                      keyExtractor={item => `${item.ImageUid}`}
                      renderItem={({ item }) => {
                        return(
                          <View style={styles.listItem2} >
                            <TouchableOpacity onPress={() => navigation.navigate('ArtPreview', {artistUid, likes: item.likes, price: item.price, description: item.description, artUrl: item.artUrl, artistPhoto: item.artistPhoto, artistName: item.artistName, ImageUid: item.ImageUid, artType: item.artType, artistDescription: artistDescription})} >
                              <Image 
                                source={{uri:item.artUrl}} 
                                style={styles.img}
                              />
                              <View style={styles.priceView}>
                                <Text style={styles.price} >{item.price}</Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        )
                      }}
                    />
                    
                </View> */}
      </View>
  );
}
const artistPhoto =require('../assets/images/Ellipse.png')
//const imageBg = require('../assets/images/home.png')

export default ArtistProfile;

const styles = StyleSheet.create({
  TopContainer: {
    top: 50
  },
    MiddleContainer: {
        flex: 6,
        top: 65
        // backgroundColor: "red"
    },
    BottomContainer: {
       top: 10
    },
    moreText: {
        color: "#000000",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 20
    },
    img: {
        height: 150,
        width: 120,
        borderRadius: 15
      },
      listItem2: {
        paddingLeft: 15,
        paddingTop: 20,
        flexDirection: "column",
        marginBottom: 45
      },
      price: {
        color: "#ffffff", 
        textAlign: "center", 
        fontWeight: "bold"
    },
    priceView: {
        backgroundColor: 'rgba(16, 18, 27, 0.4)', 
        marginVertical: -25, 
        borderRadius: 20,
        alignSelf: 'center',
        height: 20,
        width: '90%'
      },
      listItem: {
        paddingTop: 20,
        marginLeft: 15,
        width: '100%',
        height: 100,
      },
      img2: {
        height: 50,
        width: 50,
        borderRadius: 25,
        // borderColor: 'rgba(196, 196, 196, 0.51)',
        // borderWidth: 4,
        marginLeft: 3
      },
      BackButton: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
        width: 50,
        height: 50,
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 10
      },
      Heart: {
        alignSelf: "flex-end",
        marginHorizontal: 160,
        bottom: 15
      },
      VideoContainer: {
        borderRadius: 15, 
        width: 325, 
        height: 250, 
        backgroundColor: "gray", 
        alignSelf: "center",
        marginTop: 10
    },
    modalContainer:{
        width: '85%',
        height: 475,
        backgroundColor:'#E3E3E3',
        borderRadius:15,
        alignSelf:'center',
        top: 30,
        alignItems:'center',
        paddingVertical: 15
      },
      
      editprofileImgContainer:{
       width: 200,
       height: 200,
       borderRadius: 150,
       backgroundColor:'gray',
       justifyContent:'center',
       alignItems:'center',
      },
      
      editUserInput:{
        borderColor:'black',
        borderWidth:1,
        height: 50,
        paddingHorizontal: 65,
        borderRadius: 15,
        marginVertical: 45,
        backgroundColor:'white',
        color: "#000"
      },
      
      updateBtn:{
        width: 220,
        height: 50,
        backgroundColor:'black',
        borderRadius: 15,
        justifyContent:'center',
        alignItems:'center'
      },
      
      modalText:{
        fontSize: 18,
        color:'white'
      },
      
      closeBtnContaainer:{
        width: 37,
        height: 37,
        backgroundColor:'#FF5353',
        borderRadius: 18.5,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-end',
        right:15
      },
      
      uploadedImage:{
        width: 200,
        height:200,
        borderRadius: 100
      },
      imgAddIcon:{
        position:'absolute'
      },
      
      flatlist:{
       height:280
      },
      
})