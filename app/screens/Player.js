import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Player= () =>{
    return (
        <View style={styles.container}>
            <Text>Player</Text>
        </View>
    )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alighnItems: 'center'
    }
})

export default Player;