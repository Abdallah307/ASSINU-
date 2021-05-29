import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native'
import ProfileAvatarImage from '../../components/profileComponents/ProfileAvatarImage'
import { AssinuText } from '../../components/UI/AssinuText'
import { Colors } from '../../constants/Colors'
import { Button } from 'react-native-elements'
import { AntDesign, Entypo } from '@expo/vector-icons';

const ProfileButtons = props => {
    console.log(props.showAskButton)
    return (
        <View style={{ paddingHorizontal: 60, marginTop: -80 }}>
            <View style={styles.buttonsContainer}>
                <Button
                    onPress={props.createNewMessage}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.buttonStyle}
                    title='Message'
                    icon={<AntDesign name="message1" size={30} color={Colors.pur3} />}
                    type="clear"
                />
                <Button
                    disabled={!props.showAskButton}
                    onPress={props.openCreateAskQuestionScreen}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.buttonStyle}
                    title='ASK'
                    icon={<Entypo name="mask" size={30} color={!props.showAskButton ? 'grey' : Colors.pur3} />}
                    type="clear"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsContainer: {
        backgroundColor: 'white',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 80,
    },
    buttonTitle: {
       // fontFamily: 'OpenSans',
        
    },
    buttonStyle: {
        flexDirection: 'column'
    }
})

export default ProfileButtons;