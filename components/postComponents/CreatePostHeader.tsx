import React, {useState} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';


const CreatePostHeader = (props: any) => {

    

    return (
        <View style={styles.createPostHeader}>

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
            <Button
                onPress={props.chooseImageFromDevice}
                type='clear'
                icon={<Feather name="image" size={27} color={Colors.blueGreen} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    createPostHeader: {
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

export default CreatePostHeader;