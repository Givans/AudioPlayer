import { Text, View, Alert, StyleSheet } from 'react-native'
import React, { Component, createContext } from 'react'
import { getPermissionsAsync } from 'expo-media-library'
import * as MediaLibrary from 'expo-media-library'

export const AudioContext = createContext()
export class AudioProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            audioFiles: [],
            permissionError: false
        }
    }
    permissionAllert = () => {
        Alert.alert("Permission Required", "This app needs to read Audio files", [{
            text: 'I am ready',
            onPress: () =>this.getPermissions()
        },{
            text: 'cancel',
            onPress: () => this.permissionAllert()
        }
    ])
    }

    getAudioFiles = async () => {
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
        });
        media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: media.totalCount,
        });
        console.log(media.assets.length)
        this.setState({...this.state, audioFiles: media.assets})
    }

    getPermissions = async () => {
        const permission = await MediaLibrary.getPermissionsAsync()
        if(permission.granted){
            // get all the audio files
            this.getAudioFiles()
        }

        if (!permission.canAskAgain && !permission.granted) {
            this.setState({...this.state, permissionError: true})

        }
        

        if(!permission.granted && permission.canAskAgain){
            const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync()
            if(status === 'denied' && canAskAgain){
                // dispay an alert thatuser must allow this permission
                this.permissionAllert()
            }

            if(status == 'granted'){
                // get all the audio files
                this.getAudioFiles()
            }
            if(status === 'denied' && !canAskAgain){
                // dispay some error to the user
                this.setState({...this.state, permissionError: true})
            }
        }
    }
    componentDidMount(){
        this.getPermissions()
    }

  render() {
    if (this.state.permissionError) return <View style={styles.errorView}>
        <Text style={styles.errorText}>It looks like you haven't accept the permission</Text>
    </View>
    return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
        {this.props.children}
    </AudioContext.Provider>
  }
}

const styles = StyleSheet.create({
    errorView: {
        flex: 1,
        justifyContent: 'center',
        alighnItems: 'center'
    },
    errorText: {
        fontSize: 25,
        textAlign: 'center',
        color: 'red',
    }
})


export default AudioProvider