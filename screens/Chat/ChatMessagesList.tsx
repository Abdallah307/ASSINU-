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
        let pubId;
        let senId;
        if (itemData.item.ownerId == undefined) {
            senId = itemData.item.sender
        }
        else {
            senId = itemData.item.ownerId
        }
        if (senId._id == props.userId)
            return (
                <ChattingMessage
                    messageContent={itemData.item.content}
                    containerStyle={styles.ownerMessage}
                />
            )
            if (itemData.item.groupId == undefined) {
                pubId = itemData.item.receiver 
            }
            else {
                pubId = itemData.item.ownerId
            }
             

        return (


            <View style={{
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <ProfileAvatarImage
                    imageUrl={senId.imageUrl}
                    style={styles.avatarImage}
                />
                <View>
                    <Text
                        style={styles.messageOwnerName}
                    >
                        {senId.name}
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