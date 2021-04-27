import React, {useState} from 'react'
import {View, Text , StyleSheet} from 'react-native'
import { RadioButton} from 'react-native-paper';

const PollItemMultipleChoice = props => {
    const [value, setValue] = React.useState('first');

    return (
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <View>
          <Text>First</Text>
          <RadioButton value="first"/>
        </View>
        <View>
          <Text>Second</Text>
          <RadioButton value="second"/>
        </View>
      </RadioButton.Group>
    );
}

const styles = StyleSheet.create({

})

export default PollItemMultipleChoice;