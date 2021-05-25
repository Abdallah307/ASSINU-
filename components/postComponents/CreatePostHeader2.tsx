import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';


const CreatePostHeader2 = (props: any) => {



    return (
        <View style={styles.createPostHeader2}>

            <View
                style={{ flexDirection: 'row', alignItems: 'center' }}
            >
                <ProfileAvatarImage
                    style={styles.avatarImage}
                    imageUrl={props.imageUrl}
                />
                <Text
                    style={styles.username}
                >
                    {props.username}
                </Text>

            </View>
          
        </View>
    )
}

const styles = StyleSheet.create({
    createPostHeader2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    username: {
        color: 'black',
        fontSize: 16,
        fontFamily: 'OpenSans-Bold'
    },
    avatarImage: {
        width: 50,
        height: 50,
        borderRadius: 25
    }
})

export default CreatePostHeader2;