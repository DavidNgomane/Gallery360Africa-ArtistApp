import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

const Sales = () => {
    return(
        <View style={styles.container}>
            <View style={styles.AmountContainer}>
                <Text style={styles.Total}>R 70 000</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    AmountContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignSelf: 'center', 
        width: '45%',
        height: '8%',
        margin: 15,
        borderRadius: 10
    },
    Total: {
        textAlign: 'center',
        fontSize: 24
    },
})

export default Sales;