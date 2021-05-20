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


const SignUpp = (props: any) => {

    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const PasswordStateIcon = (props) => {
        if (props.state)
            return (
                <Feather name='eye-off'
                    onPress={props.setShowPassword}
                    size={15} color="black"
                />
            )

        return (
            <Feather name='eye'
                onPress={props.setShowPassword}
                size={15} color={Colors.bluee2}
            />
        )

    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Register Now!</Text>
                </View>
                <Animatable.View
                    duration={2000}
                    animation='bounceInUp'
                    style={styles.main}
                >
                    <Input
                        inputContainerStyle={{ borderColor: 'lightgrey' }}
                        //leftIcon={<MaterialIcons name="email" size={18} color={Colors.blueGreen} />}
                        placeholder='E-mail address'
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />

                    <Input
                        inputContainerStyle={{ borderColor: 'lightgrey' }}
                       // leftIcon={<FontAwesome name="lock" size={20} color={Colors.blueGreen} />}
                        placeholder='Password'
                        style={styles.input}
                        secureTextEntry={showPassword}
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        rightIcon={<PasswordStateIcon setShowPassword={() => setShowPassword(!showPassword)} state={showPassword} />}
                    />

                    <Input
                        inputContainerStyle={{ borderColor: 'lightgrey' }}
                       // leftIcon={<FontAwesome name="lock" size={20} color={Colors.blueGreen} />}
                        placeholder='Confirm password'
                        style={styles.input}
                        secureTextEntry={showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={(password) => setConfirmPassword(password)}
                        rightIcon={<PasswordStateIcon setShowPassword={() => setShowConfirmPassword(!showConfirmPassword)} state={showConfirmPassword} />}
                    />

                    <Button
                        title='Sign Up'
                        containerStyle={{ marginTop: 35 }}
                        buttonStyle={styles.signUpButton}
                        onPress={() => props.navigation.navigate('SignUp')}
                    />
                    <View style={{ flexDirection: 'row', marginVertical: 0, alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: Colors.greybb }}>Already have an account?</Text>
                    <Button
                        title='Sign In'
                        titleStyle={{ color: Colors.pur3 }}
                        containerStyle={{  }}
                        buttonStyle={styles.signInButton}
                        onPress={() => props.navigation.navigate('SignIn')}
                    />
                    </View>
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
        paddingLeft: 10,
        //padding: 0,
    },
    signUpButton: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        marginVertical: 5,
        width: 240,
        height: 40,
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        textAlign: 'center',

        
    },
    signInButton: {
        backgroundColor: 'transparent',
       // borderWidth: 1,
       // padding: 12,
    },
    textsstyle: {
        fontSize: 15,
        //fontFamily:'OpenSans',
        color: Colors.bluee1,
        // padding:10,
        //margin:10,
        paddingLeft: 10

    },

})

export default SignUpp