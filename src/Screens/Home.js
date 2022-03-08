import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth'
// icons
import MaterialICommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

const Home = () => {

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
                    horizontal
                    showsVerticalScrollIndicator={false}
                    data={likes}
                    keyExtractor={item => `${item.artistUID}`}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listItem2} >
                                <Image 
                                    source={{uri: item.imageUid}} 
                                    style={styles.img}
                                />
                                <View style={{ backgroundColor: '#fff', position: 'absolute', height: 50, bottom: 3, right: 3, left: 3, borderRadius: 12}}>
                                    <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginVertical: 15 }}>
                                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingRight: 30}}>
                                            <Fontisto
                                                name='heart'
                                                size={16}
                                                color='red'
                                                // style={{ position: 'absolute', bottom: 16, right: 0, left: 20 }}
                                            />
                                            <Text style={{ color: 'red', fontSize: 18, paddingHorizontal: 10 }}>{item.like}</Text>
                                        </View>
                                        
                                        {/*  */}
                                        <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', paddingLeft: 30 }}>
                                            <Fontisto
                                            name='comments'
                                            size={16}
                                            color='green'
                                            // style={{ position: 'absolute', bottom: 16, right: 0, left: 100 }}
                                            />
                                            <Text style={{ color: 'green', fontSize: 18, paddingHorizontal: 10}}>{item.comments}</Text>
                                        </View>
                                    </View>
                                </View>
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
        padding: 10,
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