import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native'
import SwipebeList from 'rn-swipeable-flatlist'


const SwipeApp = () => {
    const [ data, changeData ] = useState(Array.from({ length: 50 }, (_, idx) => idx))
    const changeDataHandle = useCallback((id) => {
        changeData(data.filter(v => v !== id));
    }, [data.length])

    return (
        <View style={styles.container}>
            <SwipebeList 
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item => item.toString())}
                duration={500}
                leftView={<Image style={styles.image} source={require('./assets/22_-_Tick-512.png')}/>}
                rightView={<Image style={styles.image} source={require('./assets/Trash-Email-Bin-512.png')}/>}
                leftColor={'#08D964'}
                rightColor={'#e52c88'}
                onSwipeLeft={(id) => {
                    console.log('Left => ', id)
                    changeDataHandle(id)
                }}
                onSwipeRight={(id) => {
                    console.log('Right => ', id);
                    changeDataHandle(id)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
    },
    image: {
        width: 32,
        height: 32,
    },
})

export default SwipeApp;