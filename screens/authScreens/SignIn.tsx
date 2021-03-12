import React, { useEffect, useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text, TextInput } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Button, Input } from 'react-native-elements'
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import {useDispatch} from 'react-redux'
import {signIn} from '../../store/middleware/auth'

const PasswordStateIcon = (props) => {
    if (props.state) 
    return (
        <Feather name='eye-off'
            onPress={props.setShowPassword}
            size={24} color="black"
        />
    )

    return(
        <Feather name='eye'
            onPress={props.setShowPassword}
            size={24} color="black"
        /> 
    )
    
}

const SignIn = (props: any) => {

    const [showTitle, setShowTitle] = useState(true)

    const [email, setEmail] = useState('a.dereia@stu.najah.edu')
    const [password, setPassword] = useState('12345')

    const [showPassword, setShowPassword] = useState(true)

    const dispatch = useDispatch()

    

    return (
        <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()} 
        style={{ flex: 1 }}
        >
            <View style={styles.signIn}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                    <Text style={styles.title}>ASSINU</Text>
                </View>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <View style={styles.inputContainer}>
                        <Input
                            style={{ color: Colors.primary }}
                            placeholder="Email"
                            leftIcon={<MaterialIcons name="email" size={24} color={Colors.primary} />}
                            value={email}
                            onChangeText={(email) => setEmail(email)}
                        />
                        <Input
                            style={{ color: Colors.primary }}
                            placeholder="Password"
                            secureTextEntry={showPassword}
                            leftIcon={<MaterialCommunityIcons name="account-key" size={24} color={Colors.primary} />}
                            value={password}
                            onChangeText={(password) => setPassword(password)}
                            rightIcon={<PasswordStateIcon setShowPassword={() => setShowPassword(!showPassword)} state={showPassword}/>}
                        />
                        <Button
                            containerStyle={{ width: '100%', padding: 20 }}
                            buttonStyle={styles.signInButton}
                            title="Sign in"
                            onPress={()=>dispatch(signIn({ email:email, password:password}))}
                        />
                        <Button
                            title="forget password?"
                            type='clear'
                            titleStyle={styles.forgetPasswordTitle}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 15 }}>Do not have an account?</Text>
                            <Button
                                onPress={() => props.navigation.navigate('SignUp')}
                                type='clear'
                                containerStyle={styles.signUpContainer}
                                title="Sign up"
                                titleStyle={{ fontSize: 15, fontWeight: 'bold' }} />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )


}

const styles = StyleSheet.create({
    signIn: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        color: Colors.primary,
        fontWeight: 'bold',
        marginBottom:10
    },
    signInButton: {
        padding: 15,
        backgroundColor: Colors.primary
    },
    forgetPasswordTitle: {
        color: Colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary
    },
    signUpContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default SignIn;