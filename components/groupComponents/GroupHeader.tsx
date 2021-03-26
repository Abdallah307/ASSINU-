import React from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../constants/Colors'
import {Button} from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons';


const GroupHeader = (props: any) => {
    return (
        <View style={styles.groupHeader}>

            <View>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={require('../../assets/groupImage.jpg')}
                />
            </View>

            
                <View style={styles.groupInfo}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
                        <Text
                            style={styles.groupTitle}
                        >
                            {props.title}
                        </Text>
                        <Button
                        onPress={props.openChatting}
                        type="clear"
                        icon={<AntDesign name="message1" size={30} color={Colors.primary}/>}
                        />
                    </View>


                    <Text
                        style={styles.membersCount}
                    >
                        {props.numberOfMembers} members
                    </Text>
                </View>

           
        </View>
    )
}

const styles = StyleSheet.create({
    groupHeader: {

    },
    backgroundImage: {
        width: "100%",
        aspectRatio: 2 / 1
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    groupInfo: {
        backgroundColor: 'white',
        height: 100,
        padding: 10
    },
    groupTitle: {
        fontSize: 22,
        color: Colors.primary,
        fontFamily:'OpenSans-Bold'
    },
    membersCount: {
        fontSize: 12,
        color: 'black',
        fontFamily:'OpenSans-Regular'
    }
})

export default GroupHeader;
