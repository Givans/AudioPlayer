import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { AudioContext } from '../context/AudioProvider'

export class AudioList extends Component{
    static contextType = AudioContext
    render() {
        return (
            <ScrollView>
                {this.context.audioFiles.map(item => <Text style={styles.text} key={item.id}>{item.filename}</Text> )}
                
            </ScrollView>
        );
    }
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alighnItems: 'center'
    },
    text: {
        padding: 10,
        borderBottomColor: 'red',
        borderBottomWidth: 2
    }
})

export default AudioList;