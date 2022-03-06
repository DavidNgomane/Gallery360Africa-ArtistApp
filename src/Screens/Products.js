import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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

    return (
        <ScrollView horizontal={true} style={styles.container}>

            <View style={styles.ScrollViewContainer}>

            <View style={styles.ImagePickerStyle} >
                <TouchableOpacity onPress={() => NavigationContainer.navigate('')}>
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