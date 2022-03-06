import { NavigationContainer } from "@react-navigation/native";
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'react-native-image-picker';


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

    const [imageUri, setimageUri] = useState("");
    const [submit, setSubmit] = useState(false);

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
                <TouchableOpacity onPress={() => openImageLibrary()}>
                    <MaterialIcons
                        name="add-photo-alternate"
                        size={150}
                        color={'gray'}
                    />
                </TouchableOpacity>
            </View>

            <FlatList 
                      horizontal
                      showsHorizontalIndicator={false}
                      data={ArtImages}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => {
                        return(
                          <View style={styles.listItem2} >
                              <Image 
                                source={{uri:item.image}} 
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
    MostLikedText: {
        color: '#000',
        justifyContent: 'flex-end',
        textAlign: 'left',
        margin: 15,
        fontSize: 22,
        fontWeight: 'bold',

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
        left: 15
      },
      ScrollViewContainer: {
        flexDirection: 'row', 
        justifyContent: 'center',
        alignSelf: 'center', 
        alignItems: 'center', 
        width: '100%', 
        borderRadius: 20
      }
})
export default Products;