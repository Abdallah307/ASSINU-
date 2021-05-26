import React, { useEffect, useState } from 'react'
import * as Animatable from 'react-native-animatable';

import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Text,
    TextInput,
    ActivityIndicator
} from 'react-native'
import { Colors } from '../../constants/Colors'
import { Button, Input } from 'react-native-elements'
import { MaterialIcons, Feather, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../store/middleware/auth'
import {actions as authActions} from '../../store/auth'


const SignInn = (props: any) => {

    const [showPassword, setShowPassword] = useState(true)
    const [email, setEmail] = useState('a.dereia@stu.najah.edu')
    const [password, setPassword] = useState('12345')

    const dispatch = useDispatch()

    const {emailErrorMessage, passwordErrorMessage, isLoggingIn} = useSelector(state => state.auth)

    const PasswordStateIcon = (props) => {
        if (props.state)
            return (
                <Feather name='eye-off'
                    onPress={props.setShowPassword}
                    size={15} color={Colors.greyb}
                />
            )

        return (
            <Feather name='eye'
                onPress={props.setShowPassword}
                size={15} color={Colors.greyb}
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
                        // leftIcon={<MaterialIcons name="email" size={18} color={Colors.blueGreen} />}
                        placeholder='E-mail address'
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        errorMessage={emailErrorMessage}
                        errorStyle={{
                            fontSize : 13,
                            fontWeight : 'bold'
                        }}
                    />

                    <Input
                        inputContainerStyle={{ borderColor: 'lightgrey' }}
                        //leftIcon={<FontAwesome name="lock" size={20} color={Colors.blueGreen} />}
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry={showPassword}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        rightIcon={<PasswordStateIcon setShowPassword={() => setShowPassword(!showPassword)} state={showPassword} />}
                        keyboardType='default'
                        errorMessage={passwordErrorMessage}
                        errorStyle={{
                            fontSize : 13,
                            fontWeight : 'bold'
                        }}
                    />

                    <Button
                        title='Sign in'
                        loading={isLoggingIn}
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={styles.signInButton}
                        onPress={() => {
                            dispatch(authActions.SET_IS_LOGGING_IN({
                                isLoggingIn : true
                            }))
                            dispatch(authActions.SET_EMAIL_ERROR({
                                errorMessage : ''
                            }))
                            dispatch(authActions.SET_PASSWORD_ERROR({
                                errorMessage : ''
                            }))
                            dispatch(signIn({ email: email, password: password }))}
                        } 
                    />
                    <View style={{ flexDirection: 'row', alignSelf: 'center', alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ marginTop: 20 }} >______</Text>
                        <Text style={{ marginTop: 20, fontSize: 18, color: Colors.pur3 }}> or </Text>
                        <Text style={{ marginTop: 20 }}>______</Text>
                    </View>

                    <Button
                        title='Create new account?'
                        containerStyle={{ marginBottom: 10 }}
                        buttonStyle={styles.signUpButton}
                        titleStyle={{ color: Colors.bluee2, textDecorationLine: 'underline' }}
                        onPress={() => props.navigation.navigate('SignUp')}
                    />
                    {/* <View style={{justifyContent : 'center', alignItems : 'center'}}>
                        <Text style={{color : 'red'}}>{validationErrorMessage}</Text>
                    </View> */}
                </Animatable.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.primary
    },
    header: {
        flex: 1, backgroundColor: Colors.primary,
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
        padding: 0,

        //fontSize: 15,
        //padding: 0,
        //marginVertical:0
        marginBottom: 0,
        paddingLeft: 20
    },
    signInButton: {
        backgroundColor: Colors.pur3,
        borderRadius: 20,
        padding: 12,
        // borderWidth: 1,
        width: 240,
        height: 40,
        alignSelf: 'center'

        //backgroundColor: Colors.blueGreen,
        //borderRadius: 5,
        //padding: 12,
        //borderWidth: 1,

    },
    signUpButton: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 12,
        width: 180,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',



        // backgroundColor: 'transparent',
        //borderWidth: 1,
        //padding: 12,
    }
})

export default SignInn