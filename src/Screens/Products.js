import { NavigationContainer } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView, Modal, image, TextInput, Alert, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'


const Products = ({navigation}) => {

    const ArtImages = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1604367233962-bce0799fbe9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1547333590-47fae5f58d21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1585644198527-05519fdeaf98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTB8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

        },
    ]

    //const [artistInfo, setArtistInfo] = useState([])
    
    const updateArtistInfo = async () => {
      const artistUid = auth()?.currentUser?.uid;
      await firestore()
        .collection('Market')
        .add({
          ArtistUid: artistUid,
          imageUri: imageUri,
          artType: artType,
          description: description,
          artName: artName,
          artPrice: artPrice,
        });
      alert("you have successfully update your profile");
    }

    //
    const [artist, setArtist] = useState([])
    
    const getArtUrl = () => {
      const artistUid = auth()?.currentUser?.uid;

      return firestore()
        .collection('Market')
        .where('ArtistUid', '==', artistUid)
        .onSnapshot((snapShot) => {
          const query = snapShot.docs.map(docSnap => docSnap.data())
          setArtist(query)
        })
    }
    useEffect(() => {
      getArtUrl();
      // updateArtistInfo();
    }, [])

    //
    const [imageUri, setimageUri] = useState("");
    const [submit, setSubmit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [artType, setArtType] = useState('');
    const [artName, setArtName] = useState('');
    const [artPrice, setArtPrice] = useState('')
    const [artUrl, setArtUrl] = useState('');
    const [description, setDescription] = useState('');

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

    return (
        <ScrollView horizontal={true} style={styles.container}>

            <View style={styles.ScrollViewContainer}>

            <View style={styles.ImagePickerStyle} >
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons
                        name="add-photo-alternate"
                        size={150}
                        color={'gray'}
                    />
                </TouchableOpacity>
            </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

          <View style={{left: 135, bottom: 25}}>
              <AntDesign 
                name="closecircleo" size={24} 
                color="#ceb89e" 
                onPress={() => setModalVisible(!modalVisible)}
              />
          </View>

          <Text style={{textAlign: "center", color: "#ceb89e", fontSize: 25, bottom: 55}}>Upload Your Art</Text>
          
          <View style={{bottom: 45}}>
              <TouchableOpacity>
               <Image source={`${ProfilePic}`} style={styles.image} />
                  {!submit ? (
                 
                  <MaterialIcons 
                    onPress={() => openImageLibrary()}
                    name="camera" 
                    size={24} color="#ceb89e" 
                    style={{marginLeft: 80, 
                    marginTop: -25}}
                  />
                   ) : (
                  <ActivityIndicator  style={{ alignSelf: "center", position:"absolute" }}
                  color="black"
                  size="small"/>)}
              </TouchableOpacity>
          </View>

          <View style={{bottom: 30}}>
            <View style={styles.TextField}>
            <View style={{flexDirection: "row", marginHorizontal: 3}}>
              <Text style={{flexDirection: "row",color: "#ceb89e", 
              marginHorizontal: 10,fontWeight: "bold"}}>Art Type:</Text>
            </View>

              <TextInput 
                style={styles.input}
                onChangeText={artType => setArtType(artType)}
                //value={name}
                placeholder="Enter Art Type"
              />
          </View>

          <View style={styles.TextField}>
            <View style={{flex: 1, flexDirection: "row", marginHorizontal: 3}}>
              <Text style={{flex: 1, flexDirection: "row",color: "#ceb89e", 
              marginHorizontal: 10,fontWeight: "bold"}}>Art Name:</Text>
            </View>

              <TextInput 
                style={styles.input}
                onChangeText={artName => setArtName(artName)}
                //value={name}
                placeholder="Enter Art Name"
              />
          </View>

          <View style={styles.TextField}>
            <View style={{flexDirection: "row", marginHorizontal: 3}}>
              <Text style={{flexDirection: "row",color: "#ceb89e", 
              marginHorizontal: 10,fontWeight: "bold"}}>
                Price:</Text>
            </View>

              <TextInput 
                style={styles.input}
                onChangeText={artPrice => setArtPrice(artPrice)}
                //value={price}
                placeholder="Enter Art Price"
              />
          </View>

          <View style={styles.TextField}>
            <View style={{flexDirection: "row", marginHorizontal: 3}}>
              <Text style={{flexDirection: "row",color: "#ceb89e", 
              marginHorizontal: 10,fontWeight: "bold"}}>
                Description:</Text>
            </View>

              <TextInput 
                style={styles.input}
                onChangeText={description => setDescription(description)}
                //value={price}
                placeholder="Enter Art Description"
              />
          </View>
        </View>

            <TouchableOpacity
              style={styles.button}
                  onPress={updateArtistInfo}
            >
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            <FlatList 
                      horizontal
                      showsHorizontalIndicator={false}
                      data={artist}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => {
                        return(
                          <View style={styles.listItem2} >
                              <Image 
                                source={{uri: item.imageUri}} 
                                style={styles.img}
                              />
                          </View>
                        )
                      }}
                    />
        
        </View>
        </ScrollView>
                )
    }

const ProfilePic = require('../assets/images/Ellipse.png')

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    img: {
        height: 550,
        width: 310,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center', 
      },
      listItem2: {
        flexDirection: "row",
       marginHorizontal: 10,
       left: 20
      },
      ImagePickerStyle: {
        height: 550,
        width: 310,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center', 
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
        left: 15,
        borderColor: 'gray'
      },
      ScrollViewContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignSelf: 'center', 
        alignItems: 'center', 
        width: '100%', 
        borderRadius: 20
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        height: 670,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        backgroundColor: "#ceb89e", 
        marginHorizontal: 120, 
        borderRadius: 20, 
        width: 100, 
        height: 40,
        justifyContent: "center",
        marginVertical: -20,
        //borderWidth: 1
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#ceb89e", 
        marginHorizontal: 120, 
        borderRadius: 20, 
        width: 100, 
        height: 40,
        justifyContent: "center"
      },
      textStyle: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      TextField: {
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 20,
        height: 95,
        width: 250,
        padding: 10,
        paddingTop: 3,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#ceb89e'
      },
      input: {
        height: 40,
        margin: 12,
        padding: 10,
        color: '#000'
      },
      image: {
        width: 120,
        height: 120,
        borderRadius: 200,
        borderWidth: 2,
        backgroundColor: "gray"
      },
})
export default Products;