import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { Colors } from '../../constants/Colors';
import Header from '../../screens/newQuestionsGroupScreens/components/Header';
import PostHeader from '../postComponents/PostHeader';
import CustomRadioButton from './CustomRadioButton'

const PollItemSingleChoice = props => {
  const [value, setValue] = useState(props.isAlreadyVoted ? props.voter.choiceId : '');

  return (
    <View style={styles.pollItem}>
      <Header
        onPressHeader={props.onPressHeader}
        imageUrl={props.poll.owner.imageUrl}
        name={props.poll.owner.name}
        date={props.poll.createdAt}
      />
      <Text style={styles.pollContent}>{props.poll.content}</Text>
      <RadioButton.Group onValueChange={newValue => {
        props.AddVoteToPoll(props.poll._id, newValue)
        setValue(newValue)
        //setDisabled(true)
      }} value={value}>
        {
          props.poll.choices.map(choice => {
            return (
              <CustomRadioButton
                openVotersListScreen={() => props.openVotersListScreen(choice._id)}
                choice={choice}
                key={choice._id}
              />
            )
          })
        }
      </RadioButton.Group>
    </View>
  );
}

const styles = StyleSheet.create({
  pollItem: {
    backgroundColor: 'white',
    marginVertical: 3,
  },
  pollContent: {
    fontSize: 15,
    paddingVertical: 1,
    paddingHorizontal: 12,
    fontFamily: 'OpenSans-Regular'
  }
})

export default PollItemSingleChoice;