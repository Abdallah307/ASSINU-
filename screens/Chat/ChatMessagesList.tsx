import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    StyleSheet,
    FlatList,
    Text
} from 'react-native'
import ChattingMessage from './ChattingMessage'
import { Colors } from '../../constants/Colors'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'

const ChatMessagesList = (props) => {

    const flatRef = useRef(null)

    const renderMessages = (itemData) => {
        if (itemData.item.ownerId._id === props.userId)
            return (
                <ChattingMessage
                    messageContent={itemData.item.content}
                    containerStyle={styles.ownerMessage}
                />
            )

        return (


            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <ProfileAvatarImage
                    imageUrl={itemData.item.ownerId.imageUrl}
                    style={styles.avatarImage}
                />
                <View>
                    <Text
                        style={styles.messageOwnerName}
                    >
                        {itemData.item.ownerId.name}
                    </Text>
                    <ChattingMessage
                        messageContent={itemData.item.content}
                        containerStyle={styles.opponentMessage}
                        messageStyle={{ color: 'black' }}
                    />
                </View>
            </View>

        )
    }


    return (
        <FlatList
            ref={flatRef}
            showsVerticalScrollIndicator={false}
            data={props.messages}
            renderItem={renderMessages}
            keyExtractor={item => item._id}
            onContentSizeChange={() => flatRef.current.scrollToEnd({ animated: true })}
        />
    )
}

const styles = StyleSheet.create({
    ownerMessage: {
        backgroundColor: Colors.primary,
        marginLeft: 'auto'
    },
    opponentMessage: {
        backgroundColor: '#eeeeee',
        marginRight: 'auto'
    },
    avatarImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    messageOwnerName: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 11
    }
})

export default ChatMessagesList