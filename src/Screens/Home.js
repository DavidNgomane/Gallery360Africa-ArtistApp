import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';



const Home = () => {

    const ArtImages = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1604367233962-bce0799fbe9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1561002515-3aa8c1fdba2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1585644198527-05519fdeaf98?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTB8fGFydHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",

        },
    ]

    return(
        <View>

        <View style={styles.container}>
            <Text style={styles.MostLikedText}>Most Liked</Text>
        </View>

            <View style={{justifyContent: 'center', alignItems: 'center', margin: 10,}}> 
            <FlatList 
                      horizontal
                      data={ArtImages}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => {
                        return(
                          <View style={styles.listItem2} >
                            <TouchableOpacity>
                              <Image 
                                source={{uri:item.image}} 
                                style={styles.img}
                              />
                            </TouchableOpacity>
                          </View>
                        )
                      }}
                    />
        <Text>heloo</Text>
        </View>
        </View>
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
        height: 150,
        width: 120,
        borderRadius: 15
      },
      listItem2: {
        paddingLeft: 15,
        paddingTop: 20,
        flexDirection: "row",
        marginBottom: 45
      },
})
export default Home;