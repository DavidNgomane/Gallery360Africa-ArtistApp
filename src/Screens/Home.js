import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

const Home = () => {
    return(
        <View style={styles.container}>
        <View style={styles.Topcontainer}>
            <Text style={styles.HeadingText}>Gallery 360 Africa</Text>
            <Image 
                source={ProfilePic}
            />

        </View>

        <View style={styles.middleContainer}>

        </View>

        <View style={styles.BottomContainer}>

        </View>
        </View>
    );
}

const ProfilePic = require('../assets/images/Ellipse.png')

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    Topcontainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'space-between',
    },
    HeadingText: {
        color: '#CEB89E',
        fontWeight: 'bold',
        fontSize: 24,
    },
    middleContainer: {
        flex: 1,
        backgroundColor: 'red'
    },
    BottomContainer: {
        flex: 4,
        backgroundColor: 'blue'
    }
})
export default Home;