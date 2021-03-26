import React, { useState } from 'react'
import { View,ScrollView, StyleSheet, TextInput } from 'react-native'
import CreatePostHeader from '../postComponents/CreatePostHeader'
import PollOption from './PollOption'
import PollQuestionInput from './PollQuestionInput'
import { Button } from 'react-native-elements'


const Poll = props => {
    const [options, setOptions] = useState<Array<string>>([])
    const [choice, setChoice] = useState('')
    return (
        <ScrollView style={styles.pollContainer}>
            <CreatePostHeader
                imageUrl={props.route.params.userImage}
                username={props.route.params.username}
            />

            <View style={styles.createPollContainer}>
                <PollQuestionInput
                    style={styles.pollQuestionInput}
                    multiline={true}
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
                            onPress={() => setOptions([...options, choice])}
                        />
                    </View>

                    {
                        options.map(option => {
                            return <PollOption value={option} />
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
        padding: 15
    },
    addOptionContainer: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    addOptionInput: {
        flex:2.8,
        borderWidth:1,
        padding:5,
        borderRadius:10
    },
    addOptionButton: {
        flex:1,
        marginLeft: 5,
        borderRadius:10
        //width:'40%'
    }
})

export default Poll;