import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, TextInput } from 'react-native'
import CreatePostHeader from '../../../components/postComponents/CreatePostHeader'
import CreatePostHeader2 from '../../../components/postComponents/CreatePostHeader2'
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
                groupType : params.groupType,
                groupName : params.groupName
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
                <CreatePostHeader2
                    imageUrl={imageUrl}
                    username={name}
                />
                <Button
                    containerStyle={{paddingHorizontal:10}}
                    buttonStyle={{
                        borderRadius:10,
                        backgroundColor:'transparent'
                    }}
                    title='Post'
                    titleStyle={{color:Colors.prussianBlue, textDecorationLine:'underline'}}
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

                <View style={{ padding: 20, marginTop:15 }}>
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
                            buttonStyle={{backgroundColor:Colors.pur3, borderRadius:5, width:80, marginLeft:10, alignContent:'center', alignItems:'center', alignSelf:'center'}}
                            titleStyle={{color:Colors.white}}
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
        padding: 15,
        height:80,
        maxHeight:'100%'
    },
    addOptionContainer: {
        flexDirection: 'row',
      //  justifyContent: 'space-between'
    },
    addOptionInput: {
        borderColor:'grey',
        flex: 2,
        //borderWidth: 0.8,
        borderBottomWidth: 0.8,
        paddingLeft: 10,
        paddingRight:25,
       // borderRadius: 10
    },
    addOptionButton: {
        flex: 1,
        //marginTop:40,
       // marginLeft: 5,
       // borderRadius: 10
       backgroundColor:'transparent',
      // paddingLeft:10
        //width:'40%'
    }
})

export default CreatePollScreen;