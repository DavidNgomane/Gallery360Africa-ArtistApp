import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'

const Home = () => {

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

    //
    const [likes, setLikes] = useState([])

    const getMostLiked = () => {
        const artistUid = auth()?.currentUser?.uid;

        return firestore()
            .collection('likes')
            .where('artistUID', '==', artistUid)
            .onSnapshot((onSnapshot) => {
                const query = onSnapshot.docs.map(docSnap => docSnap.data());
                setLikes(query)
            })
    }
    useEffect(() => {
        getMostLiked()
    }, [])

    //
    return(
        <View  style={styles.container}>
            <View>
                <Text style={styles.MostLikedText}>Most Liked</Text>
            </View>

            <View style={{justifyContent: 'center',alignSelf: 'center', alignItems: 'center', width: '90%', borderRadius: 20}}> 
                <FlatList 
                    vertical
                    showsVerticalScrollIndicator={false}
                    data={likes}
                    keyExtractor={item => `${item.artistUID}`}
                    renderItem={({ item }) => {
                        return (
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
        // justifyContent: 'flex-end',
        // textAlign: 'left',
        // margin: 15,
        fontSize: 22,
        fontWeight: 'bold',
    },
    img: {
        height: 450,
        width: 310,
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center', 
        
      },
      listItem2: {
        flexDirection: "column",
       marginVertical: 10

      },
})
export default Home;