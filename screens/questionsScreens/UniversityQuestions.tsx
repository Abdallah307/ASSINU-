import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, View, Text } from 'react-native'
import QuestionItem from '../../components/questionsComponents/QuestionItem'
import FloatingButton from '../../components/UI/FloatingButton'
import AddQuestionsModal from './AddQuestionModal'
import { useSelector, useDispatch } from 'react-redux'
import { UniversityGroup } from '../../api/api'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import SearchInput from '../../components/UI/SearchInput'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { fetchUniversityQuestions } from '../../store/middleware/api'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'
import { toggleFollowingStatus } from '../../store/middleware/api'
import * as Notifications from 'expo-notifications'
import { addUniversityQuestion } from '../../store/middleware/api'

const UniversityQuestions = (props: any) => {

    const [isModalVisible, setIsModalVisible] = useState(false)

    const dispatch = useDispatch()

    const userData = useSelector(state => {
        return state.auth
    })


    const questions = useSelector(state => {
        return state.questions.questions
    })

    const isLoaded = useSelector(state => {
        return state.questions.isLoaded
    })

    const [createdQuestion, setcreatedQuestion] = useState('')


    const onOpenQuestion = (question, isFollowing) => {
        props.navigation.navigate('FullQuestionScreen', {
            question: question,
            isFollowing: isFollowing,
        })
    }

    const userId = useSelector(state => {
        return state.auth.userId
    })


    const openAddQuestion = () => {
        setIsModalVisible(true)
    }

    const closeAddQuestion = () => {
        setIsModalVisible(false)
    }

    const addQuestion = async () => {
        dispatch(addUniversityQuestion({
            content: createdQuestion,
            ownerId: userId
        }))
    }

    const onFollowPressed = (questionId) => {

        Notifications.scheduleNotificationAsync({
            content: {
                title: 'My First Local Notification',
                body: "This is the first local notification we are sending"
            },
            trigger: {
                seconds: 5,
            }
        })

        dispatch(toggleFollowingStatus({
            questionId: questionId,
            userId: userId
        }))
    }

    useEffect(() => {
        console.log('Hello my dear')
        dispatch(fetchUniversityQuestions({}))

    }, [dispatch])

    const renderQuestions = (itemData) => {
        const followerIndex = itemData.item.followers.findIndex(follower => {
            return follower.followerId === userId
        })
        let isFollowing = false
        if (followerIndex > -1) {
            isFollowing = true
        }
        
        return (
            <QuestionItem
                isFollowing={isFollowing}
                onFollowPressed={() => onFollowPressed(itemData.item._id)}
                content={itemData.item.content}
                onOpenQuestion={() => onOpenQuestion(itemData.item, isFollowing)}
                ownerName={itemData.item.ownerId.name}
                ownerImage={itemData.item.ownerId.imageUrl}
                createdAt={itemData.item.createdAt}
            />
        )
    }

    return (
        <>
            <FloatingButton
                openAddQuestion={()=> props.navigation.navigate('CreateQuestionScreen', {
                    username:userData.name,
                    userImage: userData.imageUrl,
                    userId: userData.userId
                })}
                style={styles.floatingButton}
            />

            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('SearchScreen')} style={{ padding: 10, width: '100%' }}>
                <SearchInput />
            </TouchableWithoutFeedback>



            { !isLoaded ? <CustomActivityIndicator /> :
                <FlatList
                    contentContainerStyle={{paddingBottom:150}}
                    data={questions}
                    renderItem={renderQuestions}
                    keyExtractor={(item => item._id)}
                />}

        </>
    )
}

const styles = StyleSheet.create({

    floatingButton: {
        bottom: 50,
        right: 15,
        zIndex: 1,

    },
    searchView: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
        paddingVertical: 15,
        borderColor: '#aaa',
    }
})

export default UniversityQuestions;