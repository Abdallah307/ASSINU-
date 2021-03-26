import React from 'react'
import { 
    View, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    TouchableNativeFeedback ,
    Platform
} from 'react-native'
import ProfileAvatarImage from '../profileComponents/ProfileAvatarImage'
import { Colors } from '../../constants/Colors'

const ListItem = (props) => {

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version > 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <TouchableOpacity style={{ flex: 1 }} onPress={props.onSelect} activeOpacity={0.7}>
            <View style={styles.listItem}>
                <Text style={styles.listItemTitle}>{props.title}</Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        margin: 15,
        height: 145,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    listItemTitle: {
        color: 'white',
        fontSize: 13,
        fontFamily:'OpenSans-Bold'
    }
})

export default ListItem