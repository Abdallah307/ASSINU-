import React, { useState } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Colors } from '../constants/Colors'

const SignUp = props => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={styles.createAccountContainer}>
                    <Text style={styles.createAccountText}>Create an account</Text>
                </View>
                <View style={styles.SignUp}>
                    <Input
                        value={firstName}
                        onChangeText={(firstName) => setFirstName(firstName)}
                        placeholder="First name"
                    />
                    <Input
                        value={lastName}
                        onChangeText={(lastName) => setLastName(lastName)}
                        placeholder="Last name"
                    />
                    <Input
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                        placeholder="Email"
                    />
                    <Input
                        value={password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry
                        placeholder="Password"
                    />
                    <Input
                    value={confirmPassword}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                        secureTextEntry
                        placeholder="Confirm password"
                    />
                    <Button
                        title="Register"
                        buttonStyle={{ backgroundColor: 'magenta' }}
                        onPress={() => {}}
                    />
                    <Button
                        title="SignIn"
                        buttonStyle={{ backgroundColor: 'blue' }}
                        onPress={() => props.navigation.navigate('SignIn')}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    SignUp: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountText: {
        fontSize: 20,
        color:Colors.primary
    },
    createAccountContainer: {
        flex: 0.1,
        alignItems:'center',
        paddingTop:5
    }
})

export default SignUp