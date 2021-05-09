import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, TextInput } from 'react-native'
import CreatePostHeader from '../postComponents/CreatePostHeader'
import PollOption from './PollOption'
import PollQuestionInput from './PollQuestionInput'
import { Button } from 'react-native-elements'
import RNPoll, { IChoice } from "react-native-poll";
import { CourseGroup } from '../../api/api'
import { Colors } from '../../constants/Colors'
import { useSelector } from 'react-redux'


const Poll = props => {
    const [options, setOptions] = useState<Array<string>>([])
    const [choice, setChoice] = useState('')
    const [question, setQuestion] = useState('')
    const params = props.route.params

    const token = useSelector(state => state.auth.token)

    const createPoll = async () => {
        try {
            const response = await CourseGroup.createPoll({
                groupId: params.groupId,
                ownerId: params.userId,
                content: question,
                choices: options
            }, token)

            if (response.status === 201) {
                props.navigation.navigate(params.navScreen, {
                    poll: response.data.poll
                })
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
                    imageUrl={props.route.params.userImage}
                    username={props.route.params.username}
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

export default Poll;