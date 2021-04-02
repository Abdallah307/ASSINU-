import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    StatusBar,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    ActivityIndicator,
} from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import { FlatList } from 'react-native-gesture-handler';
import QuestionItem from '../../components/questionsComponents/QuestionItem';
import { useSelector, useDispatch } from 'react-redux'
import { toggleFollowingStatus } from '../../store/middleware/api'
import NoResultFound from '../../components/UI/NoResultFound';

import HOST,{SERVER_PORT} from '../../configs/config'


const SearchScreen = props => {

    const [searchValue, setSearchValue] = useState('')

    const [searchResults, setSearchResults] = useState('')

    const [showNoResult, setShowNoResult] = useState(false)

    const [isLoaded, setIsLoaded] = useState(false)


    const dispatch = useDispatch()

    const userId = useSelector(state => {
        return state.auth.userId
    })

    const onFollowPressed = (questionId) => {

        dispatch(toggleFollowingStatus({
            questionId: questionId,
            userId: userId
        }))
    }

    const onOpenQuestion = (question, isFollowing) => {
        props.navigation.navigate('FullQuestionScreen', {
            question: question,
            isFollowing: isFollowing,
        })
    }

    const searchQuestion = async () => {
        const response = await axios.get(`http://${HOST}:${SERVER_PORT}/student/questions/search?questionText=${searchValue}`)
        setIsLoaded(true)
        console.log(response.data.results)
        setSearchResults(response.data.results)
        if (response.data.results.length == 0) setShowNoResult(true)
        else setShowNoResult(false)
    }

    const renderQuestions = (itemData) => {
        const followerIndex = itemData.item.followers.findIndex(follower => {
            return follower.followerId === userId
        })
        let isFollowing = false
        if (followerIndex > -1) {
            isFollowing = true
        }
        console.log(itemData.item)

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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.searchContainer}>
                <SafeAreaView style={styles.header}>
                    <Button
                        onPress={() => props.navigation.goBack()}
                        containerStyle={{ width: '15%' }}
                        buttonStyle={{ borderRadius: 50 }}
                        type='clear'
                        icon={<Ionicons name="arrow-back" size={24} color="black" />}
                    />
                    <TextInput
                        autoFocus
                        returnKeyType='search'
                        keyboardType='default'
                        onSubmitEditing={searchQuestion}
                        style={styles.searchInput}
                        placeholder="Search question..."
                        value={searchValue}
                        onChangeText={(value) => setSearchValue(value)}
                        onFocus={() => setShowNoResult(false)}
                    />
                </SafeAreaView>

                {isLoaded && showNoResult ? <NoResultFound /> :
                    <FlatList
                        data={searchResults}
                        renderItem={renderQuestions}
                        keyExtractor={(item) => item._id}
                    />}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        backgroundColor:'white'
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: 'lightgrey',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight
    },
    searchInput: {
        width: '85%',
        height: '100%',
        paddingHorizontal: 10
    }
})

export default SearchScreen;