import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-elements'

const CreatePollButton = props => {
    return (
            <Button
                onPress={props.onPress}
                containerStyle={{justifyContent:'center', alignItems:'flex-start', }}
                title="Create poll"
            />

    )
}

export default CreatePollButton;