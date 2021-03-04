import React from 'react'
import {View, StyleSheet, TextInput} from 'react-native'

const CreatePostInput = props => {
    
    return(
        <TextInput
        value={props.content}
        style={styles.input}
        placeholder="What are you thinking..."
        multiline={true}
        returnKeyType='send'
        onChangeText={props.onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        padding:15,
        fontSize:18,
        color:'black',
    }
})

export default CreatePostInput;