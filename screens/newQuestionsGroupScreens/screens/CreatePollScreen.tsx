import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, TextInput } from 'react-native'
import CreatePostHeader from '../../../components/postComponents/CreatePostHeader'
import PollOption from '../../../components/groupComponents/PollOption'
import { Button } from 'react-native-elements'
import RNPoll, { IChoice } from "react-native-poll";
import { useDispatch, useSelector } from 'react-redux'
import {actions as groupActions} from '../../../store/Group'
import { CourseGroup } from '../../../api/api'
import { Colors } from '../../../constants/Colors'
import PollQuestionInput from '../../../components/groupComponents/PollQuestionInput'


const CreatePollScreen = props => {
    const [options, setOptions] = useState<Array<string>>([])
    const [choice, setChoice] = useState('')
    const [question, setQuestion] = useState('')
    const params = props.route.params

    const dispatch = useDispatch()

    const {token, imageUrl , name} = useSelector(state => state.auth)

    const createPoll = async () => {
        try {
            const response = await CourseGroup.createPoll({
                groupId: params.groupId,
                content: question,
                choices: options,
                groupType : params.groupType
            }, token)

            if (response.status === 201) {
               dispatch(groupActions.CREATE_POLL({
                   poll : response.data.poll
               }))
               props.navigation.goBack()
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    return (
        <ScrollView style={styles.pollContainer}>
            <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                <CreatePostHeader
                    imageUrl={imageUrl}
                    username={name}
                />
                <Button
                    containerStyle={{paddingHorizontal:10}}
                    buttonStyle={{
                        borderRadius:10,
                        backgroundColor:Colors.blueGreen
                    }}
                    title='Post'
                    onPress={() => {
                        createPoll()
                    }}
                />
            </View>

            <View style={styles.createPollContainer}>
                <PollQuestionInput
                    style={styles.pollQuestionInput}
                    multiline={true}
                    value={question}
                    onChangeText={(value) => setQuestion(value)}
                />

                <View style={{ padding: 20 }}>
                    <View style={styles.addOptionContainer}>
                        <TextInput
                            style={styles.addOptionInput}
                            value={choice}
                            onChangeText={(value) => setChoice(value)}
                            placeholder="Option"
                        />

                        <Button
                            containerStyle={styles.addOptionButton}
                            title='Add'
                            onPress={() => {
                                setOptions([...options, choice])
                                setChoice('')
                            }}
                        />
                    </View>

                    {
                        options.map(option => {
                            return <PollOption key={option} value={option} />
                        })
                    }
                    {/* <Button title='get options' onPress={() => console.log(options)}/> */}
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pollContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    createPollContainer: {
        flex: 1,
    },
    pollQuestionInput: {
        borderBottomWidth: 1,
        borderColor:'lightgrey',
        padding: 15
    },
    addOptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addOptionInput: {
        borderColor:'grey',
        flex: 2.8,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    addOptionButton: {
        flex: 1,
        marginLeft: 5,
        borderRadius: 10
        //width:'40%'
    }
})

export default CreatePollScreen;