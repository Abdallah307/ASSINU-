import React, { useState, useLayoutEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    TextInput,
    Keyboard,
} from 'react-native'
import { Colors } from '../../constants/Colors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/CustomHeaderButton'

import CreatePostHeader from '../../components/postComponents/CreatePostHeader'
import CreatePostInput from '../../components/postComponents/CreatePostInput'
import { addUniversityQuestion } from '../../store/middleware/api'
import { useDispatch , useSelector} from 'react-redux'

import {Input} from 'react-native-elements'

const CreateQuestionScreen = props => {

    const params = props.route.params

    const [questionInput, setQuestionInput] = useState('')

    const userId = useSelector(state=> state.auth.userId)

    const dispatch = useDispatch()

    const createQuestion = () => {
        dispatch(addUniversityQuestion({
            content: questionInput,
            ownerId: userId
        }))

        props.navigation.navigate('UniversityQuestions')
    }

    useLayoutEffect(() => {
        console.log('created the post')
        props.navigation.setOptions(screenOptions(createQuestion, questionInput.length))
    })

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
            <View style={styles.createQuestion}>

                <CreatePostHeader
                    username={params.username}
                    imageUrl={params.userImage}
                />

                <TextInput
                    placeholder='Add your question...'
                    style={styles.addQuestionInput}
                    multiline={true}
                    returnKeyType='send'
                    value={questionInput}
                    onChangeText={(value) => setQuestionInput(value)}
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

const screenOptions = (createQuestion, questionInputLength) => ({
    headerRight: () => {
        return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>

                {questionInputLength == 0 ? <Item
                    title="Ask"
                    disabled={true}
                    buttonStyle={{
                        backgroundColor: 'lightgrey',
                        padding: 10,
                        color: Colors.primary,
                        borderRadius: 10,

                    }}
                    onPress={createQuestion}
                />
                    :
                    <Item
                        title="Ask"
                        buttonStyle={{
                            backgroundColor: 'white',
                            padding: 10,
                            color: Colors.primary,
                            borderRadius: 10,

                        }}
                        onPress={createQuestion}
                    />}
            </HeaderButtons>
        )
    }
})



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addQuestionInput: {
        padding: 15,
        fontSize: 18,
        color: 'black',
        fontFamily: 'OpenSans-Regular'
    },
    createQuestion: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default CreateQuestionScreen;