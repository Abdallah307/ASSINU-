import React from 'react'
import {View, TextInput} from 'react-native'

const PollQuestionInput = props => {
    return(
        <TextInput
        placeholder="Ask a quesion..."
        style={props.style}
        {...props}
        />
    )
}

export default PollQuestionInput