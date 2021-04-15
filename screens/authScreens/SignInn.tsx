import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';

import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TextInput
} from 'react-native'
import { Colors } from '../../constants/Colors'
import { Button, Input } from 'react-native-elements'
import { MaterialIcons, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { signIn } from '../../store/middleware/auth'


const SignInn = (props: any) => {

    const [showPassword, setShowPassword] = useState(true)
    const [email, setEmail] = useState('armoush@najah.edu')
    const [password, setPassword] = useState('12345')

    const dispatch = useDispatch()

    const PasswordStateIcon = (props) => {
        if (props.state)
            return (
                <Feather name='eye-off'
                    onPress={props.setShowPassword}
                    size={20} color="black"
                />
            )

        return (
            <Feather name='eye'
                onPress={props.setShowPassword}
                size={20} color={Colors.blueGreen}
            />
        )

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Animatable.Text
                        style={styles.welcomeText}
                        duration={2000}
                        animation="bounceIn"
                    >
                        Welcome!
                    </Animatable.Text>
                </View>
                <Animatable.View
                    duration={2000}
                    animation='bounceInUp'
                    style={styles.main}
                >
                    <Input
                        inputContainerStyle={{ borderColor: 'lightgrey' }}
                        leftIcon={<MaterialIcons name="email" size={18} color={Colors.blueGreen} />}
                        placeholder='Email'
                        style={styles.input}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <Input
                        inputContainerStyle={{ borderColor: 'lightgrey' }}
                        leftIcon={<FontAwesome name="lock" size={20} color={Colors.blueGreen} />}
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry={showPassword}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        rightIcon={<PasswordStateIcon setShowPassword={() => setShowPassword(!showPassword)} state={showPassword} />}
                    />

                    <Button
                        title='Sign In'
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={styles.signInButton}
                        onPress={() => dispatch(signIn({ email: email, password: password }))}
                    />
                    <Button
                        title='Sign Up'
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={styles.signUpButton}
                        titleStyle={{ color: Colors.blueGreen }}
                        onPress={() => props.navigation.navigate('SignUp')}
                    />
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.blueGreen
    },
    header: {
        flex: 1, backgroundColor: Colors.blueGreen,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    main: {
        flex: 3, backgroundColor: "white",
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        padding: 20

    },
    welcomeText: {
        color: Colors.white,
        fontFamily: 'OpenSans-Bold',
        fontSize: 25
    },
    input: {
        fontSize: 15,
        padding: 0
    },
    signInButton: {
        backgroundColor: Colors.blueGreen,
        borderRadius: 5,
        padding: 12,
        borderWidth: 1,
    },
    signUpButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        padding: 12,
    }
})

export default SignInn