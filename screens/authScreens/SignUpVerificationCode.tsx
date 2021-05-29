import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ToastAndroid} from 'react-native'
import { Input } from 'react-native-elements'
import HOST, { SERVER_PORT } from '../../configs/config'
import { Colors } from '../../constants/Colors'
import {Button} from 'react-native-elements'
import {actions as authActions} from '../../store/auth'
import { useDispatch } from 'react-redux'
import { AssinuText } from '../../components/UI/AssinuText'
import CustomActivityIndicator from '../../components/UI/CustomActivityIndicator'

export const SignUpVerificationScreen = props => {

    const [isSumbittingCode, setIsSubmittingCode] = useState(false)
    const [codeErrorMessage ,setCodeErrorMessage] = useState('')
    const [verificationCode , setVerificationCode] = useState<Number>()
    const [isSendingNewCode , setIsSendingNewCode] = useState(false)

    const dispatch = useDispatch()

    const submitVerificationCode = async () => {
        setIsSubmittingCode(true)
        setCodeErrorMessage('')
        try {
            const response = await axios.post(
                `http://${HOST}:${SERVER_PORT}/auth/signup/verification`,
                {
                    code : verificationCode,
                    email : props.route.params.email 
                }
            )

            if (response.status === 200) {
                ToastAndroid.show('Verified Successfully', ToastAndroid.SHORT)
                setIsSubmittingCode(true)
                props.navigation.navigate('SignIn')
            }
        }
        catch (err) {
            setIsSubmittingCode(false)
            if (err.response.status === 422) {
                setCodeErrorMessage(err.response.data.error)
            }
        }
    }

    const sendNewCode = async () => {
        setIsSendingNewCode(true)
        try {
            const response = await axios.post(
                `http://${HOST}:${SERVER_PORT}/auth/signup/resendcode`,
                {
                    email : props.route.params.email 
                }
            )

            if (response.status === 201) {
                ToastAndroid.show('Try the new verification code', ToastAndroid.SHORT)
                setIsSendingNewCode(false)
            }
        }
        catch (err) {
            setIsSendingNewCode(false)
            ToastAndroid.show('Error occured', ToastAndroid.LONG)
        }
    }

    useEffect(() => {
        return () => {
            dispatch(authActions.SET_USER_NOT_VERIFIED({
                isNotVerified : false 
            }))
        }
    }, [])

    if (isSendingNewCode) {
        return (
            <CustomActivityIndicator/>
        )
    }

    return (    
        <View style={{
            flex : 1,
            justifyContent : 'center',
            alignItems : 'center',
            backgroundColor : Colors.primary
        }}>
            <Input
            errorMessage={codeErrorMessage}
            errorStyle={{
                fontFamily : 'OpenSans-Bold'
            }}
            
            placeholderTextColor='white'
            style={{color : 'white'}}
            textAlign='center'
            onChangeText={(value) => setVerificationCode(value)}
            value={verificationCode}
            keyboardType='numeric'
            maxLength={6}
            placeholder='Enter Verification code..'
            />
            <Button
            loading={isSumbittingCode}
            titleStyle={{color : 'white'}}
            buttonStyle={{
                backgroundColor : Colors.bb,
                padding : 10,
                borderRadius : 10,
            }}
            title='Submit code'
            onPress={submitVerificationCode}
            />
            <View style={{marginTop : 20, flexDirection : 'row', alignItems : 'center'}}>
                <AssinuText style={{color : 'white'}}>Dont receive it ?</AssinuText>
                <Button
                onPress={sendNewCode}
                title='Resend code'
                type='clear'
                titleStyle={{color : 'white'}}
                />
            </View>
        </View>
    )
}